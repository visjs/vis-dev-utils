import { execSync } from "child_process";
import { readFileSync } from "fs";
import { fileSync, setGracefulCleanup } from "tmp-promise";

setGracefulCleanup();

const PACK_CMD = ["npm", "pack", "--dry-run"];

function logStderr(
  textOrLines: string | readonly string[],
  message: string
): never {
  console.group('"npm pack" output');
  console.error(
    Array.isArray(textOrLines) ? textOrLines.join("\n") : textOrLines
  );
  console.groupEnd();

  throw new Error(message);
}

function runNpmPack(): string[] {
  const tmpFile = fileSync().name;

  // There are issues with incomplete output when the stderr is read directly
  // into Node. Saving it into tmp file using shell redirection and reading it
  // from there doesn't exhibit those issues.
  execSync(`${PACK_CMD.join(" ")} 2> ${tmpFile}`, {
    encoding: "utf-8",
    env: { ...process.env, LC_ALL: "C" },
  });

  const lines = readFileSync(tmpFile, "utf-8").split(/[\r\n]+/);

  return lines;
}

function extractFiles(lines: string[]): string[] {
  const fileListingStart = lines.indexOf(
    "npm notice === Tarball Contents === "
  );
  const fileListingEnd = lines.indexOf("npm notice === Tarball Details === ");

  if (fileListingStart === -1 || fileListingEnd === -1) {
    logStderr(
      lines.join("\n"),
      'Couldn\'t find tarball contents in "npm pack" output.'
    );
  }

  const files = lines
    .slice(fileListingStart + 1, fileListingEnd)
    .map((line): string => line.replace(/^npm notice /, ""))
    .map((line): string => line.trim())
    .map((line): string =>
      line.replace(
        /^([^ ]+) +(.*)/,
        (_, size, path): string =>
          `${path}${size === "0" ? "(empty)" : "       "}`
      )
    )
    .sort()
    .map((line) => line.replace(/^(.*)(.{7})$/, "$2 $1"));

  if (files.length === 0) {
    logStderr(lines, 'No files found in "npm pack" output.');
  }

  return files;
}

function extractName(lines: string[]): string {
  const nameLine = lines.find((line): boolean =>
    /^npm notice name:/.test(line)
  );

  if (nameLine == null) {
    logStderr(
      lines,
      'Can\'t find the name of the package in "npm pack" output.'
    );
  }

  return nameLine.replace(/^npm notice name: */, "");
}

export function inspectNpmPack(): { name: string; files: string[] } {
  const lines = runNpmPack();
  const files = extractFiles(lines);
  const name = extractName(lines);

  return {
    name,
    files,
  };
}
