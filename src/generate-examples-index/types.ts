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
  /** An absolute path that will be used during the script run. */
  local: string;
  /** A path that will be used in the browser. */
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
  /** The page HTML parsed by Cheerio. */
  $: CheerioStatic;
  /** How long to wait between loading the page and taking a screenshot. */
  delay: number;
  /** The raw HTML as a string. */
  html: string;
  /**
   * Raw path to the example, if you're not sure whether to use this you
   * probably should use `paths.page` instead.
   */
  path: string;
  /** Paths to various resources associated with this example. */
  paths: ExamplePaths;
  /** The processed data to replicate the example in a playground. */
  playground: PlaygroundData;
  /** Locates the element that should be captured on a screenshot. */
  selector: string;
  /**
   * A list of titles. The last is the title of the example, others are the
   * titles of the groups it belongs to.
   */
  titles: string[];
};
