import $ from "cheerio";
import Pageres from "pageres";
import childProcess from "child_process";
import commonScreenshotScript from "./screenshot-script.js.txt";
import crypto from "crypto";
import fs from "fs";
import globby from "globby";
import indexTemplate from "./index.template.html";
import path from "path";
import prettier from "prettier";
import util from "util";
import yargs from "yargs";

yargs
  .usage("generate-example-index [options]")
  .hide("version")
  .help()

  .option("examples-directory", {
    alias: "d",
    default: "./examples",
    describe:
      "The directory where index.html and thumbnails will be written to and examples located.",
    type: "string"
  })
  .option("output", {
    alias: "o",
    default: "./index.html",
    describe:
      "The path of the generated index file relative to --examples-directory.",
    type: "string"
  })
  .option("lint", {
    alias: "l",
    default: false,
    describe: "Lint examples.",
    type: "boolean"
  })
  .option("index", {
    alias: "i",
    default: false,
    describe: "Generate index file.",
    type: "boolean"
  })
  .option("screenshots", {
    alias: "s",
    default: false,
    describe: "Render screenshot thumbnails.",
    type: "boolean"
  })
  .option("container-id", {
    alias: "c",
    default: "vis-container",
    describe: "The id of the elements where Vis will put canvas.",
    type: "string"
  })
  .option("web-url", {
    alias: "w",
    demand: true,
    describe: "The URL of web presentation (for example GitHub Pages).",
    type: "string"
  })
  .option("screenshot-script", {
    alias: "S",
    describe:
      "The path of JavaScript file that will be executed before taking a screenshot (and before any other JavaScript in the page).",
    type: "string"
  })
  .option("title", {
    alias: "t",
    default: "Examples",
    describe: "The title of the examples index.",
    type: "string"
  })
  .option("full-page", {
    alias: "f",
    default: true,
    describe:
      "Generate full page (<html>…</html>), if false generates only a list of examples (<div>…</div>) that can be inserted into different page with custom CSS.",
    type: "boolean"
  })
  .option("parallel", {
    alias: "p",
    default: 6,
    describe:
      "Generate n screenshots at the same time (there is quite high delay to make sure the graph is rendered before the screenshot is taken).",
    type: "number"
  });

// Pageres uses quite a lot of listeners when invoked multiple times in
// parallel. This ensures there are no warnings about it.
process.setMaxListeners(40);

// Resolve paths relative to PWD.
const screenshotScriptPath =
  typeof yargs.argv.screenshotScript === "string"
    ? path.resolve(yargs.argv.screenshotScript)
    : undefined;

// Set PWD. If omitted assumes it was executed in the root of the project.
const examplesRoot = yargs.argv.examplesDirectory as string;
process.chdir(examplesRoot);

// Resolve paths relative to examples root.
const indexPath = path.resolve(yargs.argv.output as string);

type ExamplesRoot = {
  [Key: string]: Examples;
};
type Examples = {
  [Key: string]: Examples | Example;
};
type Example = {
  $: CheerioStatic;
  delay: number;
  html: string;
  path: string;
  selector: string;
  titles: string[];
};

function isExample(value: any): value is Example {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.path === "string"
  );
}

const collator = new Intl.Collator("US");
const exec = util.promisify(childProcess.exec);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);

const formatHTML = (html: string | null | undefined): string =>
  prettier.format(html || "", { filepath: "index.html" });
const formatJS = (js: string | null | undefined): string =>
  prettier.format(js || "", { filepath: "script.js" });
const formatCSS = (css: string | null | undefined): string =>
  prettier.format(css || "", { filepath: "style.css" });

function getMeta(page: CheerioStatic, name: string, fallback: number): number;
function getMeta(page: CheerioStatic, name: string, fallback: string): string;
function getMeta(
  page: CheerioStatic,
  name: string,
  fallback: number | string
): number | string {
  const content = page(`meta[name="${name}"]`).attr("content");

  if (typeof fallback === "number") {
    const nmContent = Number.parseFloat(content);
    return !Number.isNaN(nmContent) ? nmContent : fallback;
  } else {
    return content != null ? content : fallback;
  }
}

class ContentBuilder {
  private readonly _root: Cheerio;
  private readonly _screenshotTodo: Example[] = [];

  private readonly _examples: ExamplesRoot;
  private readonly _fullPage: boolean;
  private readonly _indexPath: string;
  private readonly _parallel: number;
  private readonly _projectPath: string;
  private readonly _screenshotScript: string;
  private readonly _webURL: string;

