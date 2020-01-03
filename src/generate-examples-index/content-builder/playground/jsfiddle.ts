import $ from "cheerio";

import template from "./jsfiddle.template.html";
import { Example } from "../../types";

export function generateJSFiddlePage(example: Example): string {
  const data = example.playground;
  const title = example.titles.join(" | ");
  const resources = [...data.resources.css, ...data.resources.js].join(",");

  const page = $.load(template);
  page("title").text(title);
  const form = page("#form");

  // Playground data.
  form.find('input[name="css"]').attr("value", data.code.css);
  form.find('input[name="html"]').attr("value", data.code.html);
  form.find('input[name="js"]').attr("value", data.code.js);
  form.find('input[name="resources"]').attr("value", resources);
  form.find('input[name="title"]').attr("value", title);

  // Don't run JS before the DOM is ready.
  form.find('input[name="wrap"]').attr("value", "b");

  return page.html();
}
