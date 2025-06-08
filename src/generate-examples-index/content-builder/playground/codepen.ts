import * as cheerioheerio from "cheerio";

import template from "./codepen.template.html";
import { Example } from "../../types";

/**
 * @param example
 */
export function generateCodePenPage(example: Example): string {
  const data = example.playground;
  const title = example.titles.join(" | ");

  const page = cheerioheerio.load(template);
  page("title").text(title);
  const form = page("#form");

  form.find('input[name="data"]').attr(
    "value",
    JSON.stringify({
      css: data.code.css,
      css_external: data.resources.css.join(";"),
      html: data.code.html,
      js: data.code.js,
      js_external: data.resources.js.join(";"),
      title: example.titles.join(" | "),
    }),
  );

  return page.html();
}
