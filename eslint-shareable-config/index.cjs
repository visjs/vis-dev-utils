module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: false,
    node: false,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    project: "./tsconfig.lint.json",
  },

  plugins: [
    "@typescript-eslint",
    "cypress",
    "eslint-comments",
    "jsdoc",
    "prettier",
  ],

  extends: ["plugin:eslint-comments/recommended"],

  rules: {
    "eslint-comments/no-unused-disable": "error",
    "eslint-comments/require-description": [
      "warn",
      {
        ignore: [
          // There's no need to duplicate the message when reenabling the rule.
          "eslint-enable",
        ],
      },
    ],
  },

  overrides: [
    // config files
    {
      files: ["./*.*"],
      env: {
        browser: false,
        node: true,
      },
    },

    // JavaScript, TypeScript
    {
      files: ["**/*.js", "**/*.ts"],
      extends: ["eslint:recommended"],
      rules: {
        "no-var": "error",
        "prefer-const": "error",

        "no-console": [
          "error",
          {
            allow: [
              "debug",
              "error",
              "group",
              "groupCollapsed",
              "groupEnd",
              "info",
              "warn",
            ],
          },
        ],
      },
    },

    // JavaScript
    {
      files: ["**/*.js"],
      rules: {},
      settings: {
        jsdoc: {
          mode: "jsdoc",
        },
      },
    },

    // TypeScript
    {
      files: ["**/*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        // Class related.
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "memberLike",
            modifiers: ["private", "protected"],
            format: null,
            leadingUnderscore: "require",
          },
          {
            selector: "memberLike",
            modifiers: ["public"],
            format: null,
            leadingUnderscore: "forbid",
          },
        ],
        "@typescript-eslint/no-useless-constructor": "error",
        // "@typescript-eslint/prefer-readonly": "error",
        // "@typescript-eslint/prefer-readonly-parameter-types": "warn",

        // Other.
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-includes": "error",

        // This reports hoisted code, I have no idea why it's on by default.
        "@typescript-eslint/no-use-before-define": "off",
        // This is really crazy if you want to work with JavaScript and
        // especially with legacy code.
        "@typescript-eslint/no-explicit-any": "off",
        // Empty functions are useful sometimes.
        "@typescript-eslint/no-empty-function": "off",
        // Enforcing this would be a very good thing but with some of the
        // functions I just have no idea how to type them, so disable for now.
        "@typescript-eslint/explicit-module-boundary-types": "off",
        // This would be a breaking change for little gain. Though there
        // definitely is some merit in this.
        "@typescript-eslint/ban-types": "off",

        // Various rules to ensure TSDoc is okay.
        "jsdoc/no-types": "error",
        "jsdoc/require-hyphen-before-param-description": "error",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/check-tag-names": [
          "error",
          { definedTags: ["remarks", "typeParam"] },
        ],
      },
      settings: {
        jsdoc: {
          mode: "typescript",
          structuredTags: {
            typeParam: {
              name: true,
              type: false,
            },
          },
        },
      },
    },

    // docs JavaScript, TypeScript
    {
      files: ["**/*.js", "**/*.ts"],
      extends: ["plugin:jsdoc/recommended"],
      rules: {
        "jsdoc/check-indentation": "warn",
        "jsdoc/check-syntax": "warn",
        "jsdoc/check-tag-names": ["error", { definedTags: ["remarks"] }],
        "jsdoc/empty-tags": "warn",
        "jsdoc/require-description": "warn",
        "jsdoc/require-jsdoc": "warn",
      },
      settings: {
        jsdoc: {
          tagNamePreference: {
            inheritdoc: "inheritDoc",
            typeparam: "typeParam",
          },
        },
      },
    },
    // docs JavaScript
    {
      files: ["**/*.js"],
      rules: {},
      settings: {
        jsdoc: {
          mode: "jsdoc",
        },
      },
    },
    // docs TypeScript
    {
      files: ["**/*.ts"],
      rules: {
        // Various rules to ensure TSDoc is okay.
        "jsdoc/no-types": "error",
        "jsdoc/require-hyphen-before-param-description": "error",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-returns-type": "off",
        "jsdoc/check-tag-names": [
          "error",
          { definedTags: ["remarks", "typeParam"] },
        ],
      },
      settings: {
        jsdoc: {
          mode: "typescript",
          structuredTags: {
            typeParam: {
              name: true,
              type: false,
            },
          },
        },
      },
    },
    // docs not required
    {
      files: ["./cypress/**/*", "./test/**/*"],
      rules: {
        "jsdoc/require-jsdoc": "off",
      },
    },

    // tests
    {
      files: ["./test/**/*"],
      env: {
        mocha: true,
        node: true,
      },
    },
    {
      files: ["./cypress/**/*"],
      env: {
        "cypress/globals": true,
        browser: true,
        es6: true,
        mocha: true,
        node: true,
      },
      rules: {
        "@typescript-eslint/no-namespace": "off",
      },
    },

    // Prettier (has to be last)
    {
      files: ["**/*.{js,ts}"],
      extends: ["prettier"],
    },
    {
      files: ["**/*"],
      rules: {
        "no-unexpected-multiline": "off",
      },
    },
  ],
};
