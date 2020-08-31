import { Example, Examples, ExamplesRoot } from "../types";

export interface ContentPart {
  content: string;
  filename: string;
  title: string;
}

export interface Renderer {
  render(
    examples: ExamplesRoot,
    output: string,
    title: string,
    collator: Intl.Collator
  ): ContentPart[];
  screenshot: {
    width: number;
    height: number;
  };
}

export function isExample(
  value: Example | Examples | ExamplesRoot
): value is Example {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.path === "string"
  );
}

export interface StartStopMs {
  start: number;
  stop: number;
}
export function measureStartStopMs(): () => StartStopMs {
  const start = Date.now();
  return (): StartStopMs => {
    const stop = Date.now();

    return { start, stop };
  };
}

export interface Report {
  count: number;
  result: "fulfilled" | "rejected";
  start: number;
  stop: number;
}
export function reduceReports(
  reports: readonly Report[],
  fallback: Report = {
    count: 0,
    result: "fulfilled",
    start: -1,
    stop: -1,
  }
): Report {
  return (
    reports.reduce<Report | null>((acc, val): Report | null => {
      return {
        count: (acc?.count ?? 0) + (val?.count ?? 0),
        result: [acc?.result ?? "fulfilled", val.result].every(
          (result): boolean => result === "fulfilled"
        )
          ? "fulfilled"
          : "rejected",
        start: Math.min(acc?.start ?? Number.POSITIVE_INFINITY, val.start),
        stop: Math.max(acc?.stop ?? Number.NEGATIVE_INFINITY, val.stop),
      };
    }, null) ?? fallback
  );
}

export function formatMs(ms: number): string {
  return `${(Math.round(ms / 100) / 10).toFixed(1)}s`;
}
export function formatStartStopMs({ start, stop }: StartStopMs): string {
  return `${(Math.round((stop - start) / 100) / 10).toFixed(1)}s`;
}
