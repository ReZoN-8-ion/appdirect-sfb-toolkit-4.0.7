const fs = require("fs")
const { spawn } = require("child_process")
const chalk = require("chalk")

const { COMMAND_PARAM, TOOLKIT_PATH, COMPILERCSS_PATH } = require("./toolkit-common-vars");
const { shouldBeProjectFolder } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");
const { validateFun } = require("./prompt-questions");
const themeName = COMMAND_PARAM;

// check if user is in correct location
shouldBeProjectFolder(true);

if(!validateFun.isValidFolderName(themeName)){
    console.error(chalk.red(` ERROR: Please provide the theme name to checkout.`));
    process.exit(1);
}

(() => {
    let projectData;
    try {
        projectData = LOCAL_CONFIG.read();
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to find configuration for current project due to: ${err}.\n`))
        process.exit(1);
    }
    const themeExists = projectData.namespaces.filter(namespace => namespace.themeName == themeName).length;
    if(!themeExists){
        console.error(chalk.red(` ERROR: Unable to find theme ${themeName} in current project.`));
        process.exit(1);
    }
    try {
        LOCAL_CONFIG.save({...projectData, current: themeName, modified: new Date()});
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to switch context to ${themeName} due to: ${err}`));   
        process.exit(1);
    }
    try {
        LOCAL_CONFIG.configFileUpdate();
        console.log(chalk.green(` Context switched to ${themeName}.`));
        console.log(chalk.green("\n  ** Please make sure to start or restart server to see changes ** \n"));
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to switch context to ${themeName} due to: ${err}`));   
        process.exit(1);
    }

    spawn('node', 
        [`"${TOOLKIT_PATH}/${COMPILERCSS_PATH}"`], {
            stdio: "inherit",
            shell: true
        }
    )
})();
