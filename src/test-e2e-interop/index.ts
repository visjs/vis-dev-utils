import { parseArguments } from "./cli";
import { resolve } from "path";
import { ProjectPaths, PackageScript, test } from "./test";

const argv = parseArguments();

const rawProjectPathArg = [...argv["remote-project"], ...argv["local-project"]];
const projectPaths: ProjectPaths = rawProjectPathArg
  .map((raw): [string, string] => {
    const [name, path] = raw.split(" ", 2);

    if (typeof name === "string" && typeof path === "string") {
      if (/^[a-zA-Z0-9]+:\/\//.test(path)) {
        // Remote URL, use as is.
        return [name, path];
      } else {
        // Local path, resolve to prevent CWD issues.
        return [name, resolve(path)];
      }
    } else {
      console.error(
        `--project-path should be in 'project-name ./path' format, got '${raw}'.`
      );
      process.exit(1);
    }
  })
  .reduce<ProjectPaths>((acc, [name, path]): ProjectPaths => {
    acc[name] = path;
    return acc;
  }, {});

const rawPackageScriptArg = argv["package-script"];
const packageScripts: PackageScript[] = rawPackageScriptArg.flatMap(
  (raw): PackageScript[] => {
    const packageScripts: PackageScript[] = [];

    let packageName: string | null = null;
    for (const part of raw.split(" ")) {
      const mode = part.slice(-1);

      if (mode === "?" || mode === "!") {
        packageScripts.push({
          packageName,
          scriptName: part.slice(0, -1),
          skipIfMissing: mode === "?",
        });
      } else {
        packageName = part;
      }
    }

    return packageScripts;
  }
);

const tmpPath = argv["tmp-dir"] ? resolve(argv["tmp-dir"]) : undefined;

const failCommand = argv["fail-command"];

test({ failCommand, packageScripts, projectPaths, tmpPath });
