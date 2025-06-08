import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";

import indexTemplate from "./index.template.html";
import styleTemplate from "./index.template.css";
import { ContentPart, Renderer, isExample } from "../common";
import { Example, Examples, ExamplesRoot } from "../../types";
import { formatHTML } from "../format";

/**
 * @param example
 */
function generateJSFiddle(example: Example): cheerio.Cheerio<AnyNode> {
  return cheerio
    .load([])("<a>")
    .addClass("icon jsfiddle")
    .attr("href", example.paths.jsfiddle.web)
    .attr("title", "JSFiddle");
}

/**
 * @param example
 */
function generateCodePen(example: Example): cheerio.Cheerio<AnyNode> {
  return cheerio
    .load([])("<a>")
    .addClass("icon codepen")
    .attr("href", example.paths.codepen.web)
    .attr("title", "CodePen");
}

/**
 * @param examples
 * @param title
 * @param level
 * @param collator
 */
function processGroup(
  examples: Examples,
  title: string,
  level: number,
  collator: Intl.Collator,
): cheerio.Cheerio<AnyNode> {
  const heading = cheerio.load([])(`<h${Math.max(1, Math.min(6, level))}>`);
  heading.text(title);

  const list = cheerio.load([])("<div>");

  const section = cheerio.load([])("<div>");
  section.append(heading, list);

  for (const key of Object.keys(examples).sort(collator.compare)) {
    const example = examples[key];

    if (isExample(example)) {
      const header = cheerio
        .load([])("<div>")
        .addClass("example-header")
        .append(
          // Playgrounds
          generateJSFiddle(example),
          generateCodePen(example),
          // Title
          cheerio
            .load([])("<a>")
            .attr("href", example.paths.page.web)
            .text(key),
        );

      const image = cheerio
        .load([])("<a>")
        .addClass("example-image")
        .attr("href", example.paths.page.web)
        .append(
          cheerio
            .load([])("<img>")
            .attr("src", example.paths.screenshot.web)
            .attr("alt", key),
        );

      const item = cheerio
        .load([])("<span>")
        .addClass("example-link")
        .append(header, image);

      list.append(item);
    } else {
      section.append(processGroup(example, key, level + 1, collator));
    }
  }

  return section;
}

export const htmlRenderer: Renderer = {
  async render(
    examples: ExamplesRoot,
    _output: string,
    title: string,
    collator: Intl.Collator,
  ): Promise<ContentPart[]> {
    const filename = "index.html";

    const root = cheerio.load([])("<div>");
    root.addClass("examples-root");

    for (const key of Object.keys(examples).sort(collator.compare)) {
      root.append(processGroup(examples[key], key, 1, collator));
    }

    const page = cheerio.load(indexTemplate);
    page("title").text(title);
    page("body").append(root);
    const content = await formatHTML(page.html());

    return [
      { content, filename, title },
      {
        content: styleTemplate,
        filename: "examples.css",
        title: "examples.css",
      },
    ];
  },
  screenshot: {
    width: 400,
    height: 400,
  },
};
