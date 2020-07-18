import { BABEL_IGNORE_RE } from "../module";

// Skip CSS.
require.extensions[".css"] = () => {};

require("@babel/register")({
  extensions: [".ts", ".js"],
  // This will override `node_modules` ignoring. We use untranspiled versions of
  // our packages to cut down on bundle size (no duplicate polyfills etc.)
  // Therefore we have to exclude only
  ignore: [BABEL_IGNORE_RE],
});
