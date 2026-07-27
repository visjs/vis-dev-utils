import { defineConfig } from "oxfmt";
import type { OxfmtConfig } from "oxfmt";

import { ignorePatterns } from "./linting-and-formatting-ignore-patterns.ts";
import sharedOxfmtConfig from "./src/oxfmt-shared-config/index.ts";

export default defineConfig<OxfmtConfig>({
  ...sharedOxfmtConfig,
  ignorePatterns,
});
