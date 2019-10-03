module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    mocha: true
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2019,
    project: "tsconfig.json"
  },

  plugins: ["prettier", "@typescript-eslint"],

  extends: ["eslint:recommended", "prettier"],

  // JavaScript
  rules: {
    "prettier/prettier": ["error"],

    complexity: ["error", 55],
    "max-statements": ["error", 115],
    "no-unreachable": "error",
    "no-useless-escape": "off",

    "no-console": ["error", { allow: ["info", "warn", "error"] }],

    "valid-jsdoc": [
      "error",
      {
        requireReturnDescription: false,
        requireReturn: false,
        requireParamDescription: false,
        requireReturnType: true
      }
    ],
    "guard-for-in": 1
  },
  overrides: [
    // TypeScript
    {
      files: ["**/*.ts", "**/*.d.ts"],
      rules: {
        // @TODO: Seems to mostly work just fine but I'm not 100 % sure.
        // @TODO: Deprecated, anything like this for tsdoc?
        "valid-jsdoc": [
          "warn",
          {
            prefer: {
              arg: "param",
              argument: "param",
              return: "returns"
            },
            requireParamDescription: true,
            requireParamType: false,
            requireReturn: false, // Requires return for void functions.
            requireReturnDescription: true,
            requireReturnType: false
          }
        ],

        // Class related.
        "@typescript-eslint/member-naming": [
          "error",
          { private: "^_", protected: "^_", public: "^[^_]" }
        ],
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/prefer-readonly": "error",

        // Other.
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-includes": "error",
        "@typescript-eslint/prefer-regexp-exec": "error",
        // @TODO: Seems like a good thing, not yet on npm though.
        // "@typescript-eslint/require-await": "error",

        // These are hoisted, I have no idea why it reports them by default.
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, classes: false, typedefs: false }
        ],
        // False positives for overloading, also tsc compiles with errors anyway.
        "no-dupe-class-members": "off",
        // Blocks typesafe exhaustive switch (switch (x) { … default: const never: never = x }).
        "no-case-declarations": "off",
        // Reports used types.
        "no-unused-vars": "off",
        // Reports typeof bigint as an error, tsc validates this anyway so no problem turning this off.
        "valid-typeof": "off"
      }
    }
  ]
};
