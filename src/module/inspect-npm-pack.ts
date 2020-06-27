import { spawnSync } from "child_process";

function runNpmPack(): string[] {
  const result = spawnSync("npm", ["pack", "--dry-run"], {
    env: { ...process.env, LC_ALL: "C" },
    stdio: "pipe",
    encoding: "utf-8"
  });

  return result.stderr.split(/[\r\n]+/);
}

function extractFiles(lines: string[]): string[] {
  const fileListingStart = lines.indexOf(
    "npm notice === Tarball Contents === "
  );
  const fileListingEnd = lines.indexOf("npm notice === Tarball Details === ");

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
    .map(line => line.replace(/^(.*)(.{7})$/, "$2 $1"));

  return files;
}

function extractName(lines: string[]): string {
  const nameLine = lines.find((line): boolean =>
    /^npm notice name:/.test(line)
  );

  if (nameLine == null) {
    throw new Error("Can't find the name of the package.");
  }

  return nameLine.replace(/^npm notice name: */, "");
}

export function inspectNpmPack(): { name: string; files: string[] } {
  const lines = runNpmPack();
  const files = extractFiles(lines);
  const name = extractName(lines);

  return {
    name,
    files
  };
}
