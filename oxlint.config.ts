import { defineConfig } from "oxlint";
import type { OxlintConfig } from "oxlint";

import { ignorePatterns } from "./linting-and-formatting-ignore-patterns.ts";
import oxlintSharedConfig from "./src/oxlint-shared-config/index.ts";

export default defineConfig<OxlintConfig>({
  extends: [oxlintSharedConfig],
  rules: {
    // Enabled by the categories but disabled for now, PRs welcome (even if only partial)
    "eslint/no-shadow": "off",
    "eslint/no-unused-expressions": "off",
  },
  overrides: [
    {
      files: ["cypress/**", "**/*.test.js", "**/*.test.ts"],
      rules: {
        "eslint/no-unused-expressions": "off",
      },
    },
  ],
  ignorePatterns,
});
