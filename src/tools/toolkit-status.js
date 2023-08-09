const fs = require("fs")
const chalk = require("chalk")
const { shouldBeProjectFolder } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");

shouldBeProjectFolder(true);

(() => {
    try {
        const projectData = LOCAL_CONFIG.read();
        console.log(`\n Current configuration for ${projectData.current.yellow}:`)
        projectData.namespaces
            .filter( item => item.themeName === projectData.current )
            .map( namespace => Object.keys(namespace).map( param => param != 'themeName' && console.log(`  ${param}: ${namespace[param].yellow}`)));
        console.log(`\n To make changes in ${projectData.current.yellow} theme configuration, run \`sfb-toolkit update\`\n`);
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to find configuration file.\n`));
    }
})();