  public constructor({
    examples,
    fullPage,
    indexPath,
    parallel,
    projectPath,
    screenshotScript = "",
    webURL
  }: {
    examples: ExamplesRoot;
    fullPage: boolean;
    indexPath: string;
    parallel: number;
    projectPath: string;
    screenshotScript: string;
    webURL: string;
  }) {
    this._root = $("<div>");

    this._examples = examples;
    this._fullPage = fullPage;
    this._indexPath = indexPath;
    this._parallel = parallel;
    this._projectPath = projectPath;
    this._screenshotScript = screenshotScript;
    this._webURL = webURL;
  }

  public build({
    generateIndex,
    renderScreenshots
  }: { generateIndex?: boolean; renderScreenshots?: boolean } = {}): {
    index: Promise<void>;
    screenshots: Promise<void>;
  } {
    const index = generateIndex
      ? (async (): Promise<void> => {
          // Generate index page.
          for (const key of Object.keys(this._examples).sort(
            collator.compare
          )) {
            this._root.append(
              await this._processGroup(this._examples[key], key, 1)
            );
          }

          if (this._fullPage) {
            const page = $.load(indexTemplate);
            page("title").text(yargs.argv.title as string);
            page("body").append(this._root);
            await writeFile(this._indexPath, formatHTML(page.html()));
          } else {
            await writeFile(this._indexPath, formatHTML(this._root.html()));
          }
        })()
      : Promise.resolve();

    const screenshots = renderScreenshots
      ? (async (): Promise<void> => {
          await index;

          // Generate screenshots.
          // There is quite long delay to ensure the chart is rendered properly
          // so it's much faster to run a lot of them at the same time.
          const total = this._screenshotTodo.length;
          let finished = 0;
          await Promise.all(
            new Array(this._parallel).fill(null).map(
              async (): Promise<void> => {
                let example;
                while ((example = this._screenshotTodo.pop())) {
                  await this._generateScreenshot(example);

                  ++finished;
                  console.info(
                    `${("" + Math.floor((finished / total) * 100)).padStart(
                      3,
                      " "
                    )}% - ${example.path}`
                  );
                }
              }
            )
          );
        })()
      : Promise.resolve();

    return { index, screenshots };
  }

