import packageJSON from "./package.json";
import analyzer from "rollup-plugin-analyzer";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import externals from "rollup-plugin-node-externals";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { generateHeader } from "./lib/header";
import { string } from "rollup-plugin-string";

const VIS_DEBUG = ["1", "true", "y", "yes"].includes(
  process.env["VIS_DEBUG"] ?? "false"
);

const bannerModule = generateHeader();
// Shebang is necessary to execute this as a command.
const bannerCommand = "#!/usr/bin/env node\n\n" + bannerModule;

const getPlugins = () => [
  analyzer(VIS_DEBUG ? undefined : { summaryOnly: true }),
  externals({ deps: true }),
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
      plugins: getPlugins(),
    };
  }),
  // Node commands.
  ...Object.keys(packageJSON.bin).map((name) => {
    return {
      input: `src/${name}`,
      output: {
        banner: bannerCommand,
        file: `bin/${name}.js`,
        format: "cjs",
        sourcemap: true,
      },
      plugins: getPlugins(),
    };
  }),
];
