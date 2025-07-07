import snapshot from "snap-shot-it";

import { inspectNpmPack } from "../src/module/inspect-npm-pack.ts";

describe("package", function (): void {
  it("exported files", function (): void {
    this.timeout(5000);
    snapshot(inspectNpmPack());
  });
});
