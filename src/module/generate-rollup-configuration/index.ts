import fs from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
import { type RollupOptions, type Plugin } from "rollup";
import analyzerPlugin from "rollup-plugin-analyzer";
import babelPlugin from "@rollup/plugin-babel";
import commonjsPlugin from "@rollup/plugin-commonjs";
import copyPlugin, { Target as CopyTarget } from "rollup-plugin-copy";
import jsonPlugin from "@rollup/plugin-json";
import nodeResolvePlugin from "@rollup/plugin-node-resolve";
import postcssAssetsPlugin from "postcss-assets";
import postcssPlugin from "rollup-plugin-postcss";
import stripCodePlugin from "rollup-plugin-strip-code";
import terserPlugin from "@rollup/plugin-terser";
import typescriptPlugin from "@rollup/plugin-typescript";
import { generateHeader } from "../header";
import { join, resolve, sep } from "path";
import { string as stringPlugin } from "rollup-plugin-string";
import {
  config as chaiConfig,
  expect as validateExpect,
  use as chaiUse,
} from "chai";

import { BABEL_IGNORE_RE } from "../constants";
import { type HeaderOptions } from "../header";
import { type OptionalOptions } from "../util";
import { dirname } from "node:path";

const rawGlobby = import("globby");

chaiConfig.truncateThreshold = Number.MAX_SAFE_INTEGER;

const VIS_DEBUG = ["1", "true", "y", "yes"].includes(
  process.env["VIS_DEBUG"] || "false",
);
const VIS_TEST = ["1", "true", "y", "yes"].includes(
  process.env["VIS_TEST"] || "false",
);

/**
 * Simple glob with workaround for non-posix paths.
 * @param pattern - Single glob pattern.
 * @returns Globbed paths.
 */
async function glob(
  pattern: string,
): ReturnType<(typeof import("globby"))["globby"]> {
  return (await rawGlobby).globby(
    sep === "\\" ? pattern.replace(/\\/g, "/") : pattern,
  );
}

export interface GRCOptions {
  /**
   * Where to look for files when inlining assets into CSS.
   */
  assets: string;
  /**
   * Additional files to be copied.
   */
  copyTargets: {
    /**
     * These will be copied relative to the root of each bundle (esnext,
     * standalone…).
     */
    bundle: CopyTarget[];
    /**
     * These will be copied relative to the root of each variant of each bundle
     * (esnext/esm, esnext/umd, standalone/esm…).
     */
    variant: CopyTarget[];
  };
  /**
   * The base dir with entry points for various builds. The extensions
   * determines whether TypeScript processing will be used.
   */
  entryPoints: string;
  /**
   * These are the dependencies that would cause interoperability issues if they
   * were bundled. A notable example here is vis-data.
   */
  externalForPeerBuild: string[];
  /**
   * Passed straight to Rollup.
   */
  globals: Record<string, string>;
  /**
   * Options for {@link generateHeader}.
   */
  header: Partial<HeaderOptions>;
  /**
   * This will be used as a file name with appropriate extensions appended
   * (like .js, .min.js or .css).
   */
  libraryFilename: string;
  /**
   * Simply required package.json.
   */
  packageJSON: Partial<{
    browser: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    exports: Record<string, Record<string, string | undefined> | undefined>;
    files: string[];
    jsnext: string;
    main: string;
    module: string;
    peerDependencies: Record<string, string>;
    types: string;
  }>;
  /**
   * The path to tsconfig.json to be used in this build.
   */
  tsconfig: string;
}

/**
 * These are the dependencies that follow standalone/peer/ESNext export
 * structure.
 */
const dependenciesWithVisExportStructure = [
  "vis-data",
  "vis-graph3d",
  "vis-network",
  "vis-timeline",
  "vis-util",
  "vis-uuid",
];

/**
 * This ensures that dependencies on Vis projects point to ESNext builds.
 * @param deps - The original dependencies as listed in package.json.
 * @returns An array of dependencies for Rollup.
 */
function processDependencies(
  deps: string[] | Record<string, string>,
): string[] {
  const depNames = Array.isArray(deps) ? deps : Object.keys(deps);

  return depNames.flatMap((key): string[] =>
    dependenciesWithVisExportStructure.includes(key)
      ? [key + "/esnext"]
      : [key],
  );
}

/**
 * This ensures that all Vis projects are imported using ESNext builds.
 * Importing standalone versions will not only cause problems in production but
 * will log warnings during build process and won't work at all.
 * @param globals - The original globals.
 * @returns Globals forcing the use of ESNext builds for Vis projects.
 */
