import $ from "cheerio";

import indexTemplate from "./index.template.html";
import styleTemplate from "./index.template.css";
import { ContentPart, Renderer, isExample } from "../common";
import { Example, Examples, ExamplesRoot } from "../../types";
import { formatHTML } from "../format";

function generateJSFiddle(example: Example): Cheerio {
  return $("<a>")
    .addClass("icon jsfiddle")
    .attr("href", example.paths.jsfiddle.web)
    .attr("title", "JSFiddle");
}

function generateCodePen(example: Example): Cheerio {
  return $("<a>")
    .addClass("icon codepen")
    .attr("href", example.paths.codepen.web)
    .attr("title", "CodePen");
}

function processGroup(
  examples: Examples,
  title: string,
  level: number,
  collator: Intl.Collator
): Cheerio {
  const heading = $(`<h${Math.max(1, Math.min(6, level))}>`);
  heading.text(title);

  const list = $("<div>");

  const section = $("<div>");
  section.append(heading, list);

  for (const key of Object.keys(examples).sort(collator.compare)) {
    const example = examples[key];

    if (isExample(example)) {
      const header = $("<div>").addClass("example-header").append(
        // Playgrounds
        generateJSFiddle(example),
        generateCodePen(example),
        // Title
        $("<a>").attr("href", example.paths.page.web).text(key)
      );

      const image = $("<a>")
        .addClass("example-image")
        .attr("href", example.paths.page.web)
        .append(
          $("<img>").attr("src", example.paths.screenshot.web).attr("alt", key)
        );

      const item = $("<span>").addClass("example-link").append(header, image);

      list.append(item);
    } else {
      section.append(processGroup(example, key, level + 1, collator));
    }
  }

  return section;
}

export const htmlRenderer: Renderer = {
  render(
    examples: ExamplesRoot,
    _output: string,
    title: string,
    collator: Intl.Collator
  ): ContentPart[] {
    const filename = "index.html";

    const root = $("<div>");
    root.addClass("examples-root");

    for (const key of Object.keys(examples).sort(collator.compare)) {
      root.append(processGroup(examples[key], key, 1, collator));
    }

    const page = $.load(indexTemplate);
    page("title").text(title);
    page("body").append(root);
    const content = formatHTML(page.html());

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
