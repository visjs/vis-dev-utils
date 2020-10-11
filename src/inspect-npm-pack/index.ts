import compare from "snap-shot-compare";
import snapshot from "snap-shot-core";
import { inspectNpmPack } from "../module/inspect-npm-pack";

snapshot.core({
  exactSpecName: "inspect-npm-pack",
  file: __filename.replace(/\/node_modules\/.*\//, "/"),
  compare,
  opts: {
    dryRun: process.env.DRY === "1",
    show: process.env.SHOW === "1",
    sortSnapshots: true,
    update: process.env.UPDATE === "1",
  },
  what: inspectNpmPack(),
});