function processGlobals(
  globals: Record<string, string>,
): Record<string, string> {
  return Object.entries(globals).reduce<Record<string, string>>(
    (acc, [key, value]): Record<string, string> => {
      acc[
        dependenciesWithVisExportStructure.includes(key) ? key + "/esnext" : key
      ] = value;

      return acc;
    },
    Object.create(null),
  );
}

/**
 * @param path
 */
function isTS(path: string): boolean {
  return path.endsWith(".ts");
}

/*
 * Make sure that Chai doesn't throw and therefore stop execution on failed
 * validations during debugging.
 */
const validate: (
  callback: (expect: Chai.ExpectStatic) => Promise<void> | void,
) => Promise<void> = VIS_DEBUG
  ? async (
      callback: (expect: Chai.ExpectStatic) => Promise<void> | void,
    ): Promise<void> => {
      try {
        await callback(validateExpect);
      } catch (error) {
        console.error(error);
      }
    }
  : async (
      callback: (expect: Chai.ExpectStatic) => Promise<void> | void,
    ): Promise<void> => {
      await callback(validateExpect);
    };

/**
 * Transform ESNext import paths to match the build version being constructed.
 * @param buildVariant - ESNext or peer build. This is not available for
 * standalone as only peer and ESNext have imports.
 * @param moduleFormat - What kind of module system to use.
 * @returns Path overrides for Rollup.
 */
function getPaths(
  buildVariant: "esnext" | "peer",
  moduleFormat: "esm" | "umd",
): Record<string, string> {
  /**
   * @param lib
   */
  function getPath(
    lib:
      | "charts"
      | "data"
      | "graph3d"
      | "network"
      | "timeline"
      | "util"
      | "uuid",
  ): Record<string, string> {
    return {
      [`vis-${lib}/esnext`]: `vis-${lib}/${buildVariant}/${moduleFormat}/vis-${lib}.js`,
    };
  }

  return {
    ...getPath("charts"),
    ...getPath("data"),
    ...getPath("graph3d"),
    ...getPath("network"),
    ...getPath("timeline"),
    ...getPath("util"),
    ...getPath("uuid"),
  };
}

/**
 * Change target's dest so that it's relative to given dir(s).
 * @param dirs - The directories there targets should be relative to.
 * @returns A function that can be directly supplied to Array.map().
 */
function scopeCopyTarget(
  ...dirs: readonly string[]
): (target: CopyTarget) => CopyTarget {
  return function (target): CopyTarget {
    const dest = (
      Array.isArray(target.dest) ? target.dest : [target.dest]
    ) as readonly string[];

    const bundleDest = dest.flatMap((path): string[] =>
      dirs.map((dir): string => join(dir, path)),
    );

    return {
      ...target,
      dest: bundleDest,
    };
  };
}