  private async _processGroup(
    examples: Examples,
    title: string,
    level: number
  ): Promise<Cheerio> {
    const heading = $(`<h${Math.max(1, Math.min(6, level))}>`);
    heading.text(title);

    const list = $("<div>");

    const section = $("<div>");
    section.append(heading, list);

    for (const key of Object.keys(examples).sort(collator.compare)) {
      const example = examples[key];

      if (isExample(example)) {
        const header = $("<div>").append(
          // Title
          $("<a>")
            .attr("href", example.path)
            .text(key),
          // JSFiddle
          $("<span>")
            .addClass("playgrounds")
            .append(
              this._generateJSFiddle(example),
              this._generateCodePen(example)
            )
        );

        const image = $("<a>")
          .attr("href", example.path)
          .append(
            $("<div>")
              .addClass("example-image")
              .append(
                $("<img>")
                  .attr(
                    "src",
                    this._pageToScreenshotPath(example.path, "relative")
                  )
                  .attr("alt", key)
              )
          );

        const item = $("<span>")
          .addClass("example-link")
          .append(header, image);

        list.append(item);

        this._screenshotTodo.push(example);
      } else {
        section.append(await this._processGroup(example, key, level + 1));
      }
    }

    return section;
  }
  private _generatePlaygroundData(
    example: Example
  ): {
    code: {
      css: string;
      html: string;
      js: string;
    };
    resources: {
      css: string[];
      js: string[];
    };
  } {
    // JavaScript
    const eventListeners = Object.entries(example.$("body").get(0).attribs)
      .filter(([name]): boolean => /^on/.test(name))
      .map(([name, value]): [string, string] => [name.slice(2), `${value}`])
      .map(
        ([name, value]): string =>
          `window.addEventListener("${name}", () => { ${value} });`
      )
      .join("\n");
    const js = formatJS(
      example
        .$("script")
        .map((_i, elem) => elem.children[0])
        .get()
        .map((elem): string => elem.data)
        .join("") +
        "\n\n;" +
        eventListeners
    );

    // Cascading Style Sheets
    const css = formatCSS(
      example
        .$("style")
        .map((_i, elem) => elem.children[0])
        .get()
        .map((elem): string => elem.data)
        .join("")
    );

    // Hypertext Markup Language
    const $html = $.load(example.$("body").html() || "");
    $html("script").remove();

    const html = formatHTML($html("body").html());

    // Resources
    const fixPath = (rawPath: string): string =>
      /^https?:\/\//.test(rawPath)
        ? rawPath
        : path
            .resolve(path.dirname(example.path) + path.sep + rawPath)
            .replace(this._projectPath, this._webURL);
    const resources = {
      js: example
        .$("script")
        .map((_i, elem): string => $(elem).attr("src"))
        .get()
        .map(fixPath),
      css: example
        .$("link[rel='stylesheet']")
        .map((_i, elem): string => $(elem).attr("href"))
        .get()
        .map(fixPath)
    };

    return {
      code: {
        css,
        html,
        js
      },
      resources
    };
  }
  private _generateJSFiddle(example: Example): Cheerio {
    const data = this._generatePlaygroundData(example);

    const form = $("<form>");
    form.attr("action", "http://jsfiddle.net/api/post/library/pure/");
    form.attr("method", "post");
    form.attr("target", "_blank");
    form.append(
      $("<button>")
        .addClass("icon jsfiddle")
        .attr("alt", "JSFiddle")
        .attr("title", "JSFiddle")
        .html("&nbsp;") // No break space helps align the icon better.
    );

    // JavaScript
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "js")
        .attr("value", data.code.js)
    );

    // Cascading Style Sheets
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "css")
        .attr("value", data.code.css)
    );

    // Hypertext Markup Language
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "html")
        .attr("value", data.code.html)
    );

    // Resources
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "resources")
        .attr("value", [...data.resources.css, ...data.resources.js].join(","))
    );

    // Don't run JS before the DOM is ready.
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "wrap")
        .attr("value", "b")
    );

    // Title
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "title")
        .attr("value", example.titles.join(" | "))
    );

    return form;
  }
  private _generateCodePen(example: Example): Cheerio {
    const data = this._generatePlaygroundData(example);

    const form = $("<form>");
    form.attr("action", "https://codepen.io/pen/define");
    form.attr("method", "post");
    form.attr("target", "_blank");
    form.append(
      $("<button>")
        .addClass("icon codepen")
        .attr("alt", "CodePen")
        .attr("title", "CodePen")
        .html("&nbsp;"), // No break space helps align the icon better.
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "data")
        .attr(
          "value",
          JSON.stringify({
            css: data.code.css,
            css_external: data.resources.css.join(";"),
            html: data.code.html,
            js: data.code.js,
            js_external: data.resources.js.join(";"),
            title: example.titles.join(" | ")
          })
        )
    );

    // JavaScript
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "js")
        .attr("value", data.code.js)
    );

    // Cascading Style Sheets
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "css")
        .attr("value", data.code.css)
    );

    // Hypertext Markup Language
    form.append(
      $("<input>")
        .attr("type", "hidden")
        .attr("name", "html")
        .attr("value", data.code.html)
    );

    return form;
  }
  private async _generateScreenshot(example: Example): Promise<void> {
    const shotPath = this._pageToScreenshotPath(example.path, "absolute");
    const size = 400;

    // Prepare the page. It has to be written to the disk so that files with
    // relative URLs can be loaded. Pageres' script can't be used here because
    // it runs after the existing scripts on the page and therefore doesn't
    // allow to modify things prior to their invocation.
    const tmpPath = path.join(
      path.dirname(example.path),
      ".tmp.example.screenshot." + path.basename(example.path)
    );
    const screenshotPage = $.load(example.html);
    screenshotPage("head").prepend(
      $("<script>")
        .attr("type", "text/javascript")
        .text(commonScreenshotScript),
      $("<script>")
        .attr("type", "text/javascript")
        .text(this._screenshotScript)
    );
    await writeFile(tmpPath, formatHTML(screenshotPage.html()));

    // Render the page and take the screenshot.
    await new Pageres({
      delay: example.delay,
      selector: example.selector,
      css: [
        `${example.selector} {`,
        "  border: none !important;",

        "  position: relative !important;",
        "  top: unset !important;",
        "  left: unset !important;",
        "  bottom: unset !important;",
        "  right: unset !important;",

        `  height: ${size}px !important;`,
        `  max-height: ${size}px !important;`,
        `  max-width: ${size}px !important;`,
        `  min-height: ${size}px !important;`,
        `  min-width: ${size}px !important;`,
        `  width: ${size}px !important;`,
        "}"
      ].join("\n"),
      filename: shotPath.replace(/^.*\/([^\/]*)\.png$/, "$1"),
      format: "png"
    })
      .src(tmpPath, ["1280x720"])
      .dest(shotPath.replace(/\/[^\/]*$/, ""))
      .run();

    // Remove the temporary file.
    await unlink(tmpPath);
  }
  private _pageToScreenshotPath(
    pagePath: string,
    type: "relative" | "absolute"
  ): string {
    return path.join(
      type === "absolute" ? path.dirname(this._indexPath) : ".",
      "thumbnails",
      `${crypto
        .createHash("sha256")
        .update(pagePath)
        .digest("hex")}.png`
    );
  }
}

