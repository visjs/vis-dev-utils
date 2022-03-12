import { execSync, spawn } from "child_process";
import { basename, join } from "path";
import { createWriteStream, readFile, rename } from "fs-extra";

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
  public stage = "pending";

  public constructor() {
    this.promise = new Promise<void>((resolve, reject): void => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

/**
 * @param title
 * @param details
 */
export function logError(title: string, details?: string | Error): void {
  const wrappedDetails =
    details != null
      ? `\n${details instanceof Error ? details.message : details}`
      : "";
  process.stderr.write(`\n==> ${title}${wrappedDetails}\n`);
}
/**
 * @param title
 * @param details
 */
export function logInfo(title: string, details?: string): void {
  const wrappedDetails = details ? `:\n${details}` : "";
  process.stdout.write(`\n==> ${title}${wrappedDetails}\n`);
}

/**
 * @param cwd
 * @param failCommand
 * @param error
 */
export function execFail(
  cwd: string,
  failCommand: string | null | undefined,
  error: Error | string
): void {
  if (failCommand) {
    console.error("\n\nReason for debugging:");
    console.error(error);
    console.error("\n\nDebuging:");
    try {
      execSync(failCommand, {
        cwd,
        encoding: "utf8",
        env: { ...process.env, VIS_INTEROP: "1" },
        stdio: "inherit",
      });
    } catch (error) {
      console.error(error);
      console.error(
        "The error above is the fail command exitting with non-zero status, not an actual failure in the interop test."
      );
    }
  }
}

export type Spawn = (options: SpawnOrTrhowArgs) => Promise<void>;

export interface SpawnOrTrhowArgs {
  cmd: readonly string[];
  cwd: string;
  failCommand?: string;
}
/**
 * @param logDir
 * @param getState
 */
export function createSpawner(logDir: string, getState: () => string[]): Spawn {
  let nextId = 1;

  return function spawnThrow({ cmd, cwd, failCommand }): ReturnType<Spawn> {
    const id = nextId++;
    const getHeaderLines = (): string[] => [
      "time: " + new Date().toISOString(),
      "id: " + id,
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
      const commandLogPath = join(
        logDir,
        [
          basename(cwd).replace(/[^a-zA-Z0-9]+/g, "-"),
          cmd.join("-").replace(/[^a-zA-Z0-9]+/g, "-"),
          "id-" + ("" + id).padStart(3, "0"),
          "log",
        ].join(".")
      );
      const logStream = createWriteStream(commandLogPath, {
        flags: "a",
      });

      logStream.write(getHeaderLines().join("\n") + "\n\n");

      const child = spawn(cmd[0], cmd.slice(1), {
        cwd,
        env: { ...process.env, VIS_INTEROP: "1" },
        stdio: "pipe",
      });

      child.stdout.pipe(logStream);
      child.stderr.pipe(logStream);

      /**
       * Add status to the file name just before the .log extension on a best
       * effort basis (no errors reported)..
       *
       * @param code - The code or other kind of status to append.
       */
      function addStatusCodeToFilename(code: string | number): void {
        const newPath =
          commandLogPath.slice(0, -4) + ".status-" + code + ".log";
        rename(commandLogPath, newPath).catch((error): void => {
          console.error(`Failed to rename log file to ${newPath}.`, error);
        });
      }

      let failed = false;
      child.on("close", (code): void => {
        if (failed) {
          // noop
        } else if (code !== 0) {
          logError("Fail", getLogMessage());

          const errorMessage = `${cmd
            .map((word): string => `"${word}"`)
            .join(" ")}: exited with ${code}.`;

          logStream.end((): void => {
            (async (): Promise<void> => {
              let commandOutput = "";
              try {
                commandOutput += await readFile(commandLogPath, "utf-8");
              } catch (error) {
                commandOutput += "Failed to log command output.";
              }
              execFail(cwd, failCommand, commandOutput + "\n\n" + errorMessage);
            })();
          });

          addStatusCodeToFilename(code ?? "null");
          reject(new Error(errorMessage));
        } else {
          logInfo("Okay", getLogMessage());
          addStatusCodeToFilename(code);
          resolve();
        }
      });
      child.on("error", (error): void => {
        failed = true;

        logError("Fail", getLogMessage());

        execFail(cwd, failCommand, error);

        addStatusCodeToFilename("error");
        reject(error);
      });
    });
  };
}
