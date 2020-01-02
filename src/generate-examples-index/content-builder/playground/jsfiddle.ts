import $ from "cheerio";

import template from "./jsfiddle.template.html";
import { Example } from "../../types";

export function generateJSFiddlePage(example: Example): string {
  const data = example.playground;
  const title = example.titles.join(" | ");

  const page = $.load(template);
  page("title").text(title);
  const form = page("#form");

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
      .attr("value", title)
  );

  return page.html();
}
