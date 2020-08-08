import yargs from "yargs";
import { spawnSync } from "child_process";

yargs
  .strict(true)
  .usage("test-e2e-interop <command> [options]")
  .hide("version")
  .config()
  .help()

  .command(
    "install-dependencies-for [tools..]",
    "Install the dependencies for given tool(s). Note that this is specific to CircleCI's Debian based Docker images.",
    (yargs) =>
      yargs.positional("tools", {
        choices: ["chromium", "cypress"],
        demandOption: true,
        describe: "The tool whose dependecies will be installed.",
        type: "string",
      }),
    (argv): void => {
      const dependecies = new Set<string>();

      if (argv.tools.includes("chromium")) {
        dependecies.add("libasound2");
        dependecies.add("libgtk-3-0");
        dependecies.add("libnss3");
        dependecies.add("libxss1");
        dependecies.add("libxtst6");
      }

      if (argv.tools.includes("cypress")) {
        dependecies.add("libasound2");
        dependecies.add("libgconf-2-4");
        dependecies.add("libgtk-3-0");
        dependecies.add("libgtk2.0-0");
        dependecies.add("libnotify-dev");
        dependecies.add("libnss3");
        dependecies.add("libxss1");
        dependecies.add("libxtst6");
        dependecies.add("xauth");
        dependecies.add("xvfb");
      }

      spawnSync("sudo", ["apt-get", "install", "-yq", ...dependecies], {
        stdio: "inherit",
      });
    }
  )

  .parserConfiguration({ "camel-case-expansion": false })
  .parse();
