import { execSync } from "child_process";
import { readFileSync } from "fs";
import { fileSync, setGracefulCleanup } from "tmp-promise";

setGracefulCleanup();

interface PackageInfo {
  id: string;
  name: string;
  version: string;
  size: number;
  unpackedSize: number;
  shasum: string;
  integrity: string;
  filename: string;
  files: FileInfo[];
  entryCount: number;
  bundled: string[];
}

interface FileInfo {
  path: string;
  size: number;
  mode: number;
}

const PACK_CMD = [
  "npm",
  "pack",
  // Don't create any package, we just need to see what would be packed.
  "--dry-run",
  // Prevents things like Husky from outputting to stdout, we don't need them
  // here anyway.
  "--ignore-scripts",
  // JSON is easier to parse and more stable between npm versions.
  "--json",
];

/**
 * @param textOrLines
 * @param message
 */
function logStderr(textOrLines: unknown, message: string): never {
  console.group('"npm pack" output');
  console.error(textOrLines);
  console.groupEnd();

  throw new Error(message);
}

/**
 *
 */
function runNpmPack(): PackageInfo[] {
  const tmpFile = fileSync().name;

  // There are issues with incomplete output when the stderr is read directly
  // into Node. Saving it into tmp file using shell redirection and reading it
  // from there doesn't exhibit those issues.
  execSync(`${PACK_CMD.join(" ")} > ${tmpFile}`, {
    encoding: "utf-8",
    env: {
      ...process.env,
      LC_ALL: "C",
      NODE_ENV: "production",
    },
  });

  const stdout = readFileSync(tmpFile, "utf-8")
    // TODO: Why doesn't --ignore-scripts turn Husky off? It works in CLI.
    .replace(/^([^[]*)\[\n/, "[");

  try {
    return JSON.parse(stdout);
  } catch (error) {
    logStderr({ error, stdout }, 'Failed to parse "npm pack" JSON output.');
  }
}

/**
 * @param lines
 * @param packageInfo
 */
function extractFiles(
  packageInfo: PackageInfo,
): Record<string, Record<string, unknown>> {
  const files = packageInfo.files.map(
    ({ path, size }): [string, Record<string, unknown>] => [
      path,
      { empty: size === 0 },
    ],
  );

  if (files.length === 0) {
    logStderr(packageInfo, 'No files found in "npm pack" output.');
  }

  return Object.fromEntries(files);
}

/**
 * @param lines
 * @param packageInfo
 */
function extractName(packageInfo: PackageInfo): string {
  const name = packageInfo.name;

  if (name == null) {
    logStderr(
      packageInfo,
      'Can\'t find the name of the package in "npm pack" output.',
    );
  }

  return name.replace(/^npm notice name: */, "");
}

/**
 *
 */
export function inspectNpmPack(): {
  name: string;
  files: Record<string, Record<string, unknown>>;
} {
  const [packageInfo, ...unexpectedExtras] = runNpmPack();

  if (packageInfo == null) {
    logStderr(
      [packageInfo, ...unexpectedExtras],
      'There was no output from "npm pack".',
    );
  }

  if (unexpectedExtras.length !== 0) {
    logStderr(
      [packageInfo, ...unexpectedExtras],
      'Can\'t process the output of "npm pack" if there are multiple packages.',
    );
  }

  const files = extractFiles(packageInfo);
  const name = extractName(packageInfo);

  return {
    name,
    files,
  };
}
