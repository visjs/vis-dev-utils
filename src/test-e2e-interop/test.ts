import { DirResult, dirSync, setGracefulCleanup } from "tmp";
import { resolve as resolvePath } from "path";
import { findUp } from "find-up";
import {
  Stats,
  copy,
  copyFile,
  lstat,
  mkdir,
  mkdirp,
  readFile,
  readdir,
  writeFile,
  unlink,
} from "fs-extra";

import {
  ProjectState,
  Spawn,
  createSpawner,
  execFail,
  logError,
  logInfo,
} from "./util";

// Remove all temporary files on process exit.
setGracefulCleanup();

interface TestData {
  failCommand?: string;
  packageScripts: readonly PackageScript[];
  projectPaths: ProjectPaths;
  tmpDir: DirResult;
  tmpLogsResolve(...paths: string[]): string;
  tmpReposResolve(...paths: string[]): string;
  tmpRootResolve(...paths: string[]): string;
  visDevUtilsPath: string;
}

export interface PackageScript {
  packageName: string | null;
  scriptName: string;
  skipIfMissing: boolean;
}

export type ProjectPaths = Record<string, string>;

/**
 * @param tmpPath
 */
async function prepareTmpDir(tmpPath?: string): Promise<DirResult> {
  if (tmpPath) {
    await mkdirp(tmpPath);

    return {
      name: tmpPath,
      removeCallback: (): void => {},
    };
  } else {
    return dirSync({ unsafeCleanup: true });
  }
}

/**
 * @param projectName
 */
function getTarballName(projectName: string): string {
  return `${projectName}-0.0.0-no-version.tgz`;
}

/**
 * @param root0
 * @param root0.tmpRootResolve
 * @param projectName
 */
function getTarballPath(
  { tmpRootResolve }: TestData,
  projectName: string,
): string {
  return tmpRootResolve(`${projectName}.tgz`);
}

/**
 * @param data
 * @param projectName
 */
async function copyTarball(data: TestData, projectName: string): Promise<void> {
  await copyFile(
    data.tmpReposResolve(projectName, getTarballName(projectName)),
    getTarballPath(data, projectName),
  );
}

/**
 * @param cwd
 */
async function getPackageDeps(cwd: string): Promise<string[]> {
  const packageJSONPath = await findUp("package.json", { cwd });
  if (packageJSONPath == null) {
    throw new Error("Project's package.json file not found.");
  }
  const packageJSON = JSON.parse(await readFile(packageJSONPath, "utf8"));

  return [
    ...new Set([
      ...Object.keys(packageJSON.dependencies || {}),
      ...Object.keys(packageJSON.devDependencies || {}),
      ...Object.keys(packageJSON.peerDependencies || {}),
    ]),
  ];
}

/**
 * @param data
 * @param projectName
 */
async function getPackageLocalDeps(
  data: TestData,
  projectName: string,
): Promise<string[]> {
  const { projectPaths, tmpReposResolve } = data;
  const cwd = tmpReposResolve(projectName);
  return (await getPackageDeps(cwd)).filter(
    (depName): boolean => projectPaths[depName] != null,
  );
}

/**
 * @param spawn
 * @param data
 * @param projectName
 */
async function clone(
  spawn: Spawn,
  data: TestData,
  projectName: string,
): Promise<void> {
  const { failCommand, projectPaths, tmpReposResolve } = data;

  const cwd = tmpReposResolve();
  const projectPath = projectPaths[projectName];

  if (/\.git$/.test(projectPath)) {
    await spawn({
      cmd: [
        "git",
        "clone",
        projectPath,
        "--single-branch",
        "--branch",
        "master",
        "--depth",
        "1",
      ],
      cwd,
      failCommand,
    });
  } else {
    await copy(projectPath, tmpReposResolve(projectName), {
      filter(_src, dest): boolean {
        return (
          !/[\\/].git[\\/]/.test(dest) && !/[\\/]node_modules[\\/]/.test(dest)
        );
      },
    });
  }
}

/**
 * @param cwd
 * @param deps
 */
