import babel from "rollup-plugin-babel";
import builtins from "builtin-modules";
import commonjs from "rollup-plugin-commonjs";
import { generateHeader } from "./lib/header";
import nodeResolve from "rollup-plugin-node-resolve";
import packageJSON from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";

const bannerModule = generateHeader();
// Shebang is necessary to execute this as a command.
const bannerCommand = "#!/usr/bin/env node\n\n" + bannerModule;

// Dependencies will be installed by npm.
// Builtins are always available in Node.
const external = [
  ...new Set([
    ...Object.keys(packageJSON.dependencies),
    ...Object.keys(packageJSON.peerDependencies),
    ...builtins
  ])
];

const getPlugins = () => [
  nodeResolve({
    extensions: [".css", ".html", ".js", ".json", ".ts", ".txt"],
    preferBuiltins: true
  }),
  string({
    include: ["**/*.{css,html,txt}"]
  }),
  typescript({
    objectHashIgnoreUnknownHack: true,
    tsconfig: "tsconfig.json"
  }),
  commonjs(),
  babel({
    extensions: [".js", ".ts"],
    runtimeHelpers: true
  })
];

export default [
  // JavaScript module exports.
  {
    input: `src/module`,
    output: [
      {
        banner: bannerModule,
        file: `dist/vis-dev-utils.cjs.js`,
        format: "cjs",
        sourcemap: true
      },
      {
        banner: bannerModule,
        file: `dist/vis-dev-utils.esm.js`,
        format: "esm",
        sourcemap: true
      }
    ],
    external,
    plugins: getPlugins()
  },
  // Node commands.
  ...["generate-examples-index"].map(name => {
    return {
      input: `src/${name}`,
      output: {
        banner: bannerCommand,
        file: `bin/${name}.js`,
        format: "cjs",
        sourcemap: true
      },
      external,
      plugins: getPlugins()
    };
  })
];
