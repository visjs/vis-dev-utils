import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const y = yargs(hideBin(process.argv))
  .strict(true)
  .usage("generate-example-index [options]")
  .hide("version")
  .config()
  .help()

  .option("assets-local-directory", {
    default: "./examples/thumbnails",
    describe: "The directory where assets will be written to.",
    type: "string",
  })
  .option("assets-web-directory", {
    default: "./thumbnails",
    describe: "The directory where assets will be loaded from on the web.",
    type: "string",
  })
  .option("base-url", {
    demand: true,
    describe:
      "The base URL for relative imports. Web URLs starting with slash will be relative to this URL.",
    type: "string",
  })
  .option("examples-local-directory", {
    default: "./examples/thumbnails",
    describe: "The directory where examples will be loaded from locally.",
    type: "string",
  })
  .option("examples-web-directory", {
    default: "./thumbnails",
    describe: "The directory where examples will be loaded from on the web.",
    type: "string",
  })
  .option("output-directory", {
    default: "./examples",
    describe: "The directory where generated files will be emitted.",
    type: "string",
  })
  .option("pages-local-directory", {
    default: "./examples/pages",
    describe: "The directory where pages will be written to.",
    type: "string",
  })
  .option("pages-web-directory", {
    default: "./pages",
    describe: "The directory where pages will be loaded from on the web.",
    type: "string",
  })

  .option("index", {
    default: false,
    describe: "Generate index files.",
    type: "boolean",
  })
  .option("lint", {
    default: false,
    describe: "Lint examples.",
    type: "boolean",
  })
  .option("playgrounds", {
    default: false,
    describe: "Generate playground pages.",
    type: "boolean",
  })
  .option("screenshots", {
    default: false,
    describe: "Render screenshot thumbnails.",
    type: "boolean",
  })

  .option("container-id", {
    default: "vis-container",
    describe: "The id of the elements where Vis will put canvas.",
    type: "string",
  })
  .option("format", {
    default: "html",
    describe: "Whether HTML or Markdown should be generated.",
    type: "string",
  })
  .option("parallel", {
    default: 6,
    describe:
      "Generate n screenshots at the same time (there is quite high delay to make sure the graph is rendered before the screenshot is taken so the CPU utilization is generally quite low).",
    type: "number",
  })
  .option("screenshot-script", {
    describe:
      "The path of JavaScript file that will be executed before taking a screenshot (and before any other JavaScript in the page).",
    type: "string",
  })
  .option("title", {
    default: "Examples",
    describe: "The title of the examples index.",
    type: "string",
  })
  .option("verify", {
    default: 100,
    describe:
      "Attempt to verify that the examples were generated correctly. The value is a percentage of checks that have to pass for the run to be considered success.",
    type: "number",
  });

/**
 *
 */
export function parseArguments(): ReturnType<(typeof y)["parseSync"]> {
  return y.parserConfiguration({ "camel-case-expansion": false }).parseSync();
}
