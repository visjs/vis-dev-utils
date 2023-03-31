import snapshot from "snap-shot-it";

import { inspectNpmPack } from "../lib/inspect-npm-pack";

describe("package", function (): void {
  it("exported files", function (): void {
    this.timeout(5000);
    snapshot(inspectNpmPack());
  });
});
