import babelPresetEnv from "@babel/preset-env";
import babelTransformRuntime from "@babel/plugin-transform-runtime";
import babelPresetTypescript from "@babel/preset-typescript";

/**
 * Provides shared configuration for Vis family of packages for Babel.
 * @param _context - The context provided by Babel, unused here.
 * @param [options] - The options object.
 * @param [options.ts] - Indicates if TypeScript is being used.
 * @returns Babel config.
 */
export default function (_context: unknown, { ts = false } = {}) {
  return {
    presets: [
      [
        babelPresetEnv,
        {
          targets: {
            // A browser is polyfilled if it is supported by it's maintainers
            // and if it is used by at least one in every thousand of users.
            browsers: "> 0.1% and not dead",
            // This forces Babel to polyfill ESM as if it was UMD. The reason
            // behind this is that that Babel doesn't include IE 11 polyfills
            // in ESM builds since IE 11 can't even load them. However many of
            // our users use bundlers to bundle ESM builds into IE 11
            // compatible UMD builds. Therefore even ESM builds need IE 11
            // polyfills.
            esmodules: false,
          },
          // This would pollute global scope. Babel's Transform Runtime plugin
          // is used instead.
          useBuiltIns: false,
        },
      ],
      ...(ts ? [babelPresetTypescript] : []),
    ],
    plugins: [
      [
        babelTransformRuntime,
        {
          // Force corejs 3. The default corejs 2 is deprecated and doesn't
          // contain some polyfills.
          corejs: 3,
        },
      ],
    ],
    env: {
      test: {
        presets: [
          [
            babelPresetEnv,
            {
              // Tests run in Node so there's no need to include any other
              // polyfills (we're testing our code, not the polyfills).
              targets: "maintained node versions",
            },
          ],
        ],
      },
      "test-cov": {
        presets: [
          [
            babelPresetEnv,
            {
              // dtto
              targets: "maintained node versions",
            },
          ],
        ],
        // This instruments the code to record coverage. It's more reliable if
        // done through Babel plugin.
        plugins: ["istanbul"],
      },
    },
  };
}
