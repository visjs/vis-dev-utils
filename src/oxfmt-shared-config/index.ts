import { defineConfig } from "oxfmt";
import type { OxfmtConfig } from "oxfmt";

export default defineConfig<OxfmtConfig>({
  printWidth: 80,
  sortImports: {
    newlinesBetween: false,
    sortSideEffects: true,
    customGroups: [
      {
        groupName: "vis",
        elementNamePattern: ["vis-**"],
      },
      {
        groupName: "side_effect-vis",
        elementNamePattern: ["vis-**"],
        modifiers: ["side_effect"],
      },
    ],
    groups: [
      ["side_effect-builtin"],
      ["side_effect-external"],
      ["side_effect-vis"],
      ["side_effect-internal"],
      ["side_effect-subpath"],
      ["side_effect-parent"],
      ["side_effect-index"],
      ["side_effect-sibling"],

      { newlinesBetween: true },

      ["builtin"],

      { newlinesBetween: true },

      ["external"],

      { newlinesBetween: true },

      ["vis"],

      { newlinesBetween: true },

      ["internal"],
      ["subpath"],
      ["parent"],
      ["index"],
      ["sibling"],

      { newlinesBetween: true },

      ["import"],

      { newlinesBetween: true },

      "unknown",
    ],
  },
});
