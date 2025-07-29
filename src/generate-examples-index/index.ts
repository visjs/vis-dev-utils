import * as cheerio from "cheerio";
import fs from "fs";
import util from "util";
import yargs from "yargs";
import { posix } from "path";
import { resolve } from "path";

import {
  ContentBuilder,
  generatePlaygroundData,
  htmlRenderer,
  mdRenderer,
  reduceReports,
  formatStartStopMs,
} from "./content-builder";
import { Example, ExamplesRoot, ExamplePaths } from "./types";
import { parseArguments } from "./cli";
import { generatePaths, fixAbsoluteInputURL } from "./paths";

const argv = parseArguments();

// Log the parsed configuration for debugging purposes.
console.info("Configuration: ", JSON.stringify(argv, null, 2));
process.stdout.write("\n");

// Pageres uses quite a lot of listeners when invoked multiple times in
// parallel. This ensures there are no warnings about it.
process.setMaxListeners(40);

// Resolve paths relative to PWD.
const screenshotScriptPath =
  typeof argv["screenshot-script"] === "string"
    ? resolve(argv["screenshot-script"])
    : undefined;

const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);

function getMeta<T>(page: cheerio.CheerioAPI, name: string, fallback: T): T;
/**
 * Extract and coerce a value from meta tag.
 * @param page - The page to be queried.
 * @param name - The name of the meta tag.
 * @param fallback - The value to be used if the meta tag is not present.
 * @returns The value “smartly” coerced or the fallback if conversion isn't
 * possible or the value is not present in the page.
 */
function getMeta(
  page: cheerio.CheerioAPI,
  name: string,
  fallback: number | string,
): number | string {
  const content = page(`meta[name="${name}"]`).attr("content");

  if (content == null) {
    // No meta of this name exists in the page, use the fallback.
    return fallback;
  } else if (!Number.isNaN(+content)) {
    // Number.
    return +content;
  } else if (typeof content === "string") {
    // String.
    return content;
  } else {
    // Something doesn't match, use the fallback.
    return fallback;
  }
}

/**
 * Test if the example conforms to the conventions.
 * @param path - The path to the example (used for identification in logs).
 * @param page - The HTML to be linted.
 * @returns True if everything's okay, false otherwise.
 */
function lintExample(path: string, page: cheerio.CheerioAPI): boolean {
  let valid = true;
  const msgs = [`${path}:`];

  if (page("#title").length !== 1) {
    msgs.push("Missing #title element in the body.");
    valid = false;
  }

  if (page("#title > *").length < 2) {
    msgs.push(
      "There have to be at least two headings (group and example name).",
    );
    valid = false;
  }

  const headTitle = page("head > title").text().trim();
  const bodyTitle = page("#title > *")
    .map((_i, elem): string => cheerio.load([])(elem).text())
    .get()
    .join(" | ")
    .trim();
  if (headTitle !== bodyTitle) {
    msgs.push(
      "The title in the head doesn't match the title in the body.",
      `  head: ${headTitle}`,
      `  body: ${bodyTitle}`,
    );
    valid = false;
  }

  if (msgs.length > 1) {
    console.warn("\n" + msgs.join("\n  "));
  }

  return valid;
}

