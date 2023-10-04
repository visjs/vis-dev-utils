import yargs from "yargs";

const y = yargs
  .strict(true)
  .usage("test-e2e-interop [options]")
  .hide("version")
  .config()
  .help()

  .option("fail-command", {
    demandOption: false,
    describe:
      'This command will be run in a shell (therefore commands like "$SHELL" will work) after failure to inspect the state.',
    type: "string",
  })
  .option("package-script", {
    array: true,
    default: ["clean?", "build!", "test!", "generate-examples-index?"],
    demandOption: false,
    describe:
      'The package scripts to run with each package, either "script-name!" to fail or "script-name?" to skip if the script doesn\'t exist in given package. By default the script is used for all packages, if you want to use it only for one add package name: "package-name script-name!". Scripts are invoked sequentially and command line order is preserved.',
    type: "string",
  })
  .option("project", {
    array: true,
    default: [] as string[],
    demandOption: false,
    describe:
      'Projects to clone using Git, copy from directory or install from tarball. The format is "package-name URL/path".',
    type: "string",
  })
  .option("tmp-dir", {
    demandOption: false,
    describe:
      "The working directory for E2E testing. If omitted a new tmp dir will be created and then disposed of.",
    type: "string",
  })
  .option("logs-to-stdout", {
    demandOption: false,
    default: false,
    describe: "Output the logs to the stdout after the tests finished.",
    type: "boolean",
  });

/**
 *
 */
export function parseArguments(): ReturnType<(typeof y)["parseSync"]> {
  return y.parserConfiguration({ "camel-case-expansion": false }).parseSync();
}
