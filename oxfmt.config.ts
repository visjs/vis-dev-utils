import { ignorePatterns } from "./linting-and-formatting-ignore-patterns.ts";
import { defineSharedConfig } from "./src/oxfmt-shared-config/index.ts";

export default defineSharedConfig({
  ignorePatterns,
});