async function updatePackageDepVersions(
  cwd: string,
  deps: Record<string, string>,
): Promise<void> {
  const packageJSONPath = await findUp("package.json", { cwd });
  if (packageJSONPath == null) {
    throw new Error("Project's package.json file not found.");
  }
  const packageJSON = JSON.parse(await readFile(packageJSONPath, "utf8"));

  Object.keys(packageJSON.dependencies ?? {}).forEach((key): void => {
    if (Object.prototype.hasOwnProperty.call(deps, key)) {
      packageJSON.dependencies[key] = "file:" + deps[key];
    }
  });
  Object.keys(packageJSON.devDependencies ?? {}).forEach((key): void => {
    if (Object.prototype.hasOwnProperty.call(deps, key)) {
      packageJSON.devDependencies[key] = "file:" + deps[key];
    }
  });
  Object.keys(packageJSON.peerDependencies ?? {}).forEach((key): void => {
    if (Object.prototype.hasOwnProperty.call(deps, key)) {
      packageJSON.peerDependencies[key] = "file:" + deps[key];
    }
  });

  await writeFile(packageJSONPath, JSON.stringify(packageJSON, undefined, 4));
}

/**
 * @param spawn
 * @param data
 * @param projectName
 */
async function buildTestPack(
  spawn: Spawn,
  data: TestData,
  projectName: string,
): Promise<void> {
  const { failCommand, packageScripts, tmpReposResolve } = data;
  const cwd = tmpReposResolve(projectName);

  await updatePackageDepVersions(
    cwd,
    (await getPackageLocalDeps(data, projectName)).reduce<
      Record<string, string>
    >((acc, key): Record<string, string> => {
      acc[key] = getTarballPath(data, key);
      return acc;
    }, Object.create(null)),
  );
  const packageLockPath = await findUp("package-lock.json", { cwd });
  if (packageLockPath != null) {
    await unlink(packageLockPath);
  }
  await spawn({
    cmd: ["npm", "install"],
    cwd,
    failCommand,
  });

  for (const { packageName, scriptName, skipIfMissing } of packageScripts) {
    if (packageName != null && packageName !== projectName) {
      continue;
    } else if (skipIfMissing) {
      await spawn({
        cmd: ["npm", "run", scriptName, "--if-present"],
        cwd,
        failCommand,
      });
    } else {
      await spawn({
        cmd: ["npm", "run", scriptName],
        cwd,
        failCommand,
      });
    }
  }

  await spawn({ cmd: ["npm", "pack"], cwd, failCommand });

  await copyTarball(data, projectName);
}

/**
 * @param data
 */
async function checkTmpPath(data: TestData): Promise<void> {
  const tmpDir = data.tmpRootResolve();
  if ((await readdir(tmpDir)).length !== 0) {
    throw new Error(`The tmp dir ("${tmpDir}") is not empty.`);
  }
}

export interface TestArgs {
  failCommand?: string;
  logsToStdout?: boolean;
  packageScripts: readonly PackageScript[];
  projectPaths: ProjectPaths;
  tmpPath?: string;
}
/**
 * @param root0
 * @param root0.failCommand
 * @param root0.logsToStdout
 * @param root0.packageScripts
 * @param root0.projectPaths
 * @param root0.tmpPath
 */
