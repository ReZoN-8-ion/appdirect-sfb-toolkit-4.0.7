const fs = require("fs")
const { copy, remove } = require("fs-extra")
const chalk = require("chalk")

const {
  CURRENT_PATH,
  TOOLKIT_PATH,
  COMMAND_PARAM,
  BOOTSTRAP_FOLDERS,
  CONFIG_PATH,
  PAGE_OBJECTS_SUFFIX
} = require("./toolkit-common-vars")
const {
  selfDestruction,
  shouldBeProjectFolder,
  getAvailableFolderWithPrompt,
  versionCheck
} = require("./toolkit-common-fun")
const { LOCAL_CONFIG } = require("./toolkit-config")

const projectName = COMMAND_PARAM // [optional]  project name

const freshLocalConfig = {
  namespaces: [],
  defaultValues: {}
}
;(async () => {
  shouldBeProjectFolder(false)

  await versionCheck()

  // Determine project's dir path
  let projectPath = `${CURRENT_PATH}/` // by default
  projectPath = await getAvailableFolderWithPrompt(
    CURRENT_PATH,
    projectName,
    "ProjectName"
  )

  freshLocalConfig.projectName = projectPath.replace(`${CURRENT_PATH}/`, "")

  // create bootstrap folders
  BOOTSTRAP_FOLDERS.forEach(folderName => {
    if (!fs.existsSync(`${projectPath}/${folderName}`)) {
      fs.mkdirSync(`${projectPath}/${folderName}`)
    }
  })

  // copy theme folder
  try {
    await copy(
      `${TOOLKIT_PATH}/node_modules/@appdirect/sfb-theme-plaza`,
      `${projectPath}/themes/Plaza`
    )
    await remove(`${projectPath}/themes/Plaza/package.json`)
    freshLocalConfig.defaultValues.themeName = projectName
  } catch (err) {
    console.error(chalk.red(` Could not create theme folder due to: \n  ${err}`))
    selfDestruction(projectPath) // revert changes
    process.exit(1)
  }

  // copy config/index.js file
  try {
    await copy(
      `${TOOLKIT_PATH}/${CONFIG_PATH}`,
      `${projectPath}/${CONFIG_PATH}`
    )
    const marketplacePath = "https://marketplace.appdirect.com"
    freshLocalConfig.defaultValues.marketplacePath = marketplacePath
    freshLocalConfig.defaultValues.pageObjectsPath = `${marketplacePath}${PAGE_OBJECTS_SUFFIX}`
  } catch (err) {
    console.error(chalk.red(` Couldn't copy config file due to: \n  ${err}`))
    selfDestruction(projectPath) // revert changes
    process.exit(1)
  }

  freshLocalConfig.current = freshLocalConfig.defaultValues.themeName
  freshLocalConfig.namespaces.push(freshLocalConfig.defaultValues)
  freshLocalConfig.created = new Date()
  freshLocalConfig.modified = new Date()

  try {
    LOCAL_CONFIG.save(freshLocalConfig, projectPath)
  } catch (err) {
    console.error(chalk.red(` ERROR: Unable to save config file due to: \n  ${err}`))
    process.exit(1)
  }

  try {
    LOCAL_CONFIG.configFileUpdate(projectPath)
    console.log(chalk.green(
      ` Project context switched to ${freshLocalConfig.current}.`
    ))
  } catch (err) {
    console.error(chalk.red(
      ` ERROR: Unable to switch context to ${
        freshLocalConfig.current
      } due to: ${err}`
    ))
    process.exit(1)
  }

  console.log(chalk.green(` Theme location: ${projectPath}/`))
  console.log(chalk.green(` Configuration file location: ${projectPath}/config/`))
  console.log(chalk.green(
    `\n All done! You can start your server by running \`sfb-toolkit start\` inside the project root folder: ${projectPath}\n`
  ))
})()
