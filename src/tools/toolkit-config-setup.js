const fs = require("fs")
const { copy } = require("fs-extra")
const chalk = require("chalk")
const prompt = require("./prompt-questions");
const { TOOLKIT_GLOBAL_CONFIG} = require("./toolkit-common-vars")

const { CURRENT_PATH, TOOLKIT_PATH, BOOTSTRAP_FOLDERS, CONFIG_PATH, PAGE_OBJECTS_SUFFIX } = require("./toolkit-common-vars");
const { selfDestruction, shouldBeProjectFolder, getAvailableFolderWithPrompt, versionCheck } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");
const projectName = process.argv[2];
const themeName = process.argv[3];

let freshLocalConfig = {
    namespaces: [],
    defaultValues: {}
};

(async () => {

    shouldBeProjectFolder(false);
    
    await versionCheck();

    // Determine project's dir path
    let projectPath = `${CURRENT_PATH}/`; // by default
    if (!prompt.validateFun.isValidFolderName(projectName)){
        console.error(chalk.red(`Not valid project name`));
        process.exit(1);
    }

    if(!prompt.validateFun.isValidFolderName(themeName)){
        console.error(chalk.red(`Not valid theme name`));
        process.exit(1);
    }

    // if provided with command, set the pointer on the provided name 
    projectPath = await getAvailableFolderWithPrompt(CURRENT_PATH, projectName, "ProjectName");
    
    freshLocalConfig.projectName = projectPath.replace(`${CURRENT_PATH}/`, "");
    
    // create bootstrap folders
    BOOTSTRAP_FOLDERS.forEach(folderName => {
        if (!fs.existsSync(`${projectPath}/${folderName}`)) {
            fs.mkdirSync(`${projectPath}/${folderName}`);
        }
    });

    freshLocalConfig.defaultValues.themeName = themeName

    // copy config/index.js file
    try {
        await copy(
            `${TOOLKIT_PATH}/${CONFIG_PATH}`, 
            `${projectPath}/${CONFIG_PATH}`
        );
        
        freshLocalConfig.defaultValues.marketplacePath = TOOLKIT_GLOBAL_CONFIG.defaultValues.marketplacePath;
        freshLocalConfig.defaultValues.pageObjectsPath = `${TOOLKIT_GLOBAL_CONFIG.defaultValues.marketplacePath}${PAGE_OBJECTS_SUFFIX}`;
    } catch (err) {
        console.error(chalk.red(` Couldn't copy config file due to: \n  ${err}`));
        selfDestruction(projectPath); // revert changes   
        process.exit(1);
    }

    freshLocalConfig.current = freshLocalConfig.defaultValues.themeName;
    freshLocalConfig.namespaces.push(freshLocalConfig.defaultValues);
    freshLocalConfig.created = new Date();
    freshLocalConfig.modified = new Date();

    try {
        LOCAL_CONFIG.save(freshLocalConfig, projectPath);
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to save config file due to: \n  ${err}`));
        process.exit(1);
    }

    try {
        LOCAL_CONFIG.configFileUpdate(projectPath);
        console.log(chalk.green(` Project context switched to ${freshLocalConfig.current}.`));
    } catch ( err ) {
        console.error(chalk.red(` ERROR: Unable to switch context to ${freshLocalConfig.current} due to: ${err}`));
        process.exit(1);
    }

    console.log(chalk.green(` Theme location: ${projectPath}/`))
    console.log(chalk.green(` Configuration file location: ${projectPath}/config/`))
    console.log(chalk.green(`\n All done for config setup!  ${projectPath}\n`));
})();
