import { SpawnSyncReturns, execSync, spawnSync } from "child_process";

export function logError(title: string, details?: string): void {
  const wrappedDetails = details ? `\n${details}\n` : "";
  console.error(`\n==> ${title}${wrappedDetails}\n`);
}
export function logInfo(title: string, details?: string): void {
  const wrappedDetails = details ? `:\n${details}\n` : "";
  console.info(`\n==> ${title}${wrappedDetails}\n`);
}

export interface SpawnOrTrhowArgs {
  cmd: readonly string[];
  failCommand?: string;
}
export function spawnThrow({
  cmd,
  failCommand,
}: SpawnOrTrhowArgs): SpawnSyncReturns<string> {
  logInfo("Running", cmd.map((word): string => JSON.stringify(word)).join(" "));

  const result = spawnSync(cmd[0], cmd.slice(1), {
    env: {
      ...process.env,
      VIS_INTEROP: "1",
    },
    encoding: "utf8",
    stdio: [0, 1, 2],
  });

  if (result.error) {
    throw result.error;
  } else if (result.status !== 0) {
    if (failCommand) {
      execSync(failCommand, {
        env: {
          ...process.env,
          VIS_INTEROP: "1",
        },
        encoding: "utf8",
        stdio: [0, 1, 2],
      });
    }

    throw new Error(
      `${cmd.map((word): string => `"${word}"`).join(" ")}: exited with ${
        result.status
      }.`
    );
  }

  return result;
}