const exampleLinter = {
  lint(path: string, page: CheerioStatic): boolean {
    let valid = true;
    const msgs = [`${path}:`];

    if (page("#title").length !== 1) {
      msgs.push("Missing #title element in the body.");
      valid = false;
    }

    if (page("#title > *").length < 2) {
      msgs.push(
        "There have to be at least two headings (group and example name)."
      );
      valid = false;
    }

    const headTitle = page("head > title")
      .text()
      .trim();
    const bodyTitle = page("#title > *")
      .map((_i, elem): string => $(elem).text())
      .get()
      .join(" | ")
      .trim();
    if (headTitle !== bodyTitle) {
      msgs.push(
        "The title in the head doesn't match the title in the body.",
        `  head: ${headTitle}`,
        `  body: ${bodyTitle}`
      );
      valid = false;
    }

    if (msgs.length > 1) {
      console.warn("\n" + msgs.join("\n  "));
    }

    return valid;
  }
};

(async (): Promise<void> => {
  if (!yargs.argv.index && !yargs.argv.screenshots && !yargs.argv.lint) {
    yargs.parse("--help");
    return;
  }

  const examples: ExamplesRoot = {};
  const selector = "#" + yargs.argv.containerId;
  const stats = { examples: 0 };
  const skipped: string[] = [];

  await Promise.all(
    (await globby("**/*.html")).map(
      async (pagePath): Promise<any> => {
        const html = await readFile(pagePath, "utf-8");
        const $page = $.load(html);
        const pageDelay = getMeta($page, "example-screenshot-delay", 5);
        const pageSelector = getMeta(
          $page,
          "example-screenshot-selector",
          selector
        );

        // Is this an examples?
        if ($page(pageSelector).length === 0) {
          skipped.push(pagePath);
          return;
        }

        if (yargs.argv.lint) {
          exampleLinter.lint(pagePath, $page);
        }

        // Body titles.
        let titles = $page("#title > *")
          .get()
          .map((elem): string =>
            $page(elem)
              .text()
              .trim()
          );

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

        const example: Example = titles.reduce(
          (acc, title): any => {
            while (acc[title] != null && acc[title].path != null) {
              console.error("The following category already exists: ", titles);
              title += "!";
            }
            return (acc[title] = acc[title] || {});
          },
          examples as any
        );

        if (Object.keys(example).length) {
          console.error(
            "The following example has the same name as an already existing category: ",
            titles
          );
          return;
        }

        example.$ = $page;
        example.delay = pageDelay;
        example.html = html;
        example.path = pagePath;
        example.selector = pageSelector;
        example.titles = titles;

        ++stats.examples;
      }
    )
  );

  if (skipped.length) {
    process.stdout.write("\n");
    console.info(
      [
        "The following files don't look like examples (there is nothing to take a screenshot of):",
        ...skipped.sort()
      ].join("\n  ")
    );
  }

  if (stats.examples === 0) {
    console.info("No usable example files were found.");
  } else if (yargs.argv.index || yargs.argv.screenshots) {
    process.stdout.write("\n");

    // Get the project and web URL for JSFiddles.
    const projectPath = path.resolve(
      (await exec("npm prefix")).stdout.slice(0, -1)
    );
    const webURL = yargs.argv["web-url"] as string;
    const screenshotScript =
      screenshotScriptPath != null
        ? (await readFile(screenshotScriptPath, "utf-8")) || ""
        : "";

    const builtData = new ContentBuilder({
      examples,
      fullPage: yargs.argv.fullPage as boolean,
      indexPath,
      parallel: yargs.argv.parallel as number,
      projectPath,
      screenshotScript,
      webURL
    }).build({
      generateIndex: yargs.argv.index as boolean,
      renderScreenshots: yargs.argv.screenshots as boolean
    });

    // Create and write the page.
    if (yargs.argv.index) {
      await builtData.index;
      console.info(`Index file with ${stats.examples} example(s) was written.`);
    }

    // Create and write the screenshots.
    if (yargs.argv.screenshots) {
      await builtData.screenshots;
      console.info("All screenshot files were written.");
    }
  }
})();
