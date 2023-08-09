const fs = require("fs")
const archiver = require("archiver")
const moment = require("moment")
const chalk = require("chalk")

const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)

const theme = config.theme || "classic"

const dir = `${currentPath}/theme-zips`
const { COMMAND_PARAM } = require("./toolkit-common-vars")

const SHOULD_INCLUDE_TRANSLATIONS = COMMAND_PARAM === "true" || false
const SHOULD_INCLUDE_SETTINGS = process.argv[3] === "true" || false

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const now = moment().format("YYYY-MM-DD_HH.mm.ss")
const fileName = `${currentPath}/theme-zips/${theme}__${now}.zip`
const fileOutput = fs.createWriteStream(fileName)
const archive = archiver("zip")

fileOutput.on("close", () => {
  console.log(chalk.green(`${archive.pointer()} total bytes`))
  console.log(chalk.green(
    `Archive has been finalized in /theme-zips with theme ${theme}`
  ))
})

archive.pipe(fileOutput)
const root = `${currentPath}/themes/${theme}`

const specialIgnore = []
if (!SHOULD_INCLUDE_TRANSLATIONS) {
  specialIgnore.push("translations/**")
}

if (!SHOULD_INCLUDE_SETTINGS) {
  specialIgnore.push("settings.json")
}

// some glob pattern here
archive.glob("**", {
  cwd: root,
  ignore: [
    ".*",
    "__*/**",
    "**/node_modules/**",
    "*.Jenkinsfile",
    "package-lock.json",
    "npm-shrinkwrap.json",
    "README.md",
    ...specialIgnore
  ]
})
// add as many as you like
archive.on("error", err => {
  console.log(chalk.red(err))
  throw err
})
archive.finalize()
