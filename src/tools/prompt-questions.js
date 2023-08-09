const fs = require("fs")
const inquirer = require("inquirer")
const axios = require("axios")
const chalk = require("chalk")
const { TOOLKIT_GLOBAL_CONFIG, THEME_TEMPLATES, WHO_ARE_YOU_PROMPT, EXTENSION_PROMPT } = require("./toolkit-common-vars")

// small function to check if item has been defined
const isDefined = answer => !!answer

// checks if the string provided is valid folder name
const isValidFolderName = toTest => {
  const pattern = new RegExp(/^[a-z0-9_-]+$/, "i")
  const result = pattern.test(toTest)
  if (!result) {
    console.error(chalk.red(`\n${toTest} does not seem as valid folder name.`))
  }
  return toTest !== "undefined" && result
}

// gets only origin from the url
const parseToUrl = toParse => {
  try {
    const myUrl = new URL(toParse)
    return Promise.resolve(myUrl.origin)
  } catch (err) {
    return toParse
  }
}

// checks if the string provided is valid URL
const isValidURL = toTest => {
  const pattern = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    "i"
  )
  const result = pattern.test(toTest)
  if (!result) {
    console.error(chalk.red(`\n"${toTest}" does not seem as valid URL.`))
  }
  return result
}
const isValidMarketplaceURL = async toTest => {
  if (!toTest || !isValidURL(toTest)) return false
  console.log("\n\n Verifiying Marketplace URL...")
  try {
    const response = await axios.get(
      `${toTest}/api/session/v1/frontend-context`
    )
    if (!response.data.bootstrap.marketPlaceName)
      throw Error("This is not a marketplace")
  } catch (err) {
    switch (err.code) {
      case "ETIMEDOUT":
        console.log(chalk.red(
          `  Unable to reach ${toTest}. Please make sure to provide valid marketplace URL and that if you are running a proxy, is it configured correctly with node https://jjasonclark.com/how-to-setup-node-behind-web-proxy/  \n`
        ))
        break
      default:
        console.log(chalk.red(
          `  ${toTest} does not seem to be a valid marketplace URL.\n`
        ))
        break
    }
    return false
  }
  console.log(chalk.green("  Marketplace URL successfully verified.\n"))
  return true
}

const licenseText = ` In order to use this software, please type 'agree' to accept the license agreement that can be found at https://help.appdirect.com/sfb-eula.pdf`

// list of default questions that could be prompt to user
const QUESTIONS = [
  {
    type: "input",
    name: "ProjectName",
    message: "Name of the project:",
    default: TOOLKIT_GLOBAL_CONFIG.defaultValues.projectName,
    validate: isValidFolderName
  },
  {
    type: "input",
    name: "ThemeName",
    message: "Customize the theme name:",
    default: TOOLKIT_GLOBAL_CONFIG.defaultValues.themeName,
    validate: isValidFolderName
  },
  {
    type: "input",
    name: "MarketplacePath",
    message: "Path to the Marketplace:",
    default: TOOLKIT_GLOBAL_CONFIG.defaultValues.marketplacePath,
    validate: isValidMarketplaceURL,
    filter: parseToUrl
  },
  {
    type: "confirm",
    name: "PackTranslationsChoice",
    message: "Do you want to include translations in this package?",
    default: false
  },
  {
    type: "input",
    name: "LicenseAgreement",
    message: licenseText,
    validate: isDefined
  },
  {
    type: "list",
    name: "ThemeTemplates",
    message: "Choose a marketplace theme as a starting point:",
    choices: THEME_TEMPLATES
  },
  {
    type: "list",
    name: "WhoAreYou",
    message: "Please indicate which option most closely represents who you are:",
    choices: WHO_ARE_YOU_PROMPT
  },
  {
    type: "confirm",
    name: "PackSettingsChoice",
    message: "Do you want to include the Storefront Builder layout editor settings in this package? (This will override existing settings in the editor)",
    default: false
  },
  {
    type: "list",
    name: "CreateExtension",
    message: "Please select the type of extension you want to build:",
    choices: EXTENSION_PROMPT,
  },
  {
    type: "input",
    name: "ExtensionName",
    message:
      "Name of the extension you want to build (letter & underscore only):",
    validate: isValidFolderName,
  },
  {
    type: "input",
    name: "AppPath",
    message:
      "Path to the extension you want to build on the marketplace /app/:mypath (letter & dash, only) (This can be changed later):",
    validate: isValidFolderName,
  },
]

// use only selected question
// list: Array<String>
const chooseQuestions = list =>
  QUESTIONS.filter(question => list.includes(question.name))

// parse question if necessary (eg. want to update default)
const parseQuestions = (questions, custom) =>
  chooseQuestions(questions).map(question => {
    const newCustom = custom.find(q => q.name === question.name)
    return {
      ...question,
      ...newCustom
    }
  })

// prompt to user with provided qustions
const ask = (questions = [], custom = []) => {
  const toAsk =
    custom.length > 0
      ? parseQuestions(questions, custom)
      : chooseQuestions(questions)
  return inquirer.prompt(toAsk)
}
module.exports = {
  ask,
  validateFun: {
    isValidFolderName,
    isValidURL
  }
}