const injectCSS = true;
const minimize = true;
const transpile = true;
const generateRollupPluginArray = (
  libraryFilename: string,
  assets: string,
  copyTargetsBundle: readonly CopyTarget[],
  copyTargetsVariant: readonly CopyTarget[],
  tsconfig: string,
  mode: "production" | "development" | "test",
  bundleType: "esnext" | "standalone" | "peer",
  {
    injectCSS = false,
    minimize = false,
    strip = mode === "production",
    transpile = false,
    typescript = false,
  } = {},
): Plugin[] => {
  const fullLibraryFilename = `${libraryFilename}${minimize ? ".min" : ""}`;

  const bundleDir = bundleType;
  const bundleVariantDirs = ["esm", "umd"].map((variant): string =>
    join(bundleDir, variant),
  );

  return [
    ...(strip
      ? [
          // This should be first because it removes code from source files.
          // It's much easier to follow if the removal happens before any
          // transformations.
          stripCodePlugin({
            start_comment: "develblock:start",
            end_comment: "develblock:end",
          }),
        ]
      : [
          // Remove the comments marking devel blocks as they can cause problems
          // later on because transpilation shuffles things around which may
          // lead to all kinds of issues including syntax errors.
          stripCodePlugin({
            pattern: /[\t ]*\/\* ?develblock:(start|end) ?\*\//g,
          }),
        ]),
    analyzerPlugin(VIS_DEBUG ? undefined : { limit: 10, summaryOnly: true }),
    copyPlugin({
      verbose: VIS_DEBUG,
      targets: [
        // JavaScript
        {
          src: resolve(
            dirname(fileURLToPath(new URL(import.meta.url))),
            "assets/bundle-root.js",
          ),
          dest: bundleDir,
          rename: "index.js",
        },
        {
          src: resolve(
            dirname(fileURLToPath(new URL(import.meta.url))),
            "assets/bundle-index.js",
          ),
          dest: bundleVariantDirs,
          rename: "index.js",
          transform: (content: Buffer): string =>
            content.toString().replace("{{filename}}", libraryFilename),
        },

        // TypeScript
        {
          src: resolve(
            dirname(fileURLToPath(new URL(import.meta.url))),
            "assets/bundle-root.d.ts",
          ),
          dest: bundleDir,
          rename: "index.d.ts",
        },
        {
          src: resolve(
            dirname(fileURLToPath(new URL(import.meta.url))),
            "assets/bundle-index.d.ts",
          ),
          dest: bundleVariantDirs,
          rename: "index.d.ts",
          transform: (content: Buffer): string =>
            content.toString().replace("{{filename}}", libraryFilename),
        },
        {
          src: resolve(
            dirname(fileURLToPath(new URL(import.meta.url))),
            "assets/bundle-file.d.ts",
          ),
          dest: bundleVariantDirs,
          rename: `${fullLibraryFilename}.d.ts`,
          transform: (content: Buffer): string =>
            content.toString().replace("{{bundle-type}}", bundleType),
        },

        // Custom
        ...copyTargetsBundle.map(scopeCopyTarget(bundleDir)),
        ...copyTargetsVariant.map(scopeCopyTarget(...bundleVariantDirs)),
      ],
    }),
    nodeResolvePlugin({
      browser: true,
      extensions: [".js", ".json", ".ts"],
      mainFields: ["jsnext", "module", "main"],
      preferBuiltins: false,
    }),
    ...(typescript
      ? [
          typescriptPlugin({
            tsconfig,
          }),
        ]
      : []),
    commonjsPlugin(),
    postcssPlugin({
      extract: !injectCSS && `styles/${fullLibraryFilename}.css`,
      inject: injectCSS,
      minimize,
      // Prevent the sourcemaps from being injected into JS files.
      sourceMap: !injectCSS,
      plugins: [
        postcssAssetsPlugin({
          loadPaths: [assets],
        }),
      ],
    }),
    jsonPlugin(),
    stringPlugin({
      include: "**/*.txt",
    }),
    ...(transpile
      ? [
          babelPlugin({
            babelHelpers: "runtime",
            babelrc: false,
            configFile: false,
            exclude: BABEL_IGNORE_RE,
            extensions: [".js", ".ts", ".mjs", ".cjs"],
            presets: [["vis-dev-utils/babel-preset", { ts: true }]],
          }),
        ]
      : []),
    ...(minimize
      ? [
          terserPlugin({
            format: {
              comments: "some",
            },
          }),
        ]
      : []),
  ];
};

/**
 * Prepare ready to use Rollup configuration file.
 * @remarks
 * IMPORTANT: Use `babel.config.js` in the root of the project, `.babelrc` files
 * are ignored.
 *
 * You can surround any piece of code with `stripInProduction: { debug code }`
 * to strip it from the generated bundles unless VIS_DEBUG=true environmental
 * variable is set. This is useful for example to render bounding boxes during
 * debugging but automatically switch it off without any performance or bundle
 * size penalty in production. Debugger statements are also automatically
 * stripped.
 *
 * Plugins:
 * - `\@rollup/plugin-babel` (skipped in ESNext)
 * - `\@rollup/plugin-commonjs`
 * - `\@rollup/plugin-json`
 * - `\@rollup/plugin-node-resolve`
 * - `\@rollup/plugin-strip` (skipped with VIS_DEBUG=true env var)
 * - `\@rollup/plugin-terser` (only in minified)
 * - `postcss-assets`
 * - `rollup-plugin-copy`
 * - `rollup-plugin-postcss`
 * - `rollup-plugin-typescript2` (skipped if the entry is .js)
 * @param options - See {@link GRCOptions}.
 * @param mode - Whether the code should be processed for production,
 * development or testing.
 * @returns Ready to use configuration object that can be just exported from
 * `rollup.config.js` or mutated in any way if necessary.
 */
