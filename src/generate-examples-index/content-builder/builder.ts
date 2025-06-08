import fs from "fs";
import { join } from "path";
import { promisify } from "util";
import puppeteer from "puppeteer";

import { Example, Examples, ExamplesRoot } from "../types";
import {
  Renderer,
  Report,
  formatStartStopMs,
  isExample,
  measureStartStopMs,
} from "./common";
import { formatHTML } from "./format";
import { generateJSFiddlePage, generateCodePenPage } from "./playground";
import { generateScreenshot } from "./screenshots";

const collator = new Intl.Collator("US");
const writeFile = promisify(fs.writeFile);

export type IndexReport = Report;
export interface ExampleReport extends Report {
  example: Example;
}

export interface Checks {
  fail: number;
  failPaths: string[];
  okay: number;
  okayPaths: string[];
  percentage: number;
  total: number;
}

export interface ContentBuilderConfig {
  /** The tree structure with examples in it's leaves. */
  examples: ExamplesRoot;
  /** The directory where built files will be saved. */
  output: string;
  /** How many screenshots to generate at the same time. */
  parallel: number;
  /** The renderer used to generate index files. */
  renderer: Renderer;
  /** A script that will be executed on each page as first. */
  screenshotScript: string;
  /** A title that will be passed to the renderer. */
  title: string;
}

export interface ContentBuilderRet {
  checks: Promise<Checks>;
  index: Promise<IndexReport[]>;
  playgrounds: Promise<ExampleReport[]>;
  screenshots: Promise<ExampleReport[]>;
}

export class ContentBuilder {
  public constructor(private readonly _config: ContentBuilderConfig) {}

  /**
   * Build the files and write them to the disk.
   * @param emit - Which types of files to emit.
   * @param emit.index
   * @param emit.playgrounds
   * @param emit.screenshots
   * @returns A report with check results and the number of written files.
   */
  public build(
    emit: {
      index?: boolean;
      playgrounds?: boolean;
      screenshots?: boolean;
    } = {}
  ): ContentBuilderRet {
    const allExamples = this._processGroup(this._config.examples);

    const okay: string[] = [];
    const fail: string[] = [];

    console.info(
      `Going to generate ${[
        emit.index ? ["index files"] : [],
        emit.playgrounds ? ["playground openers"] : [],
        emit.screenshots ? ["screenshots"] : [],
      ]
        .flat()
        .join(", ")} for ${allExamples.length} examples.`
    );
    process.stdout.write("\n");

    const index: ContentBuilderRet["index"] = emit.index
      ? // Generate indexes.
        (async (): ContentBuilderRet["index"] => {
          const getStartStopMs = measureStartStopMs();

          const results = await Promise.allSettled(
            this._config.renderer
              .render(
                this._config.examples,
                this._config.output,
                this._config.title,
                collator
              )
              .map(
                async ({ content, filename }): Promise<void> =>
                  writeFile(join(this._config.output, filename), content)
              )
          );

          return [
            {
              ...getStartStopMs(),
              count: results.length,
              result: results.every(
                ({ status }): boolean => status === "fulfilled"
              )
                ? "fulfilled"
                : "rejected",
            },
          ];
        })()
      : // Skip indexes.
        Promise.resolve([]);

    const playgrounds: ContentBuilderRet["playgrounds"] = emit.playgrounds
      ? // Generate playground pages.
        (async (): ContentBuilderRet["playgrounds"] =>
          await Promise.all(
            allExamples.map(async (example): Promise<ExampleReport> => {
              const getStartStopMs = measureStartStopMs();

              const results = await Promise.allSettled(
                [
                  {
                    html: generateJSFiddlePage(example),
                    path: example.paths.jsfiddle.local,
                  },
                  {
                    html: generateCodePenPage(example),
                    path: example.paths.codepen.local,
                  },
                ].map(
                  ({ html, path }): Promise<void> =>
                    writeFile(path, formatHTML(html))
                )
              );

              return {
                ...getStartStopMs(),
                count: results.length,
                example: example,
                result: results.every(
                  ({ status }): boolean => status === "fulfilled"
                )
                  ? "fulfilled"
                  : "rejected",
              };
            })
          ))()
      : // Skip playground pages.
        Promise.resolve([]);

    const screenshots: ContentBuilderRet["screenshots"] = emit.screenshots
      ? // Generate screenshots.
        (async (): ContentBuilderRet["screenshots"] => {
          const cleanup: (() => void | Promise<void>)[] = [];

          try {
            const debug = /^1|y|yes|true$/i.test(process.env.DEBUG ?? "");
            const browser = await puppeteer.launch({
              headless: !debug,
              slowMo: debug ? 100 : undefined,
            });
            if (debug) {
              cleanup.push(async (): Promise<void> => browser.disconnect());
            } else {
              cleanup.push((): Promise<void> => browser.close());
            }

            // Generate screenshots.
            // There is quite long delay to ensure the chart is rendered properly
            // so it's much faster to run a lot of them at the same time.
            const todo = allExamples.slice();
            const total = todo.length;
            const reports: ExampleReport[] = [];
            await Promise.allSettled(
              new Array(this._config.parallel)
                .fill(null)
                .map(async (): Promise<void> => {
                  let example: Example | undefined;
                  while ((example = todo.pop())) {
                    const getStartStopMs = measureStartStopMs();

                    const valid = await generateScreenshot(browser, {
                      debug,
                      example,
                      height: this._config.renderer.screenshot.height,
                      screenshotScript: this._config.screenshotScript,
                      width: this._config.renderer.screenshot.width,
                    });

                    const report: ExampleReport = {
                      ...getStartStopMs(),
                      count: 1,
                      example,
                      result: valid ? "fulfilled" : "rejected",
                    };
                    reports.push(report);

                    if (valid) {
                      okay.push(example.path);
                    } else {
                      fail.push(example.path);
                    }

                    const percentage = (
                      Math.floor((reports.length / total) * 100) + "%"
                    ).padStart(4, " ");
                    const validText = valid ? "okay" : "fail";
                    const msText = formatStartStopMs(report);
                    console.info(
                      `${percentage} ${validText} ${msText} - ${example.path}`
                    );
                  }
                })
            );

            return reports;
          } finally {
            for (const callback of cleanup.splice(0).reverse()) {
              try {
                await callback();
              } catch (error) {
                console.error(error);
              }
            }
          }
        })()
      : // Skip screenshots.
        Promise.resolve([]);

    const checks = (async (): Promise<Checks> => {
      await index;
      await playgrounds;
      await screenshots;

      const total = okay.length + fail.length;
      return {
        fail: fail.length,
        failPaths: fail,
        okay: okay.length,
        okayPaths: okay,
        percentage: total === 0 ? 100 : (100 * okay.length) / total,
        total,
      };
    })();

    return { checks, index, playgrounds, screenshots };
  }

  private _processGroup(examples: Examples): Example[] {
    return Object.keys(examples)
      .sort(collator.compare)
      .flatMap((key): Example[] => {
        const example = examples[key];

        if (isExample(example)) {
          return [example];
        } else {
          return this._processGroup(example);
        }
      });
  }
}
