import $ from "cheerio";
import Jimp from "jimp";
import Pageres from "pageres";
import commonScreenshotScript from "./screenshot-script.js.txt";
import fs from "fs";
import { basename, dirname, join } from "path";
import { promisify } from "util";

import { Example } from "../../types";
import { formatHTML } from "../format";

const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

/**
 * Check if the screenshot is valid. At the moment this simply considers
 * everything except for solid color images as valid. This works pretty well
 * though may yield some false positives.
 *
 * @param screenshot - The binary data of the screenshot.
 *
 * @returns True for valid and false for invalid.
 */
async function isScreenshotValid(screenshot: Buffer): Promise<boolean> {
  const image = await Jimp.read(screenshot);
  const firstPixel = image.getPixelColor(0, 0);

  for (let x = 0; x < image.getWidth(); ++x) {
    for (let y = 0; y < image.getHeight(); ++y) {
      if (firstPixel !== image.getPixelColor(x, y)) {
        return true;
      }
    }
  }

  return false;
}

export interface GenerateScreenshotConfig {
  /** The example for which the screenshot will be generated. */
  example: Example;
  /** Height of the captured screenshot. */
  height: number;
  /** A script to be executed as the first thing on the page. */
  screenshotScript: string;
  /** Width of the captured screenshot. */
  width: number;
}

/**
 * Capture an element on the example's page and save the screenshot to the
 * disk as a PNG file.
 *
 * @param config - See the type's docs for detail.
 *
 * @returns Whether or not the screenshot passed validation check.
 */
export async function generateScreenshot(
  config: GenerateScreenshotConfig
): Promise<boolean> {
  const { example, height, screenshotScript, width } = config;

  // Prepare the page. It has to be written to the disk so that files with
  // relative URLs can be loaded. Pageres' script can't be used here because
  // it runs after the existing scripts on the page and therefore doesn't
  // allow to modify things prior to their invocation.
  const tmpPath = join(
    dirname(example.paths.page.local),
    ".tmp.example.screenshot." + basename(example.paths.page.local)
  );
  const screenshotPage = $.load(example.html);
  screenshotPage("head").prepend(
    $("<script>")
      .attr("type", "text/javascript")
      .text(commonScreenshotScript),
    $("<script>")
      .attr("type", "text/javascript")
      .text(screenshotScript)
  );
  await writeFile(tmpPath, formatHTML(screenshotPage.html()));

  try {
    // Render the page and take the screenshot.
    const screenshots = await new Pageres({
      delay: example.delay,
      selector: example.selector,
      css: [
        `${example.selector} {`,
        "  border: none !important;",

        "  position: relative !important;",
        "  top: unset !important;",
        "  left: unset !important;",
        "  bottom: unset !important;",
        "  right: unset !important;",

        `  height: ${height}px !important;`,
        `  max-height: ${height}px !important;`,
        `  max-width: ${width}px !important;`,
        `  min-height: ${height}px !important;`,
        `  min-width: ${width}px !important;`,
        `  width: ${width}px !important;`,
        "}"
      ].join("\n"),
      filename: basename(example.paths.screenshot.local).replace(/\.png$/, ""),
      format: "png"
    })
      .src(tmpPath, ["1280x720"])
      .dest(dirname(example.paths.screenshot.local))
      .run();

    // Test the generated screenshots.
    return (await Promise.all(
      screenshots.map(
        (screenshot): Promise<boolean> => {
          return isScreenshotValid(screenshot);
        }
      )
    )).every((valid): boolean => valid);
  } finally {
    // Remove the temporary file.
    await unlink(tmpPath);
  }
}
