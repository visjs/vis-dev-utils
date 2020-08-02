import babel from "rollup-plugin-babel";
import builtins from "builtin-modules";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import packageJSON from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { generateHeader } from "./lib/header";
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
    ...builtins,
  ]),
];

const getPlugins = () => [
  copy({
    targets: [
      {
        src: "public/*",
        dest: "dist",
      },
    ],
  }),
  nodeResolve({
    extensions: [".css", ".html", ".js", ".json", ".ts", ".txt"],
    preferBuiltins: true,
  }),
  string({
    include: ["**/*.{css,html,txt}"],
  }),
  json(),
  typescript({
    tsconfig: "tsconfig.json",
  }),
  commonjs(),
  babel({
    babelrc: false,
    extensions: [".js", ".ts"],
    runtimeHelpers: true,
  }),
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
        sourcemap: true,
      },
      {
        banner: bannerModule,
        file: `dist/vis-dev-utils.esm.js`,
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: getPlugins(),
  },
  // File exports.
  ...["babel-register"].map((name) => {
    return {
      input: `src/${name}`,
      output: {
        banner: bannerCommand,
        file: `${name}/index.js`,
        format: "cjs",
        sourcemap: true,
      },
      external,
      plugins: getPlugins(),
    };
  }),
  // Node commands.
  ...["generate-examples-index", "test-e2e-interop"].map((name) => {
    return {
      input: `src/${name}`,
      output: {
        banner: bannerCommand,
        file: `bin/${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      external,
      plugins: getPlugins(),
    };
  }),
];
