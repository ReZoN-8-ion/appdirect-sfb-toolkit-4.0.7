const fs = require("fs");
const moment = require("moment");
const chalk = require("chalk");

const { shouldBeProjectFolder } = require("./toolkit-common-fun");
const { LOCAL_CONFIG } = require("./toolkit-config");

// check if user is in correct location
shouldBeProjectFolder(true);

(() => {
    try {
        const projectData = LOCAL_CONFIG.read();
        console.log(`\n Available themes for ${projectData.projectName}:`);
        projectData.namespaces
            .map(namespace => {
                let parsedName = namespace.themeName === projectData.current ? `* ${chalk.yellow(namespace.themeName)}` : `  ${namespace.themeName}`;
                console.log(` ${parsedName}`)
            });
        console.log(`\n To switch to a different theme configuration, run \`sfb-toolkit checkout [themeName]\`\n`);
    } catch ( err ) {
        console.error(chalk.red(`\n ERROR: Unable to find configuration for current project due to: ${err}.\n`));
    }
})();