(async (): Promise<void> => {
  let code = 0;

  if (!argv.index && !argv.screenshots && !argv.lint) {
    yargs.parse("--help");
    return;
  }

  // Ensure that all paths exist.
  await Promise.all(
    [
      argv["assets-local-directory"],
      argv["examples-local-directory"],
      argv["output-directory"],
      argv["pages-local-directory"],
    ].map(async (path): Promise<void> => {
      await mkdir(path, { recursive: true });
    }),
  );

  const baseURL = argv["base-url"];
  if (!baseURL.endsWith("/")) {
    throw new Error("Base URL (`base-url`) has to end with a slash (`/`).");
  }

  // Paths.
  const pathsConfig: ExamplePaths = {
    codepen: {
      local: argv["pages-local-directory"],
      web: fixAbsoluteInputURL(baseURL, argv["pages-web-directory"]),
    },
    jsfiddle: {
      local: argv["pages-local-directory"],
      web: fixAbsoluteInputURL(baseURL, argv["pages-web-directory"]),
    },
    page: {
      local: argv["examples-local-directory"],
      web: fixAbsoluteInputURL(baseURL, argv["examples-web-directory"]),
    },
    screenshot: {
      local: argv["assets-local-directory"],
      web: fixAbsoluteInputURL(baseURL, argv["assets-web-directory"]),
    },
  };

  const examples: ExamplesRoot = {};
  const selector = "#" + argv["container-id"];
  const stats = { examples: 0 };
  const skipped: string[] = [];

  await Promise.all(
    (
      await (
        await import("globby")
      ).globby(posix.join(pathsConfig.page.local, "**/*.html"))
    ).map(async (pagePath): Promise<any> => {
      const html = await readFile(pagePath, "utf-8");
      const $page = cheerio.load(html);
      const pageDelay = getMeta<number | "call">(
        $page,
        "example-screenshot-delay",
        6,
      );
      const pageTimeout = getMeta<number>(
        $page,
        "example-screenshot-timeout",
        60,
      );
      const pageSelector = getMeta<string>(
        $page,
        "example-screenshot-selector",
        selector,
      );

      // Is this an examples?
      if ($page(pageSelector).length === 0) {
        skipped.push(pagePath);
        return;
      }

      // Lint if requested.
      if (argv.lint) {
        lintExample(pagePath, $page);
      }

      // Body titles.
      let titles = $page("#title > *")
        .get()
        .map((elem): string => $page(elem).text().trim());

      // Head title fallback.
      if (titles.length < 2) {
        titles = $page("head > title")
          .text()
          .split("|")
          .map((title): string => title.trim());
      }

      // File path fallback.
      if (titles.length < 2) {
        titles = pagePath.split("/");
      }

      // Just ignore it.
      if (titles.length < 2) {
        console.error("Title resolution failed. Skipping.");
        return;
      }

      const example: Example = {
        $: $page,
        delay: pageDelay,
        html,
        path: pagePath,
        paths: generatePaths(pathsConfig, pagePath),
        playground: await generatePlaygroundData(baseURL, $page, pagePath),
        selector: pageSelector,
        timeout: pageTimeout,
        titles,
      };

      // Put this example into the structure while creating any missing groups in the process.
      titles.reduce((acc, title, i, arr): any => {
        while (acc[title] != null && acc[title].path != null) {
          console.error("The following group already exists: ", titles);
          title += "!";
        }

        if (i === arr.length - 1) {
          if (acc[title] != null) {
            console.error(
              "The following example has the same name as an already existing group: ",
              titles,
            );
            return null;
          } else {
            acc[title] = example;

            ++stats.examples;
          }
        } else {
          return (acc[title] = acc[title] || {});
        }
      }, examples as any);
    }),
  );

  if (skipped.length) {
    process.stdout.write("\n");
    console.info(
      [
        "The following files don't look like examples (there is nothing to take a screenshot of):",
        ...skipped.sort(),
      ].join("\n  "),
    );
  }

  if (stats.examples === 0) {
    console.info("No usable example files were found.");
  } else if (argv.index || argv.playgrounds || argv.screenshots) {
    process.stdout.write("\n");

    const screenshotScript =
      screenshotScriptPath != null
        ? (await readFile(screenshotScriptPath, "utf-8")) || ""
        : "";

    const builtData = new ContentBuilder({
      examples,
      output: resolve(argv["output-directory"]),
      parallel: argv.parallel,
      renderer: argv.format === "md" ? mdRenderer : htmlRenderer,
      screenshotScript,
      title: argv.title,
    }).build({
      index: argv.index,
      playgrounds: argv.playgrounds,
      screenshots: argv.screenshots,
    });

    // Create and write the page.
    if (argv.index) {
      const cummulativeReport = reduceReports(await builtData.index);
      console.info(
        `Index with ${stats.examples} examples written (${
          cummulativeReport.count
        } files in ${formatStartStopMs(cummulativeReport)}).`,
      );
    }

    // Create and write the playgrounds.
    if (argv.index) {
      const cummulativeReport = reduceReports(await builtData.playgrounds);
      console.info(
        `Playground opener files for ${stats.examples} examples written (${
          cummulativeReport.count
        } files in ${formatStartStopMs(cummulativeReport)}).`,
      );
    }

    // Create and write the screenshots.
    if (argv.screenshots) {
      const cummulativeReport = reduceReports(await builtData.screenshots);
      console.info(
        `Screenshot files for ${stats.examples} written (${
          cummulativeReport.count
        } files in ${formatStartStopMs(cummulativeReport)}).`,
      );
    }

    // Verify the result.
    const checks = await builtData.checks;
    process.stdout.write("\n");
    if (checks.fail === 0) {
      console.info(
        `Verification: ${checks.okay} passed (${Math.round(
          checks.percentage,
        )} %) passed.`,
      );
    } else {
      if (checks.percentage >= argv.verify) {
        console.info(
          `Verification: ${checks.okay} passed (${Math.round(
            checks.percentage,
          )} %), ${checks.fail} failed.\n` +
            "This is within the threshold set by --verify.",
        );
      } else {
        console.error(
          `Verification: Only ${checks.okay} passed (${Math.round(
            checks.percentage,
          )} %), ${checks.fail} failed.\n` +
            "This is not within the threshold set by --verify. Exiting with an error.",
        );
        code = 3;
      }

      checks.failPaths.forEach((path): void => {
        console.error(path);
      });
    }
  }

  process.exitCode = code;
})().catch((error): void => {
  process.exitCode = 1;
  console.error(error);
});