export async function generateRollupConfiguration(
  options: OptionalOptions<GRCOptions>,
  mode: "production" | "development" | "test" = VIS_TEST
    ? "test"
    : VIS_DEBUG
      ? "development"
      : "production",
): Promise<RollupOptions[]> {
  const {
    assets = ".",
    copyTargets: {
      bundle: copyTargetsBundle = [],
      variant: copyTargetsVariant = [],
    } = {} as GRCOptions["copyTargets"],
    externalForPeerBuild = [],
    globals = {},
    header = { name: "Unknown Library" },
    libraryFilename = "unknown-library",
    packageJSON: {
      dependencies = {},
      devDependencies = {},
      peerDependencies = {},
      ...packageJSONRest
    } = {} as GRCOptions["packageJSON"],
    entryPoints: entryPoint = "./src",
    tsconfig = "tsconfig.json",
  }: GRCOptions = (options || {}) as GRCOptions;

  validate((expect): void => {
    // Note: Every array is a superset of empty array.
    if (Object.keys(peerDependencies).length > 0) {
      expect(
        Object.keys(dependencies),
        "The dependencies and peer dependencies have to be disjoint sets",
      )
        .to.be.an("array")
        .that.does.not.include.any.members(Object.keys(peerDependencies));
    }
  });
  validate((expect): void => {
    expect(
      Object.keys(devDependencies),
      "For convenience all peer dependencies also have to be dev dependencies",
    )
      .to.be.an("array")
      .that.includes.all.members(Object.keys(peerDependencies));
  });
  validate((expect): void => {
    expect(
      Object.keys(peerDependencies),
      "Peer build externals have to be a subset of peer dependencies",
    )
      .to.be.an("array")
      .that.includes.all.members(externalForPeerBuild);
  });
  validate((expect): void => {
    expect(
      [...Object.keys(dependencies), ...Object.keys(peerDependencies)].sort(),
      "Globals have to be provided for all runtime and peer dependencies but nothing else",
    )
      .to.be.an("array")
      .that.deep.equals(Object.keys(globals).sort());
  });

  validate(async (expect): Promise<void> => {
    expect(resolve(assets), "Assets have to be a directory").to.be.a("string");
    const stats = await fs.stat(resolve(assets));
    expect(stats.isDirectory(), "Assets have to be a directory").to.be.true;
  });
  validate(async (expect): Promise<void> => {
    expect(entryPoint, "The entry point has to be directory").to.be.a("string");
    const stats = await fs.stat(entryPoint);
    expect(stats.isDirectory(), "The entry point has to be directory").to.be
      .true;
  });
  const [esnextEntry, peerEntry, standaloneEntry] = await Promise.all(
    ["ESNext", "peer", "standalone"].map(async (name): Promise<string> => {
      const filenameGlob = `entry-${name.toLowerCase()}.{js,ts}`;
      const files = await glob(resolve(entryPoint, filenameGlob));

      validate(async (expect): Promise<void> => {
        expect(
          files,
          `There has to be a single entry file (${filenameGlob}) for the ${name} build`,
        )
          .to.have.lengthOf(1)
          .and.to.have.ownProperty("0");
        const stats = await fs.stat(resolve(files[0]));
        expect(
          stats.isFile(),
          `The entry file (${filenameGlob}) for the ${name} build has to be a file`,
        ).to.be.true;
      });

      return files[0];
    }),
  );
  validate(async (expect): Promise<void> => {
    expect(
      resolve("./declarations"),
      "There has to be a directory with TypeScript declarations",
    ).to.be.a("string");
    const stats = await fs.stat(resolve("./declarations"));
    expect(
      stats.isDirectory(),
      "There has to be a directory with TypeScript declarations",
    ).to.be.true;
  });

  validate((expect): void => {
    expect(
      packageJSONRest,
      "The directories with built files have to be included in the package",
    )
      .to.have.ownProperty("files")
      .that.is.an("array")
      .and.includes.all.members([
        "declarations",
        "esnext",
        "peer",
        "standalone",
      ]);
  });

  const expectedExports = Object.fromEntries([
    [
      ".",
      {
        import: `./peer/esm/${libraryFilename}.mjs`,
        require: `./peer/umd/${libraryFilename}.cjs`,
        types: "./declarations/index.d.ts",
      },
    ],
    ["./package.json", "./package.json"],
    [
      "./declarations/index.d.ts",
      {
        types: "./declarations/index.d.ts",
      },
    ],
    ...["standalone", "peer", "esnext"].flatMap(
      (variant): [string, Record<string, string>][] => [
        [
          `./${variant}`,
          {
            import: `./${variant}/esm/${libraryFilename}.mjs`,
            require: `./${variant}/umd/${libraryFilename}.cjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/esm/${libraryFilename}.js`,
          {
            import: `./${variant}/esm/${libraryFilename}.mjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/esm/${libraryFilename}.mjs`,
          {
            import: `./${variant}/esm/${libraryFilename}.mjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/esm/${libraryFilename}.min.js`,
          {
            import: `./${variant}/esm/${libraryFilename}.min.mjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/esm/${libraryFilename}.min.mjs`,
          {
            import: `./${variant}/esm/${libraryFilename}.min.mjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/umd/${libraryFilename}.js`,
          {
            require: `./${variant}/umd/${libraryFilename}.cjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/umd/${libraryFilename}.cjs`,
          {
            require: `./${variant}/umd/${libraryFilename}.cjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/umd/${libraryFilename}.min.js`,
          {
            require: `./${variant}/umd/${libraryFilename}.min.cjs`,
            types: "./declarations/index.d.ts",
          },
        ],
        [
          `./${variant}/umd/${libraryFilename}.min.cjs`,
          {
            require: `./${variant}/umd/${libraryFilename}.min.cjs`,
            types: "./declarations/index.d.ts",
          },
        ],
      ],
    ),
  ]);

  validate((expect): void => {
    expect(
      packageJSONRest,
      "Package JSON's type property has to point to the declarations",
    )
      .to.have.ownProperty("types")
      .that.is.a("string")
      .and.equals("./declarations/index.d.ts")
      .and.is.oneOf(Object.keys(expectedExports));
  });
  validate((expect): void => {
    expect(
      packageJSONRest,
      "Package JSON's browser property has to point to the minifed UMD build",
    )
      .to.have.ownProperty("browser")
      .that.is.a("string")
      .and.equals(`./peer/umd/${libraryFilename}.min.cjs`)
      .and.is.oneOf(Object.keys(expectedExports));
  });
  validate((expect): void => {
    expect(
      packageJSONRest,
      "Package JSON's main property has to point to the UMD build",
    )
      .to.have.ownProperty("main")
      .that.is.a("string")
      .and.equals(`./peer/umd/${libraryFilename}.cjs`)
      .and.is.oneOf(Object.keys(expectedExports));
  });
  validate((expect): void => {
    expect(
      packageJSONRest,
      "Package JSON's modul property has to point to the ESM build",
    )
      .to.have.ownProperty("module")
      .that.is.a("string")
      .and.equals(`./peer/esm/${libraryFilename}.mjs`)
      .and.is.oneOf(Object.keys(expectedExports));
  });
  validate((expect): void => {
    expect(
      packageJSONRest,
      "Package JSON's jsnext has to point to the ESNext build",
    )
      .to.have.ownProperty("jsnext")
      .that.is.a("string")
      .and.equals(`./esnext/esm/${libraryFilename}.mjs`)
      .and.is.oneOf(Object.keys(expectedExports));
  });

  validate((expect): void => {
    expect(
      Object.fromEntries(
        Object.entries(packageJSONRest.exports ?? {}).filter(([key]): boolean =>
          Object.keys(expectedExports).includes(key),
        ),
      ),
      "Package JSON's exports have to contain common entries",
    ).to.deep.equal(expectedExports);
  });

  validate(async (expect): Promise<void> => {
    const [{ status }] = await Promise.allSettled([
      fs.access(resolve("./.babelrc")),
    ]);
    expect(
      status,
      "Babelrc is ignored. Use babel.config.js config file instead.",
    ).to.equal("rejected");
  });
  validate(async (expect): Promise<void> => {
    const [{ status }] = await Promise.allSettled([
      fs.access(resolve("./babel.config.js")),
    ]);
    expect(status, "There has to be a babel.config.js config file.").to.equal(
      "fulfilled",
    );
  });

  const banner = await generateHeader(header);
  const external = {
    // No dependencies are bundled.
    esnext: processDependencies([
      ...Object.keys(dependencies),
      ...Object.keys(peerDependencies),

      // This will show a warning if any of them is used. The idea behind
      // it is that if someone accidentaly imports a dev dependency they
      // won't accidentaly add it to globals and Rollup will warn them
      // about their error.
      ...Object.keys(devDependencies),
    ]),
    // Only dependencies that cause compatibility issues are not bundled.
    peer: processDependencies(externalForPeerBuild),
    // No runtime dependencies, everything's bundled.
    standalone: [],
  };

  const commonOutput = {
    banner,
    dir: ".",
    globals: processGlobals(globals),
    sourcemap: VIS_TEST ? "inline" : true,
  } as const;
  const commonOutputESM = {
    ...commonOutput,
    format: "esm",
  } as const;
  const commonOutputUMD = {
    ...commonOutput,
    exports: "named",
    extend: true,
    format: "umd",
    name: "vis",
    strict: false, // Regenerator runtime causes issues with CSP in strict mode.
  } as const;

  // Note: Binding more than 4 at a time is not typesafe in TS.
  const getPlugins = generateRollupPluginArray
    .bind(null, libraryFilename)
    .bind(null, assets)
    .bind(null, copyTargetsBundle)
    .bind(null, copyTargetsVariant)
    .bind(null, tsconfig)
    .bind(null, mode);

  return [
    {
      external: external.standalone,
      input: standaloneEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `standalone/esm/${libraryFilename}.js`,
        },
        {
          ...commonOutputESM,
          entryFileNames: `standalone/esm/${libraryFilename}.mjs`,
        },
        {
          ...commonOutputUMD,
          entryFileNames: `standalone/umd/${libraryFilename}.js`,
        },
        {
          ...commonOutputUMD,
          entryFileNames: `standalone/umd/${libraryFilename}.cjs`,
        },
      ],
      plugins: getPlugins("standalone", {
        injectCSS,
        transpile,
        typescript: isTS(standaloneEntry),
      }),
    },
    {
      external: external.standalone,
      input: standaloneEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `standalone/esm/${libraryFilename}.min.js`,
        },
        {
          ...commonOutputESM,
          entryFileNames: `standalone/esm/${libraryFilename}.min.mjs`,
        },
        {
          ...commonOutputUMD,
          entryFileNames: `standalone/umd/${libraryFilename}.min.js`,
        },
        {
          ...commonOutputUMD,
          entryFileNames: `standalone/umd/${libraryFilename}.min.cjs`,
        },
      ],
      plugins: getPlugins("standalone", {
        injectCSS,
        minimize,
        transpile,
        typescript: isTS(standaloneEntry),
      }),
    },

    {
      external: external.peer,
      input: peerEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `peer/esm/${libraryFilename}.js`,
          paths: getPaths("peer", "esm"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `peer/esm/${libraryFilename}.mjs`,
          paths: getPaths("peer", "esm"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `peer/umd/${libraryFilename}.js`,
          paths: getPaths("peer", "umd"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `peer/umd/${libraryFilename}.cjs`,
          paths: getPaths("peer", "umd"),
        },
      ],
      plugins: getPlugins("peer", {
        transpile,
        typescript: isTS(peerEntry),
      }),
    },
    {
      external: external.peer,
      input: peerEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `peer/esm/${libraryFilename}.min.js`,
          paths: getPaths("peer", "esm"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `peer/esm/${libraryFilename}.min.mjs`,
          paths: getPaths("peer", "esm"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `peer/umd/${libraryFilename}.min.js`,
          paths: getPaths("peer", "umd"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `peer/umd/${libraryFilename}.min.cjs`,
          paths: getPaths("peer", "umd"),
        },
      ],
      plugins: getPlugins("peer", {
        minimize,
        transpile,
        typescript: isTS(peerEntry),
      }),
    },

    {
      external: external.esnext,
      input: esnextEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `esnext/esm/${libraryFilename}.js`,
          paths: getPaths("esnext", "esm"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `esnext/esm/${libraryFilename}.mjs`,
          paths: getPaths("esnext", "esm"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `esnext/umd/${libraryFilename}.js`,
          paths: getPaths("esnext", "umd"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `esnext/umd/${libraryFilename}.cjs`,
          paths: getPaths("esnext", "umd"),
        },
      ],
      plugins: getPlugins("esnext", {
        typescript: isTS(esnextEntry),
      }),
    },
    {
      external: external.esnext,
      input: esnextEntry,
      output: [
        {
          ...commonOutputESM,
          entryFileNames: `esnext/esm/${libraryFilename}.min.js`,
          paths: getPaths("esnext", "esm"),
        },
        {
          ...commonOutputESM,
          entryFileNames: `esnext/esm/${libraryFilename}.min.mjs`,
          paths: getPaths("esnext", "esm"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `esnext/umd/${libraryFilename}.min.js`,
          paths: getPaths("esnext", "umd"),
        },
        {
          ...commonOutputUMD,
          entryFileNames: `esnext/umd/${libraryFilename}.min.cjs`,
          paths: getPaths("esnext", "umd"),
        },
      ],
      plugins: getPlugins("esnext", {
        minimize,
        typescript: isTS(esnextEntry),
      }),
    },
  ];
}
