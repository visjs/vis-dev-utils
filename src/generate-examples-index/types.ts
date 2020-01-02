export interface PlaygroundData {
  code: {
    css: string;
    html: string;
    js: string;
  };
  resources: {
    css: string[];
    js: string[];
  };
}

export interface ExamplePath {
  local: string;
  web: string;
}
export interface ExamplePaths {
  codepen: ExamplePath;
  jsfiddle: ExamplePath;
  page: ExamplePath;
  screenshot: ExamplePath;
}

export type ExamplesRoot = {
  [Key: string]: Examples;
};
export type Examples = {
  [Key: string]: Examples | Example;
};
export type Example = {
  $: CheerioStatic;
  delay: number;
  html: string;
  path: string;
  paths: ExamplePaths;
  playground: PlaygroundData;
  selector: string;
  titles: string[];
};
