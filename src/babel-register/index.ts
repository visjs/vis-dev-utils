import { BABEL_IGNORE_RE } from "../module";

/* eslint-disable @typescript-eslint/no-var-requires -- The following code would be messed up by transpilation from ESM. */

require("@babel/register")({
  extensions: [".ts", ".js"],
  // This will override `node_modules` ignoring. We use untranspiled versions of
  // our packages to cut down on bundle size (no duplicate polyfills etc.)
  // Therefore we have to exclude only
  ignore: [BABEL_IGNORE_RE],
});

/* eslint-enable @typescript-eslint/no-var-requires */
