#!/usr/bin/env node

const program = require("commander")
const { spawn } = require("child_process")

const PROJECT_SETUP_PATH = "src/tools/toolkit-setup.js"
const PROJECT_SETUP_E2E_PATH = "src/tools/toolkit-setup-e2e.js"
const PROJECT_CONFIG_SETUP_PATH = "src/tools/toolkit-config-setup.js"
const STATUS_PATH = "src/tools/toolkit-status.js"
const ABOUT_PATH = "src/tools/toolkit-about.js"
const NEW_THEME_PATH = "src/tools/toolkit-create.js"
const CHECKOUT_PATH = "src/tools/toolkit-checkout.js"
const UPDATE_PATH = "src/tools/toolkit-update.js"
const SERVER_START_PATH = "src/tools/toolkit-start.js"
const PACKAGE_PATH = "src/tools/toolkit-package.js"
const TESTS_PATH = "src/tools/toolkit-tests.js"
const CREATE_EXTENSION_PATH = "src/tools/toolkit-create-extension.js"
const VERSION_PATH = "src/tools/toolkit-version.js"
const STORYBOOK = "src/tools/toolkit-storybook.js"
const INSTALL = "src/tools/toolkit-install.js"
const COMPONENTS = "src/tools/toolkit-components.js"
const DEV_E2E = "src/tools/toolkit-dev-e2e.js"

program
  .command("setup [name]")
  .description("Creates a new project")
  .action((name) => {
    spawn(`node "${__dirname}/../${PROJECT_SETUP_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("setup-e2e-theme")
  .description("Creates a new project for e2e tests")
  .action((name) => {
    spawn(`node "${__dirname}/../${PROJECT_SETUP_E2E_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("config-setup [projname] [themename]")
  .description("Creates the config files for a new project")
  .action((projname, themename) => {
    spawn(
      `node "${__dirname}/../${PROJECT_CONFIG_SETUP_PATH}" ${projname} ${themename}`,
      {
        stdio: "inherit",
        shell: true,
      }
    )
  })

program
  .command("start")
  .description("Starts the Theme Web Server")
  .option(
    "-c, --withLocalComponents",
    "Use components from node-modules",
    true,
    0
  )
  .on("option:withLocalComponents", () => {
    process.env.withLocalComponents = "true"
  })
  .option("-v, --verbose", "Enable all logs in console", true, 0)
  .on("option:verbose", () => {
    process.env.verboseToolkitOutput = "true"
  })
  .action(() => {
    spawn(`node "${__dirname}/../${SERVER_START_PATH}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("about")
  .description("Lists existing themes")
  .action((name) => {
    spawn(`node "${__dirname}/../${ABOUT_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("status")
  .description("Gives information about the current config")
  .action(() => {
    spawn(`node "${__dirname}/../${STATUS_PATH}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("create [name]")
  .description("Creates a new theme")
  .action((name) => {
    spawn(`node "${__dirname}/../${NEW_THEME_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("checkout [name]")
  .description("Changes context to theme")
  .action((name) => {
    spawn(`node "${__dirname}/../${CHECKOUT_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("update")
  .description("Updates current theme configuration")
  .action((name) => {
    spawn(`node "${__dirname}/../${UPDATE_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("package")
  .description("Creates a .zip file with the current theme files")
  .option("-a, --all", "Pack everything", true, 0)
  .on("option:all", () => {
    process.env.PACK_ALL = "true"
  })
  .action(() => {
    spawn(`node "${__dirname}/../${PACKAGE_PATH}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("storybook")
  .description("Start storybook for the currently selected theme.")
  .action(() => {
    spawn(`node "${__dirname}/../${STORYBOOK}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("install [module]")
  .description("Installs npm module in the currently selected theme.")
  .action((module) => {
    spawn(`node "${__dirname}/../${INSTALL}" ${module}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("components")
  .description("Setup custom components")
  .action(() => {
    spawn(`node "${__dirname}/../${COMPONENTS}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("use-local-sfb-components")
  .description("Setup theme to use local sfb-components bundles for e2e")
  .action(() => {
    spawn(`node "${__dirname}/../${DEV_E2E}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("version")
  .alias("v")
  .description("Shows version of sfb-toolkit\n")
  .action(() => {
    spawn(`node "${__dirname}/../${VERSION_PATH}"`, {
      stdio: "inherit",
      shell: true,
    })
  })

program
  .command("create-extension", { hidden: true })
  .description("Creates a new application")
  .action((name) => {
    spawn(`node "${__dirname}/../${CREATE_EXTENSION_PATH}" ${name}`, {
      stdio: "inherit",
      shell: true,
    })
  })

program.parse(process.argv)

// check if there were no args specified
if (program.args.length === 0) {
  program.help()
}
