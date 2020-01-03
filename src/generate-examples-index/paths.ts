import { Example, ExamplePath, ExamplePaths } from "./types";
import { createHash } from "crypto";
import { relative, resolve } from "path";

export function joinURLs(...urls: string[]): string {
  return urls
    .map((url): string =>
      // Strip the parts of leading and trailing slashes if they have them.
      url.replace(/^\/?(.*?)\/?$/, "$1")
    )
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
  exampleRawPath: Example["path"]
): ExamplePaths {
  return {
    codepen: generateLocalWebPair(
      config.codepen.local,
      config.codepen.web,
      exampleRawPath,
      "codepen",
      "html"
    ),
    jsfiddle: generateLocalWebPair(
      config.jsfiddle.local,
      config.jsfiddle.web,
      exampleRawPath,
      "jsfiddle",
      "html"
    ),
    page: {
      local: exampleRawPath,
      web: joinURLs(
        config.page.web,
        relative(config.page.local, exampleRawPath)
      )
    },
    screenshot: generateLocalWebPair(
      config.screenshot.local,
      config.screenshot.web,
      exampleRawPath,
      "screenshot",
      "png"
    )
  };
}

function generateLocalWebPair(
  localRoot: string,
  webRoot: string,
  exampleRawPath: string,
  prefix: string,
  extension: string
): ExamplePath {
  const hash = createHash("sha256")
    .update(exampleRawPath)
    .digest("hex");
  const filename = `${prefix}.${hash}.${extension}`;

  return {
    local: resolve(localRoot, filename),
    web: joinURLs(webRoot, filename)
  };
}
