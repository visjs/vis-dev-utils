import { execSync, spawn } from "child_process";
import { join } from "path";
import { createWriteStream } from "fs-extra";

export class ProjectState {
  /**
   * This will be resolved or rejected once all the tasks associated with this
   * project finish.
   */
  public promise: Promise<void>;
  /**
   * Run this to mark the project as successfully finished.
   */
  public resolve!: () => void;
  /**
   * Run this to mark the project as failed.
   */
  public reject!: (reason: Error) => void;
  /**
   * Provide information about current state of the project.
   */
  public stage: string = "pending";

  public constructor() {
    this.promise = new Promise<void>((resolve, reject): void => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export function logError(title: string, details?: string | Error): void {
  const wrappedDetails =
    details != null
      ? `\n${details instanceof Error ? details.message : details}`
      : "";
  process.stderr.write(`\n==> ${title}${wrappedDetails}\n`);
}
export function logInfo(title: string, details?: string): void {
  const wrappedDetails = details ? `:\n${details}` : "";
  process.stdout.write(`\n==> ${title}${wrappedDetails}\n`);
}

export function execFail(cwd: string, failCommand?: string): void {
  if (failCommand) {
    execSync(failCommand, {
      cwd,
      encoding: "utf8",
      env: { ...process.env, VIS_INTEROP: "1" },
      stdio: "inherit",
    });
  }
}

export type Spawn = (options: SpawnOrTrhowArgs) => Promise<void>;

export interface SpawnOrTrhowArgs {
  cmd: readonly string[];
  cwd: string;
  failCommand?: string;
}
export function createSpawner(logDir: string, getState: () => string[]): Spawn {
  let nextId = 1;

  return function spawnThrow({ cmd, cwd, failCommand }): ReturnType<Spawn> {
    const id = nextId++;
    const getHeaderLines = (): string[] => [
      "time: " + new Date().toISOString(),
      "id: " + id + " ",
      "cwd: " + cwd,
      "cmd: " + cmd.map((word): string => JSON.stringify(word)).join(" "),
      "states:",
      ...getState(),
    ];
    const getLogMessage = (): string =>
      getHeaderLines()
        .map((line): string => "  " + line)
        .join("\n");

    logInfo("Start", getLogMessage());

    return new Promise((resolve, reject): void => {
      let failed = false;

      const logStream = createWriteStream(
        join(logDir, ("" + id).padStart(3, "0") + ".log"),
        {
          flags: "a",
        }
      );

      logStream.write(getHeaderLines().join("\n") + "\n\n");

      const child = spawn(cmd[0], cmd.slice(1), {
        cwd,
        env: { ...process.env, VIS_INTEROP: "1" },
        stdio: "pipe",
      });

      child.stdout.pipe(logStream);
      child.stderr.pipe(logStream);

      child.on("close", (code): void => {
        if (failed || code !== 0) {
          logError("Fail", getLogMessage());

          execFail(cwd, failCommand);
          reject(
            new Error(
              `${cmd
                .map((word): string => `"${word}"`)
                .join(" ")}: exited with ${code}.`
            )
          );
        } else {
          logInfo("Okay", getLogMessage());
          resolve();
        }
      });
      child.on("error", (error): void => {
        logError("Fail", getLogMessage());
        failed = true;

        execFail(cwd, failCommand);
        reject(error);
      });
    });
  };
}
