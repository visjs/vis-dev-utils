import $ from "cheerio";
import childProcess from "child_process";
import fs from "fs";
import path from "path";
import tmp from "tmp-promise";
import { expect } from "chai";

const exec = childProcess.execSync;
const executable = path.resolve(
  `${exec("npm root")}/../bin/generate-examples-index.js`
);
const examplesPath = path.resolve(`${__dirname}/examples`);

const baseURL = "https://visjs.github.io/vis-test";
const title = "Test Examples";

describe("generate-examples-index", function(): void {
  const { name: output } = tmp.fileSync({ mode: 0o600, postfix: "html" });
  let $index: CheerioStatic;

  it("built", function(): void {
    expect(
      fs.existsSync(executable),
      "The built executable has to be present for any of the following tests to pass."
    ).to.be.true;
  });

  it("generate index", function(): void {
    this.timeout(60000);

    exec(
      [
        "node",
        executable,
        "-c test-element",
        "-i",
        `-d "${examplesPath}"`,
        `-o ${output}`,
        `-t "${title}"`,
        `-w "${baseURL}"`
      ].join(" ")
    );

    $index = $.load(fs.readFileSync(output, "utf-8"));
  });

  describe("verify index", function(): void {
    it("title", function(): void {
      expect($index("title").text()).to.equal(title);
    });

    it("examples", function(): void {
      expect(
        $index(".example-link").length,
        "There should be 4 links to examples."
      ).to.equal(4);
    });

    for (const i of [0, 1, 2, 3]) {
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
