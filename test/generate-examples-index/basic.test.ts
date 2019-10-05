import $ from "cheerio";
import childProcess from "child_process";
import fs from "fs";
import path from "path";
import tmp from "tmp-promise";
import util from "util";
import { expect } from "chai";

const exec = util.promisify(childProcess.exec);
const executable = path.resolve(
  `${exec("npm root")}/../bin/generate-examples-index.js`
);
const examplesPath = path.resolve(`${__dirname}/examples`);

const baseURL = "https://visjs.github.io/vis-test";
const nmExamples = 6;
const title = "Test Examples";

describe("generate-examples-index", function(): void {
  const { name: outputDir } = tmp.dirSync({ mode: 0o700 });
  const outputIndex = path.join(outputDir, "index.html");
  const outputScreenshots = path.join(outputDir, "thumbnails");
  let $index: CheerioStatic;

  it("is executable built", function(): void {
    expect(
      fs.existsSync(executable),
      "The built executable has to be present for any of the following tests to pass."
    ).to.be.true;
  });

  it("generate index", async function(): Promise<void> {
    this.timeout(10 * 60 * 1000);

    await exec(
      [
        "node",
        executable,
        "--container-id test-element",
        "--index",
        "--screenshots",
        `--examples-directory "${examplesPath}"`,
        `--output "${outputIndex}"`,
        `--title "${title}"`,
        `--web-url "${baseURL}"`
      ].join(" ")
    );
  });

  describe("verify index", function(): void {
    it("valid HTML", function(): void {
      $index = $.load(fs.readFileSync(outputIndex, "utf-8"));
    });

    it("title", function(): void {
      expect($index("title").text()).to.equal(title);
    });

    it("links", function(): void {
      expect(
        $index(".example-link").length,
        `There should be ${nmExamples} links to examples.`
      ).to.equal(nmExamples);
    });

    it("screenshots", function(): void {
      expect(
        fs.readdirSync(outputScreenshots),
        `There should be ${nmExamples} screenshots.`
      ).have.lengthOf(nmExamples);
    });

    for (const i of new Array(nmExamples)
      .fill(null)
      .map((_value, i): number => i)) {
      describe(`example ${i + 1}`, function(): void {
        function getNthExample(n: number): Cheerio {
          return $index(".example-link").eq(n);
        }

        it("thumbnail", function(): void {
          expect(
            getNthExample(i).find(".example-image img").length,
            "There should be a screenshot of this example."
          ).to.equal(1);
        });

        it("JSFiddle", function(): void {
          expect(
            getNthExample(i).find("form button.icon.jsfiddle").length,
            "There should be exactly 1 JSFiddle icon."
          ).to.equal(1);
        });

        it("CodePen", function(): void {
          expect(
            getNthExample(i).find("form button.icon.codepen").length,
            "There should be exactly 1 CodePen icon."
          ).to.equal(1);
        });
      });
    }
  });
});