export async function test({
  failCommand,
  logsToStdout,
  packageScripts,
  projectPaths,
  tmpPath,
}: TestArgs): Promise<boolean> {
  if (process.env.VIS_INTEROP === "1") {
    // This would result in infinite loop otherwise.
    logInfo("Skipping interop test.");
    return true;
  }

  const data = Object.freeze<TestData>({
    failCommand,
    packageScripts,
    projectPaths,
    tmpDir: await prepareTmpDir(
      tmpPath ? resolvePath(tmpPath, "repos") : undefined,
    ),
    tmpLogsResolve: (...paths: string[]): string =>
      resolvePath(data.tmpDir.name, "logs", ...paths),
    tmpReposResolve: (...paths: string[]): string =>
      resolvePath(data.tmpDir.name, "repos", ...paths),
    tmpRootResolve: (...paths: string[]): string =>
      resolvePath(data.tmpDir.name, ...paths),
    visDevUtilsPath: process.cwd(),
  });

  const projectStatuses = new Map<string, ProjectState>(
    Object.keys(data.projectPaths).map((project): [string, ProjectState] => [
      project,
      new ProjectState(),
    ]),
  );
  /**
   *
   */
  function getStages(): string[] {
    return [...projectStatuses].map(
      ([key, { stage }]): string => `  ${key}: ${stage}`,
    );
  }

  try {
    const spawn = createSpawner(data.tmpLogsResolve(), getStages);

    await checkTmpPath(data);

    // Prepare subdirectories under the root tmp directory.
    await Promise.all(
      ["repos", "logs"].map(
        (dir): Promise<void> => mkdir(resolvePath(data.tmpDir.name, dir)),
      ),
    );

    logInfo("Begin", getStages().join("\n"));
    await Promise.all(
      [...projectStatuses].map(async ([projectName, state]): Promise<void> => {
        try {
          state.stage = "preparing";
          const projectPath = data.projectPaths[projectName];
          const stats = await (async (): Promise<Stats | null> => {
            try {
              return await lstat(projectPath);
            } catch {
              return null;
            }
          })();
          if (stats?.isFile()) {
            // The path points to a ready to install tarball.
            state.stage = "copying tarball";
            await copyFile(projectPath, getTarballPath(data, projectName));
            state.stage = "tarball copied";
          } else {
            // The path points to a repo (maybe remote) that has to be built,
            // tested and packed first.
            state.stage = "cloning";
            await clone(spawn, data, projectName);

            state.stage = "gathering dependencies";
            const failedDeps: string[] = [];
            const localDeps = await getPackageLocalDeps(data, projectName);
            state.stage = `waiting for dependencies (${localDeps.join(", ")})`;
            for (const localDep of localDeps) {
              const depStatus = projectStatuses.get(localDep);
              if (depStatus == null) {
                throw new Error(`Dependency ${localDep} not found.`);
              }

              try {
                await depStatus.promise;
              } catch {
                failedDeps.push(localDep);
              }
            }
            if (failedDeps.length > 0) {
              state.stage = `dependencies failed: ${failedDeps.join(", ")}`;
              throw new Error(state.stage);
            }

            state.stage = "running CI tasks";
            await buildTestPack(spawn, data, projectName);
            state.stage = "cloned, built, tested and packed";
          }

          logInfo(`Okay ${projectName}`, getStages().join("\n"));
          state.resolve();
        } catch (error) {
          logError(
            `Fail ${projectName} (${state.stage}):`,
            getStages().join("\n"),
          );
          state.reject(error instanceof Error ? error : new Error("" + error));
        }
      }),
    );

    const allSucceeded = (
      await Promise.allSettled(
        [...projectStatuses.values()].map(
          (status): Promise<void> => status.promise,
        ),
      )
    ).every(({ status }): boolean => status === "fulfilled");

    if (allSucceeded) {
      return true;
    } else {
      return false;
    }
  } finally {
    // Wait for all the projects to finish and log the state summary and any
    // errors encountered.
    logInfo("End", getStages().join("\n"));
    for (const [projectName, { promise }] of projectStatuses) {
      try {
        await promise;
      } catch (error) {
        logError(`${projectName} failed with`, error);
      }
    }

    // Print the detailed logs for inspection (especially in CI).
    if (logsToStdout) {
      logInfo("Outputs");
      process.stdout.write(
        [
          "",
          ...(await Promise.all(
            (await readdir(data.tmpLogsResolve())).map(
              (filename): Promise<string> =>
                readFile(data.tmpLogsResolve(filename), "UTF-8"),
            ),
          )),
          "",
        ].join("\n\n" + ("-".repeat(80) + "\n").repeat(2) + "\n"),
      );
    }

    execFail(
      data.tmpDir.name,
      failCommand,
      "Allow the state to be inspected in debug mode before the data is lost.",
    );
  }
}
