import $ from "cheerio";
import snapshot from "snap-shot-it";
import tmp from "tmp-promise";
import { existsSync, readFileSync } from "fs";
import { expect } from "chai";
import { join, resolve } from "path";
import { spawnSync } from "child_process";
import { sync as globby } from "globby";

const executable = resolve(
  spawnSync("npm", ["root"]).stdout.toString().slice(0, -1),
  "../bin/generate-examples-index.js"
);

const baseURL = "https://visjs.github.io/vis-test/";
const nmExamples = 6;
const title = "Test Examples";

interface OutputDirs {
  assets: string;
  dir: string;
  index: string;
  pages: string;
}

function prepareWorkplace(): OutputDirs {
  const dir = resolve(tmp.dirSync({ mode: 0o700 }).name);
  const assets = resolve(dir, "generated", "assets");
  const index = resolve(dir, "generated", "index");
  const pages = resolve(dir, "generated", "pages");

  return { assets, dir, index, pages };
}

function generate(options: {
  format?: "html" | "md";
  output: OutputDirs;
  threshold?: number;
  type: "okay" | "broken";
}): ReturnType<typeof spawnSync> {
  const { output, type, threshold = 100, format = "html" } = options;

  const examplesDir = resolve(
    __dirname,
    type === "broken" ? "broken-examples" : "examples"
  );
  const verify = "" + threshold;

  return spawnSync(
    "node",
    [
      executable,
      ...[
        ["--assets-local-directory", output.assets],
        ["--assets-web-directory", "/public/examples/assets"],
        ["--base-url", baseURL],
        ["--container-id", "test-element"],
        ["--examples-local-directory", examplesDir],
        ["--examples-web-directory", "/examples"],
        ["--format", format],
        ["--index"],
        ["--output-directory", output.index],
        ["--pages-local-directory", output.pages],
        ["--pages-web-directory", "/public/examples/pages"],
        ["--playgrounds"],
        ["--screenshots"],
        ["--title", title],
        ["--verify", verify],
      ].flat(),
    ],
    { stdio: "ignore" }
  );
}

describe("generate-examples-index", function (): void {
  it("is executable built", function (): void {
    expect(
      existsSync(executable),
      "The built executable has to be present for any of the following tests to pass."
    ).to.be.true;
  });

  describe("working examples", function (): void {
    const output = prepareWorkplace();
    let $index: CheerioStatic;

    it("generate index", function (): void {
      this.timeout(30 * 60 * 1000);

      generate({ output, type: "okay" });
    });

    describe("verify index", function (): void {
      it("valid HTML", function (): void {
        $index = $.load(
          readFileSync(join(output.index, "index.html"), "utf-8")
        );
      });

      it("title", function (): void {
        expect($index("title").text()).to.equal(title);
      });

      it("links", function (): void {
        expect(
          $index(".example-link").length,
          `There should be ${nmExamples} links to examples.`
        ).to.equal(nmExamples);
      });

      describe("files", function (): void {
        it("JSFiddles", function (): void {
          expect(
            globby(join(output.pages, "jsfiddle.*.html")),
            `There should be ${nmExamples} JSFiddle opener files.`
          ).have.lengthOf(nmExamples);
        });

        it("CodePens", function (): void {
          expect(
            globby(join(output.pages, "codepen.*.html")),
            `There should be ${nmExamples} CodePen opener files.`
          ).have.lengthOf(nmExamples);
        });

        it("screenshots", function (): void {
          expect(
            globby(join(output.assets, "*.png")),
            `There should be ${nmExamples} screenshots.`
          ).have.lengthOf(nmExamples);
        });
      });

      for (const i of new Array(nmExamples)
        .fill(null)
        .map((_value, i): number => i)) {
        describe(`example ${i + 1}`, function (): void {
          function getNthExample(n: number): Cheerio {
            return $index(".example-link").eq(n);
          }

          it("thumbnail", function (): void {
            expect(
              getNthExample(i).find(".example-image img").length,
              "There should be a screenshot of this example."
            ).to.equal(1);
          });

          it("JSFiddle", function (): void {
            expect(
              getNthExample(i).find(".icon.jsfiddle").length,
              "There should be exactly 1 JSFiddle icon."
            ).to.equal(1);
          });

          it("CodePen", function (): void {
            expect(
              getNthExample(i).find(".icon.codepen").length,
              "There should be exactly 1 CodePen icon."
            ).to.equal(1);
          });
        });
      }
    });
  });

  describe("broken examples", function (): void {
    const output = prepareWorkplace();

    [
      { threshold: undefined, code: 3 },
      { threshold: 100, code: 3 },
      { threshold: 90, code: 3 },
      { threshold: 80, code: 0 },
      { threshold: 0, code: 0 },
    ].forEach(({ threshold, code }): void => {
      it(
        (threshold == null ? "default" : threshold + " %") +
          " threshold, 1 broken, 6 okay",
        function (): void {
          this.timeout(90 * 60 * 1000);

          const ret = generate({ output, type: "broken", threshold });

          expect(
            ret,
            `Exit code ${code} should be returned when verification ${
              code === 0 ? "succeeds" : "fails"
            }.`
          )
            .to.haveOwnProperty("status")
            .that.equals(code);
        }
      );
    });
  });

  describe("snapshots", function (): void {
    for (const format of ["html", "md"] as const) {
      for (const type of ["okay", "broken"] as const) {
        describe(`${type} ${format}`, function (): void {
          const output = prepareWorkplace();

          it("generate", function (): void {
            this.timeout(30 * 60 * 1000);

            generate({ output, format, type });
          });

          it("directory structure", function (): void {
            snapshot(globby("**/*", { cwd: output.dir }).sort());
          });

          it("file contents", function (): void {
            for (const relativePath of globby(
              [
                "**/*",
                // Exclude images, test only text files.
                "!**/*.png",
              ],
              { cwd: output.dir }
            )) {
              snapshot(
                `${this.test!.fullTitle()} ${relativePath}`,
                readFileSync(join(output.dir, relativePath), "utf-8")
              );
            }
          });
        });
      }
    }
  });
});
