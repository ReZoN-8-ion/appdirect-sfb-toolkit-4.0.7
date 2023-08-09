const fs = require("fs")
const { copy, remove } = require("fs-extra")
const prompt = require("./prompt-questions");
const chalk = require("chalk")

const { CURRENT_PATH, TOOLKIT_PATH, COMMAND_PARAM, BOOTSTRAP_FOLDERS, CONFIG_PATH, PAGE_OBJECTS_SUFFIX } = require("./toolkit-common-vars");
const { selfDestruction, filesCounter, shouldBeProjectFolder, getAvailableFolderWithPrompt,
    licenseAgreement, versionCheck, createCustomThemePacakgeJson, addMetadata } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");
const projectName = COMMAND_PARAM; // [optional]  project name

let freshLocalConfig = {
    namespaces: [],
    defaultValues: {}
};

let themeName;
let userThemeAnswer;

(async () => {
    try {
        await licenseAgreement();
    } catch (err) {
        console.error(chalk.red(` ERROR: In order to use this software, you need to type 'agree' to accept the license agreement that can be found at https://help.appdirect.com/sfb-eula.pdf.`));  
        process.exit(1);
    }

    shouldBeProjectFolder(false);
    
    await versionCheck();

    // Determine project's dir path
    let projectPath = `${CURRENT_PATH}/`; // by default 
    switch (true) {
        case prompt.validateFun.isValidFolderName(projectName):
            // if provided with command, set the pointer on the provided name 
            projectPath = await getAvailableFolderWithPrompt(CURRENT_PATH, projectName, "ProjectName");
        break;
        case filesCounter(CURRENT_PATH) === 0 :
            // if not provided with command, but current path is empty, so set the pointer on the current path
            projectPath = CURRENT_PATH;
            console.log(chalk.green(` Using current folder as project folder.`));
        break;
        default:
            const userAnswer = await prompt.ask(["ProjectName"]);
            projectPath = await getAvailableFolderWithPrompt(CURRENT_PATH, userAnswer.ProjectName, "ProjectName");
        break;
    }

    freshLocalConfig.projectName = projectPath.replace(`${CURRENT_PATH}/`, "");
    
    // create bootstrap folders
    BOOTSTRAP_FOLDERS.forEach(folderName => {
        if (!fs.existsSync(`${projectPath}/${folderName}`)) {
            fs.mkdirSync(`${projectPath}/${folderName}`);
        }
    });

    const themeCreatedBy = await prompt.ask(["WhoAreYou"]);

    // copy theme folder 
    try {
        userThemeAnswer = await prompt.ask(["ThemeTemplates"]);
        themeName = await prompt.ask(["ThemeName"], [{name:"ThemeName", default: userThemeAnswer.ThemeTemplates.name}]);
        await copy(
            `${TOOLKIT_PATH}/node_modules/${userThemeAnswer.ThemeTemplates.dependency}`, 
            `${projectPath}/themes/${themeName.ThemeName}`
        );
        await remove(
            `${projectPath}/themes/${themeName.ThemeName}/package.json`
        );
        freshLocalConfig.defaultValues.themeName = themeName.ThemeName;
    } catch (err) {
        console.error(chalk.red(` Could not copy clasic theme due to: \n  ${err}`));
        selfDestruction(projectPath); // revert changes   
        process.exit(1);
    }

    try{
        fs.writeFileSync(
            `${projectPath}/themes/${themeName.ThemeName}/package.json`,
            createCustomThemePacakgeJson(
                themeName.ThemeName,
                userThemeAnswer.ThemeTemplates.dependency,
                themeCreatedBy.WhoAreYou
            )
        );
    } catch(err) {
        console.error(chalk.red(` ERROR: Unable to create ${themeName.ThemeName}'s package.json file due to ${err}.`));
        process.exit(1);
    }

    // copy config/index.js file
    try {
        await copy(
            `${TOOLKIT_PATH}/${CONFIG_PATH}`, 
            `${projectPath}/${CONFIG_PATH}`
        );
        const userAnswer = await prompt.ask(["MarketplacePath"]);
        freshLocalConfig.defaultValues.marketplacePath = userAnswer.MarketplacePath;
        freshLocalConfig.defaultValues.pageObjectsPath = `${userAnswer.MarketplacePath}${PAGE_OBJECTS_SUFFIX}`;
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

    try {
        const toolkitPackageJson = JSON.parse(fs.readFileSync(`${TOOLKIT_PATH}/package.json`));
        const themeVersion = toolkitPackageJson.dependencies[`${userThemeAnswer.ThemeTemplates.dependency}`];
        addMetadata({
            themeTemplate: userThemeAnswer.ThemeTemplates.dependency,
            themeVersion,
            createdBy: themeCreatedBy.WhoAreYou,
            createdAt: new Date(),
            customComponents: false,
            sfbThemeComponentsVersion: 'latest'
        }, projectPath);
        
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to save metadata due to: ${err}`)); 
    }

    console.log(chalk.green(` Theme location: ${projectPath}/`))
    console.log(chalk.green(` Configuration file location: ${projectPath}/config/`))
    console.log(chalk.green(`\n All done! You can start your server by running \`sfb-toolkit start\` inside the project root folder: ${projectPath}\n`));
})();
