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
