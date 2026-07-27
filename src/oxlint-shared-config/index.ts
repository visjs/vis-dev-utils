import { defineConfig } from "oxlint";
import type { OxlintConfig } from "oxlint";

export default defineConfig<OxlintConfig>({
  plugins: ["eslint", "import", "oxc", "oxc", "typescript", "unicorn"],
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  rules: {
    // Enabled by the categories but we don't want to enforce
    "eslint/no-unexpected-multiline": "off", // Oxfmt handles hits
    "import/no-unassigned-import": "off", // We use side-effect imports intentionally to import styles, etc.

    // Enabled beyond the categories
    "eslint/guard-for-in": "error",
    "eslint/no-array-constructor": "error",
    "eslint/no-console": [
      "error",
      {
        allow: [
          "assert",
          "count",
          "countReset",
          "dir",
          "dirxml",
          "error",
          "group",
          "groupCollapsed",
          "groupEnd",
          "info",
          "table",
          "time",
          "timeEnd",
          "timeLog",
          "timeStamp",
          "trace",
          "warn",
        ],
      },
    ],
    "eslint/no-empty": "error",
    "eslint/no-fallthrough": "error",
    "eslint/no-regex-spaces": "error",
    "eslint/no-useless-return": "error",
    "eslint/no-var": "error",
    "eslint/sort-imports": ["error", { ignoreDeclarationSort: true }],
    "eslint/unicode-bom": "error",
    "import/consistent-type-specifier-style": "error",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-default": "error",
    "typescript/array-type": "error",
    "typescript/explicit-member-accessibility": "error",
    "typescript/no-import-type-side-effects": "error",
    "typescript/no-non-null-asserted-nullish-coalescing": "error",
    "typescript/non-nullable-type-assertion-style": "error",
    "typescript/only-throw-error": "error",
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/no-length-as-slice-end": "error",
    "unicorn/prefer-node-protocol": "error",
    "vitest/consistent-test-it": "error",
    "vitest/no-test-prefixes": "error",
  },
});
