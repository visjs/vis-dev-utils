import { DirResult, dirSync, setGracefulCleanup } from "tmp";
import { resolve } from "path";
import { sync as findUp } from "find-up";
import {
  copyFileSync,
  copySync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
} from "fs-extra";

import { spawnThrow, logError, logInfo } from "./util";

// Remove all temporary files on process exit.
setGracefulCleanup();

interface TestData {
  failCommand?: string;
  projectPaths: ProjectPaths;
  packageScripts: readonly PackageScript[];
  tmpDir: DirResult;
  tmpRelativeResolve(...paths: string[]): string;
  visDevUtilsPath: string;
}

export interface PackageScript {
  packageName: string | null;
  scriptName: string;
  skipIfMissing: boolean;
}

export type ProjectPaths = Record<string, string>;

function prepareTmpDir(tmpPath?: string): DirResult {
  if (tmpPath) {
    try {
      mkdirSync(tmpPath);
    } catch (error) {
      if (error.code != "EEXIST") {
        throw error;
      }
    }

    return {
      name: tmpPath,
      removeCallback: (): void => {},
    };
  } else {
    return dirSync({ unsafeCleanup: true });
  }
}

function getTarballName(projectName: string): string {
  return `${projectName}-0.0.0-no-version.tgz`;
}

function getTarballPath(
  { tmpRelativeResolve }: TestData,
  projectName: string
): string {
  return tmpRelativeResolve(`${projectName}-0.0.0-no-version.tgz`);
}

function copyTarball(data: TestData, projectName: string): void {
  copyFileSync(getTarballName(projectName), getTarballPath(data, projectName));
}

function getCurrentPackageDeps(): string[] {
  const packageJSONPath = findUp("package.json");
  if (packageJSONPath == null) {
    throw new Error("Project's package.json file not found.");
  }
  const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf8"));

  return [
    ...new Set([
      ...Object.keys(packageJSON.dependencies || {}),
      ...Object.keys(packageJSON.devDependencies || {}),
      ...Object.keys(packageJSON.peerDependencies || {}),
    ]),
  ];
}

function tmpCd<T>(path: string, callback: () => T): T {
  const prevPath = process.cwd();
  try {
    process.chdir(path);
    return callback();
  } finally {
    process.chdir(prevPath);
  }
}

function clone(data: TestData, projectName: string): void {
  const { failCommand, projectPaths, tmpRelativeResolve } = data;

  const projectPath = projectPaths[projectName];

  tmpCd(tmpRelativeResolve(), (): void => {
    if (/\.git$/.test(projectPath)) {
      const projectRepo = `https://github.com/visjs/${projectName}.git`;

      spawnThrow({
        cmd: [
          "git",
          "clone",
          projectRepo,
          "--single-branch",
          "--branch",
          "master",
          "--depth",
          "1",
        ],
        failCommand,
      });
    } else {
      copySync(projectPath, projectName, {
        filter(_src, dest): boolean {
          return (
            !/[\\\/].git[\\\/]/.test(dest) &&
            !/[\\\/]node_modules[\\\/]/.test(dest)
          );
        },
      });
    }
  });
}

function getPackageLocalDeps(data: TestData, projectName: string): string[] {
  const { projectPaths, tmpRelativeResolve } = data;
  return tmpCd(tmpRelativeResolve(projectName), (): string[] =>
    getCurrentPackageDeps().filter(
      (depName): boolean => projectPaths[depName] != null
    )
  );
}

function getPackageUnbuiltLocalDeps(
  data: TestData,
  projectName: string
): string[] {
  return getPackageLocalDeps(data, projectName).filter((depName): boolean => {
    return !existsSync(getTarballPath(data, depName));
  });
}

function checkPackageLocalDeps(data: TestData, projectName: string): boolean {
  return getPackageUnbuiltLocalDeps(data, projectName).length === 0;
}

function buildTestPack(data: TestData, projectName: string): void {
  const { failCommand, packageScripts, tmpRelativeResolve } = data;

  tmpCd(tmpRelativeResolve(projectName), (): void => {
    spawnThrow({
      cmd: ["npm", "ci"],
      failCommand,
    });

    spawnThrow({
      cmd: [
        "npm",
        "install",
        ...getPackageLocalDeps(data, projectName).map(
          getTarballPath.bind(null, data)
        ),
      ],
      failCommand,
    });

    for (const { packageName, scriptName, skipIfMissing } of packageScripts) {
      if (packageName != null && packageName !== projectName) {
        continue;
      } else if (skipIfMissing) {
        spawnThrow({
          cmd: ["npm", "run", scriptName, "--if-present"],
          failCommand,
        });
      } else {
        spawnThrow({ cmd: ["npm", "run", scriptName], failCommand });
      }
    }

    spawnThrow({ cmd: ["npm", "pack"], failCommand });

    copyTarball(data, projectName);
  });
}

function checkTmpPath(data: TestData): void {
  const tmpDir = data.tmpRelativeResolve(".");
  if (readdirSync(tmpDir).length !== 0) {
    throw new Error(`The tmp dir ("${tmpDir}") is not empty.`);
  }
}

export interface TestArgs {
  failCommand?: string;
  projectPaths: ProjectPaths;
  packageScripts: readonly PackageScript[];
  tmpPath?: string;
}
export function test({
  failCommand,
  packageScripts,
  projectPaths,
  tmpPath,
}: TestArgs): void {
  if (process.env.VIS_INTEROP === "1") {
    // This would result in infinite loop otherwise.
    logInfo("Skipping interop test.");
    return;
  }

  const data = Object.freeze<TestData>({
    failCommand,
    packageScripts,
    projectPaths,
    tmpDir: prepareTmpDir(tmpPath),
    tmpRelativeResolve: (...paths: string[]): string =>
      resolve(data.tmpDir.name, ...paths),
    visDevUtilsPath: process.cwd(),
  });

  checkTmpPath(data);

  for (const projectName of Object.keys(data.projectPaths)) {
    try {
      clone(data, projectName);
    } catch (error) {
      logError(`Cloning ${projectName} failed.`);
      throw error;
    }
  }

  const remainingProjects = new Set<string>(Object.keys(data.projectPaths));
  while (remainingProjects.size) {
    const projectName = [
      ...remainingProjects.values(),
    ].find((projectName): boolean => checkPackageLocalDeps(data, projectName));
    if (projectName != null) {
      try {
        logInfo(`Building ${projectName}…`);
        remainingProjects.delete(projectName);
        buildTestPack(data, projectName);
      } catch (error) {
        logError(`Building ${projectName} failed.`);
        throw error;
      }
    } else if (remainingProjects.size) {
      throw new Error(
        [
          "Can't start building the following projects due to unbuilt dependencies:",
          ...[...remainingProjects].map(
            (rp): string =>
              "  - " +
              rp +
              ": " +
              getPackageUnbuiltLocalDeps(data, rp).join(", ")
          ),
        ].join("\n")
      );
    }
  }
}
