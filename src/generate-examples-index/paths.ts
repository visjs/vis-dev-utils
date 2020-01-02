import { Example, ExamplePath, ExamplePaths } from "./types";
import { createHash } from "crypto";
import { relative, resolve } from "path";

export function joinURLs(...urls: string[]): string {
  return urls
    .map((url): string => url.replace(/^\/?(.*?)\/?$/, "$1"))
    .join("/");
}

export function fixAbsoluteInputURL(baseURL: string, url: string): string {
  return url.startsWith("/")
    ? // Relative to the base URL. Base URL starts and URL ends with a slash.
      baseURL + url.slice(1)
    : // Relative to some other point or absolute already.
      url;
}

export function generatePaths(
  config: ExamplePaths,
  examplePath: Example["path"]
): ExamplePaths {
  return {
    codepen: generatePath(
      config.codepen.local,
      config.codepen.web,
      examplePath,
      "codepen",
      "html"
    ),
    jsfiddle: generatePath(
      config.jsfiddle.local,
      config.jsfiddle.web,
      examplePath,
      "jsfiddle",
      "html"
    ),
    page: {
      local: examplePath,
      web: joinURLs(config.page.web, relative(config.page.local, examplePath))
    },
    screenshot: generatePath(
      config.screenshot.local,
      config.screenshot.web,
      examplePath,
      "screenshot",
      "png"
    )
  };
}

export function generatePath(
  fileRoot: string,
  webRoot: string,
  pageFilePath: string,
  prefix: string,
  extension: string
): ExamplePath {
  const hash = createHash("sha256")
    .update(pageFilePath)
    .digest("hex");
  const filename = `${prefix}.${hash}.${extension}`;

  return {
    local: resolve(fileRoot, filename),
    web: joinURLs(webRoot, filename)
  };
}
