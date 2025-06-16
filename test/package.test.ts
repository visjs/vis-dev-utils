import snapshot from "snap-shot-it";

import { inspectNpmPack } from "../lib/inspect-npm-pack.js";

describe("package", function (): void {
  it("exported files", function (): void {
    this.timeout(5000);
    snapshot(inspectNpmPack());
  });
});
