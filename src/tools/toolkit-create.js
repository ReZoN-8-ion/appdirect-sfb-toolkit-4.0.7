const fs = require("fs");
const { copy, remove } = require("fs-extra");
const { spawn } = require("child_process");
const prompt = require("./prompt-questions");
const chalk = require("chalk");

const { CURRENT_PATH, TOOLKIT_PATH, COMMAND_PARAM, COMPILERCSS_PATH,
    PAGE_OBJECTS_SUFFIX, ACTIVE_THEME_PATH } = require("./toolkit-common-vars");
const { shouldBeProjectFolder, getAvailableFolderWithPrompt, createCustomThemePacakgeJson, addMetadata } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");

shouldBeProjectFolder(true);

(async () => {
    let themesPath = `${CURRENT_PATH}/themes/`; // by default 
    let themeName = COMMAND_PARAM;
    let userThemeAnswer
    const themeCreatedBy = await prompt.ask(["WhoAreYou"]);


    try {
        userThemeAnswer = await prompt.ask(["ThemeTemplates"]);
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to get the starting point theme ${err}.\n`));
        process.exit(1); 
    }

    try {
        if (!prompt.validateFun.isValidFolderName(themeName)) {
            // if name of the theme was not provided with command, ask for it
            const userAnswer = await prompt.ask(["ThemeName"], [{name:"ThemeName", default: userThemeAnswer.ThemeTemplates.name}]);
            themeName = userAnswer.ThemeName;
        }
        themesPath = await getAvailableFolderWithPrompt(`${CURRENT_PATH}/themes`, themeName, "ThemeName");
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to find configuration file due to: ${err}.\n`));    
    }

    try {
        await copy (
            `${TOOLKIT_PATH}/node_modules/${userThemeAnswer.ThemeTemplates.dependency}`,
            `${themesPath}`
        );
        await remove(
            `${themesPath}/package.json`
        );
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to copy theme's files due to: ${err}`));
        process.exit(1);
    }

    try{
        fs.writeFileSync(
            `${themesPath}/package.json`,
            createCustomThemePacakgeJson(
                themeName,
                userThemeAnswer.ThemeTemplates.dependency,
                themeCreatedBy.WhoAreYou
            )
        );
    } catch(err) {
        console.error(chalk.red(` ERROR: Unable to create ${themeName}'s package.json file.`));
        process.exit(1);
    }

    let newConfig = {};
    try {
        const projectData = LOCAL_CONFIG.read();
        const userAnswer = await prompt.ask(["MarketplacePath"]);
        const newThemeName = themesPath.replace(`${CURRENT_PATH}/themes/`, "");
        const newNamespace = {
            themeName: newThemeName,
            marketplacePath: userAnswer.MarketplacePath,
            pageObjectsPath: `${userAnswer.MarketplacePath}${PAGE_OBJECTS_SUFFIX}`,
        };
        newConfig = {
            ...projectData,
            namespaces: [
                ...projectData.namespaces,
                newNamespace
            ],
            current: newThemeName,
            modified: new Date()
        }
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to save updates due to: ${err}.\n`));    
        process.exit(1);
    }

    try{
        LOCAL_CONFIG.save(newConfig);
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to save config file due to: ${err}`));
        process.exit(1);
    }

    try {
        LOCAL_CONFIG.configFileUpdate();
        console.log(chalk.green(` Context switched to ${newConfig.current}.\n`));
        console.log(chalk.green("\n  ** Please make sure to start or restart server to see changes ** \n"));

    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to switch context to ${newConfig.current} due to: ${err}`));   
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
        })
        
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to save metadata due to: ${err}`)); 
    }
    
    spawn('node', 
        [`"${TOOLKIT_PATH}/${COMPILERCSS_PATH}"`], {
            stdio: "inherit",
            shell: true
        }
    )
})();
