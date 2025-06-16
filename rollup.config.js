import packageJSON from "./package.json" with { type: "json" };
import analyzer from "rollup-plugin-analyzer";
import esbuild from "rollup-plugin-esbuild";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { nodeExternals } from "rollup-plugin-node-externals";
import nodeResolve from "@rollup/plugin-node-resolve";
import { generateHeader } from "./lib/header.js";
import { string } from "rollup-plugin-string";

const VIS_DEBUG = ["1", "true", "y", "yes"].includes(
  process.env["VIS_DEBUG"] || "false",
);

/**
 *
 */
export default async function () {
  const bannerModule = await generateHeader();
  // Shebang is necessary to execute this as a command.
  const bannerCommand = "#!/usr/bin/env node\n\n" + bannerModule;

  const getPlugins = () => [
    analyzer(VIS_DEBUG ? undefined : { summaryOnly: true }),
    nodeExternals({ deps: true }),
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
    esbuild({
      minify: false,
      target: "esnext",
      loaders: {
        ".json": "json",
      },
    }),
    commonjs(),
  ];

  return [
    // JavaScript module exports.
    {
      input: `src/module/index.ts`,
      output: [
        {
          banner: bannerModule,
          file: `dist/vis-dev-utils.cjs`,
          format: "cjs",
          sourcemap: true,
        },
        {
          banner: bannerModule,
          file: `dist/vis-dev-utils.mjs`,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: getPlugins(),
    },
    // File exports.
    ...["babel-register"].map((name) => {
      return {
        input: `src/${name}/index.ts`,
        output: [
          {
            banner: bannerCommand,
            file: `${name}/index.cjs`,
            format: "cjs",
            sourcemap: true,
          },
          {
            banner: bannerCommand,
            file: `${name}/index.mjs`,
            format: "esm",
            sourcemap: true,
          },
        ],
        plugins: getPlugins(),
      };
    }),
    // Node commands.
    ...Object.keys(packageJSON.bin).map((name) => {
      return {
        input: `src/${name}/index.ts`,
        output: [
          {
            banner: bannerCommand,
            file: `bin/${name}.cjs`,
            format: "cjs",
            sourcemap: true,
          },
          {
            banner: bannerCommand,
            file: `bin/${name}.mjs`,
            format: "esm",
            sourcemap: true,
          },
        ],
        plugins: getPlugins(),
      };
    }),
  ];
}
