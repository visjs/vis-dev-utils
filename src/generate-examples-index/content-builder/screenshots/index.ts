import $ from "cheerio";
import { Jimp } from "jimp";
import { Browser } from "puppeteer";
import commonScreenshotScript from "./screenshot-script.js.txt";
import fs from "fs";
import { basename, dirname, posix, resolve, sep } from "path";
import { promisify } from "util";

import { Example } from "../../types";
import { formatHTML } from "../format";

const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

/**
 * Check if the screenshot is valid. At the moment this simply considers
 * everything except for solid color images as valid. This works pretty well
 * though may yield some false positives.
 * @param screenshot - The binary data of the screenshot.
 * @returns True for valid and false for invalid.
 */
async function isScreenshotValid(screenshot: Buffer): Promise<boolean> {
  const image = await Jimp.read(screenshot);
  const firstPixel = image.getPixelColor(0, 0);

  for (let x = 0; x < image.width; ++x) {
    for (let y = 0; y < image.height; ++y) {
      if (firstPixel !== image.getPixelColor(x, y)) {
        return true;
      }
    }
  }

  return false;
}

export interface GenerateScreenshotConfig {
  /**
   * Leave the contexts and tabs open for inspection, also don't delete the
   * temporary pages.
   */
  debug: boolean;
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
 * @param browser - Puppeteer's browser instance.
 * @param config - See the type's docs for detail.
 * @returns Whether or not the screenshot passed validation check.
 */
export async function generateScreenshot(
  browser: Browser,
  config: GenerateScreenshotConfig,
): Promise<boolean> {
  const { debug, example, height, screenshotScript, width } = config;

  const cleanup: (() => void | Promise<void>)[] = [];

  try {
    // Prepare the page. It has to be written to the disk so that files with
    // relative URLs can be loaded.
    const tmpPath = resolve(
      dirname(example.paths.page.local),
      ".tmp.example.screenshot." + basename(example.paths.page.local),
    );
    const screenshotPage = $.load(example.html);
    screenshotPage("head").prepend(
      $.load([])("<script>")
        .attr("type", "text/javascript")
        .text(`window.DEBUG = ${true};`),
      $.load([])("<script>")
        .attr("type", "text/javascript")
        .text(commonScreenshotScript),
      $.load([])("<script>")
        .attr("type", "text/javascript")
        .text(screenshotScript),
      $.load([])("<style>")
        .attr("type", "text/css")
        .text(
          [
            `${example.selector} {`,
            "  border: none !important;",
            "",
            `  min-width: ${width}px !important;`,
            `  min-height: ${height}px !important;`,
            `  width: ${width}px !important;`,
            `  height: ${height}px !important;`,
            `  max-width: ${width}px !important;`,
            `  max-height: ${height}px !important;`,
            "}",
          ].join("\n"),
        ),
    );
    await writeFile(tmpPath, await formatHTML(screenshotPage.html()));
    if (!debug) {
      cleanup.push((): Promise<void> => unlink(tmpPath));
    }

    const context = await browser.createBrowserContext();
    if (!debug) {
      cleanup.push((): Promise<void> => context.close());
    }

    const page = await context.newPage();
    if (!debug) {
      cleanup.push((): Promise<void> => page.close());
    }

    await page.setViewport({ width: width + 50, height: height + 50 });
    await page.goto("file://" + tmpPath.split(sep).join(posix.sep));

    await page.waitForSelector(example.selector, {
      visible: true,
      timeout: example.timeout * 1000,
    });

    const { delay } = example;
    if (delay === "call") {
      await page.evaluate(
        "function fn() { return window.readyToTakeAScreenshot; }",
      );
    } else {
      await new Promise(
        (resolve): void => void setTimeout(resolve, delay * 1000),
      );
    }

    const $element = await page.$(example.selector);
    if ($element == null) {
      throw new Error(
        `Element "${example.selector}" not found in ${example.path}.`,
      );
    }

    await $element.evaluate((element: Element): void => {
      element.scrollIntoView();
    });

    const screenshot = await $element.screenshot({
      encoding: "binary",
    });

    if (screenshot == null) {
      throw new Error(`Failed to take screenshot of “${example.paths.page}”`);
    } else if (typeof screenshot === "string") {
      // AFAIK this should never happen, it's just a problem with the types
      // always returning Buffer | string even when encoding is set to binary
      // (i.e. buffer).
      throw new Error(
        `Failed to get the binary data of the screenshot of “${example.paths.page}”`,
      );
    }

    await writeFile(example.paths.screenshot.local, screenshot);

    // Return the validity of the generated screenshot.
    return isScreenshotValid(Buffer.from(screenshot));
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    for (const callback of cleanup.splice(0).reverse()) {
      try {
        await callback();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
