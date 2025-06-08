import { findUpSync } from "find-up";
import { readFileSync } from "fs";

/**
 * Take a string and return a doc block comment.
 * @param string - The raw text to be included in the comment.
 * @throws If the string already contains a comment.
 * @returns A block doc comment string that can be for example prepended to a
 * bundled JavaScript file.
 */
export function textToComment(string: string): string {
  if (string.includes("*/")) {
    throw new Error(
      "Don't include comments in the input string. It will be converted automatically.",
    );
  }

  return (
    "/**\n" +
    string
      // Remove empty lines from the start.
      .replace(/^[\n\r]*/, "")
      // Remove empty lines from the end.
      .replace(/[\n\r\s]*$/, "")
      // Process each line on it's own from now on.
      .split("\n")
      // Prefix each line with an asterisk.
      .map((line) => " * " + line)
      // Remove trailing white space.
      .map((line) => line.replace(/[^\S\r\n]*$/, ""))
      // Join back into a string.
      .join("\n") +
    "\n */\n"
  );
}

const packageJSON = JSON.parse(
  readFileSync(findUpSync("package.json")!, "utf8"),
);

const buildHeader = ({
  customText,
  date,
  description,
  homepage,
  name,
  version,
}: HeaderOptions): string =>
  textToComment(`
${name}
${homepage}

${description}

@version ${version}
@date    ${date}

@copyright (c) 2011-2017 Almende B.V, http://almende.com
@copyright (c) 2017-2019 visjs contributors, https://github.com/visjs

@license
vis.js is dual licensed under both

  1. The Apache 2.0 License
     http://www.apache.org/licenses/LICENSE-2.0

  and

  2. The MIT License
     http://opensource.org/licenses/MIT

vis.js may be distributed under either license.

${customText}
`);

/**
 * Options for {@link generateHeader}.
 */
export interface HeaderOptions {
  /** Any text to be appended to the standard header. */
  customText: string;
  /** The build date. */
  date: string;
  /** A description of the project. */
  description: string;
  /** An URL to the homepage of the project. */
  homepage: string;
  /** The name of the project. */
  name: string;
  /** The version of the build. */
  version: string;
}

const defaultDate = new Date().toISOString();
const defaultDescription = packageJSON.description;
const defaultHomepage = packageJSON.homepage;
const defaultName = packageJSON.name;
const defaultVersion = packageJSON.version;

/**
 * Generate a dynamic header banner.
 * @param options - Optional information to be included. Otherwise no custom
 * text will be appended, the date will be the time when this module was
 * imported (most likely the start of the build process) and the rest will be
 * read from package.json.
 * @throws If the string already contains a comment.
 * @returns Ready to use banner text.
 */
export function generateHeader(options?: Partial<HeaderOptions>): string {
  const {
    customText = "",
    date = defaultDate,
    description = defaultDescription,
    homepage = defaultHomepage,
    name = defaultName,
    version = defaultVersion,
  } = options || {};

  return buildHeader({
    customText,
    date,
    description,
    homepage,
    name,
    version,
  });
}
