declare module "snap-shot-compare" {
  const value: (...rest: readonly any[]) => any;
  export default value;
}

declare module "snap-shot-core" {
  const value: { core(options: any): void };
  export default value;
}
