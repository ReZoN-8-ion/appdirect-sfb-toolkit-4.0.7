const { spawn } = require("child_process")
const chalk = require("chalk")

const PACKFONTS_PATH = "src/tools/package-fonts.js"
const ZIPTHEME_PATH = "src/tools/zip-theme.js"
const COMPILECOMPONENTS_PATH = "src/tools/compiler-components-prod.js"
const prompt = require("./prompt-questions")
const fs = require("fs-extra")

const fsProm = fs.promises
const yaml = require("js-yaml")

const currentPath = process.cwd()
const config = require(`${currentPath}/config`)

const {
  TOOLKIT_PATH,
  COMPILERCSS_PATH,
  ACTIVE_THEME_PATH
} = require("./toolkit-common-vars")
const { shouldBeProjectFolder, addMetadata } = require("./toolkit-common-fun")

shouldBeProjectFolder(true)

const yamlErrorCustomMessage = `Invalid translation files, please make sure the .yml files are in yaml format and not in JSON.
You can verify your yaml files on various free YAML validators on the web.`

const hasTranslationErrors = async () => {
  let yamlErrorFlag = false
  const translationsPath = `${currentPath}/themes/${config.theme}/translations`
  try {
    const translationsFiles = await fsProm.readdir(translationsPath)
    translationsFiles.forEach(langFile => {
      try {
        yaml.load(fs.readFileSync(`${translationsPath}/${langFile}`))
      } catch (err) {
        yamlErrorFlag = true
        if (err.name === "YAMLException") {
          console.log(chalk.red(`${langFile} -> ${err}`))
        }
        console.log(chalk.red(err))
      }
    })
    if (yamlErrorFlag) {
      console.log(chalk.red(yamlErrorCustomMessage))
    }
  } catch (err) {
    yamlErrorFlag = true
    console.log(chalk.red(`${err}`))
  }
  return yamlErrorFlag
}

const includeSettings = async shouldIncludeSettings => {
  if (fs.existsSync(`${ACTIVE_THEME_PATH}/settings.json`)) {
    const userAnswerSettings = await prompt.ask(["PackSettingsChoice"])
    return userAnswerSettings.PackSettingsChoice
  }
  return shouldIncludeSettings
}
;(async () => {
  let shouldIncludeTranslations = true
  let shouldIncludeSettings = true

  addMetadata();

  if (process.env.PACK_ALL !== "true") {
    const userAnswerTranslations = await prompt.ask(["PackTranslationsChoice"])
    shouldIncludeTranslations = userAnswerTranslations.PackTranslationsChoice
    if (shouldIncludeTranslations && (await hasTranslationErrors())) return
    shouldIncludeSettings = await includeSettings(shouldIncludeSettings)
  } else {
    const translationsError = await hasTranslationErrors()
    if (translationsError) return
  }

  spawn(
    `node "${TOOLKIT_PATH}/${COMPILECOMPONENTS_PATH}" && node "${TOOLKIT_PATH}/${COMPILERCSS_PATH}" && node "${TOOLKIT_PATH}/${PACKFONTS_PATH}" && node "${TOOLKIT_PATH}/${ZIPTHEME_PATH}" ${shouldIncludeTranslations} ${shouldIncludeSettings}`,
    {
      stdio: "inherit",
      shell: true
    }
  )
})()
