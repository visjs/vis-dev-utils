import * as cheerio from "cheerio";
import { Text } from "domhandler";
import { dirname, relative, resolve } from "path";

import { Example, PlaygroundData } from "../../types";
import { formatCSS, formatHTML, formatJS } from "../format";

/**
 * @param baseURL
 * @param example$
 * @param examplePath
 */
export function generatePlaygroundData(
  baseURL: string,
  example$: Example["$"],
  examplePath: Example["path"]
): PlaygroundData {
  const firstBodyChild = example$("body").get(0);
  if (firstBodyChild == null) {
    throw new Error("Example body has no children.");
  }

  // JavaScript
  const eventListeners = Object.entries(firstBodyChild.attribs)
    .filter(([name]): boolean => /^on/.test(name))
    .map(([name, value]): [string, string] => [name.slice(2), `${value}`])
    .map(
      ([name, value]): string =>
        `window.addEventListener("${name}", () => { ${value} });`
    )
    .join("\n");
  const js = formatJS(
    example$("script")
      .map((_i, elem) => elem.children[0] as Text)
      .get()
      .map((elem): string => elem.data)
      .join("") +
      "\n\n;" +
      eventListeners
  );

  // Cascading Style Sheets
  const css = formatCSS(
    example$("style")
      .map((_i, elem) => elem.children[0] as Text)
      .get()
      .map((elem): string => elem.data)
      .join("")
  );

  // Hypertext Markup Language
  const $html = cheerio.load(example$("body").html() || "");
  $html("script").remove();

  const html = formatHTML($html("body").html());

  // Resources
  const fixPath = (rawPath: string): string =>
    /^https?:\/\//.test(rawPath)
      ? // World wide web absolute.
        rawPath
      : /^\//.test(rawPath)
      ? // Domain absolute.
        baseURL + rawPath.slice(1)
      : //Relative.
        baseURL +
        relative(process.cwd(), resolve(dirname(examplePath), rawPath));

  const resources = {
    js: example$("script")
      .map((_i, elem): undefined | string =>
        cheerio.load(elem)("script").attr("src")
      )
      .get()
      .filter((src): src is string => typeof src === "string")
      .map(fixPath),
    css: example$("link[rel='stylesheet']")
      .map((_i, elem): undefined | string =>
        cheerio.load(elem)("script").attr("href")
      )
      .get()
      .filter((href): href is string => typeof href === "string")
      .map(fixPath),
  };

  return {
    code: {
      css,
      html,
      js,
    },
    resources,
  };
}
