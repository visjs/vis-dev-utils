import { Example, ExamplePath, ExamplePaths } from "./types";
import { createHash } from "crypto";
import { relative, resolve } from "path";

/**
 * @param urls
 */
export function joinURLs(...urls: string[]): string {
  return urls
    .map((url): string =>
      // Strip the parts of leading and trailing slashes if they have them.
      url.replace(/^\/?(.*?)\/?$/, "$1"),
    )
    .join("/");
}

/**
 * @param baseURL
 * @param url
 */
export function fixAbsoluteInputURL(baseURL: string, url: string): string {
  return url.startsWith("/")
    ? // Relative to the base URL. Base URL starts and URL ends with a slash.
      baseURL + url.slice(1)
    : // Relative to some other point or absolute already.
      url;
}

/**
 * @param config
 * @param exampleAbsolutePath
 */
export function generatePaths(
  config: ExamplePaths,
  exampleAbsolutePath: Example["path"],
): ExamplePaths {
  const exampleRelativePath = relative(config.page.local, exampleAbsolutePath);

  // It's important that the hash is created from the relative path so that it
  // is the same on all computers.
  const hash = createHash("sha256").update(exampleRelativePath).digest("hex");

  return {
    codepen: generateLocalWebPair(
      config.codepen.local,
      config.codepen.web,
      hash,
      "codepen",
      "html",
    ),
    jsfiddle: generateLocalWebPair(
      config.jsfiddle.local,
      config.jsfiddle.web,
      hash,
      "jsfiddle",
      "html",
    ),
    page: {
      local: exampleAbsolutePath,
      web: joinURLs(config.page.web, exampleRelativePath),
    },
    screenshot: generateLocalWebPair(
      config.screenshot.local,
      config.screenshot.web,
      hash,
      "screenshot",
      "png",
    ),
  };
}

/**
 * @param localRoot
 * @param webRoot
 * @param hash
 * @param prefix
 * @param extension
 */
function generateLocalWebPair(
  localRoot: string,
  webRoot: string,
  hash: string,
  prefix: string,
  extension: string,
): ExamplePath {
  const filename = `${prefix}.${hash}.${extension}`;

  return {
    local: resolve(localRoot, filename),
    web: joinURLs(webRoot, filename),
  };
}
