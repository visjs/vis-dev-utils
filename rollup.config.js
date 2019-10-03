import babel from "rollup-plugin-babel";
import builtins from "builtin-modules";
import commonjs from "rollup-plugin-commonjs";
import genHeader from "./lib/header";
import nodeResolve from "rollup-plugin-node-resolve";
import packageJSON from "./package.json";
import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";

// Shebang is necessary to execute this as a command.
const banner = "#!/usr/bin/env node\n\n" + genHeader("network");

// Dependencies will be installed by npm.
// Builtins are always available in Node.
const external = [...Object.keys(packageJSON.dependencies), ...builtins];

export default ["generate-examples-index"].map(name => {
  return {
    input: `./src/${name}`,
    output: {
      banner,
      file: `./bin/${name}.js`,
      format: "cjs",
      sourcemap: true
    },
    external,
    plugins: [
      nodeResolve({
        extensions: [".ts", ".js", ".json", ".css", ".html"],
        preferBuiltins: true
      }),
      string({
        include: ["**/*.{css,html}"]
      }),
      typescript({
        objectHashIgnoreUnknownHack: true,
        tsconfig: "tsconfig.json"
      }),
      commonjs(),
      babel({
        extensions: [".js", ".ts"]
      })
    ]
  };
});
