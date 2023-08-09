const fs = require("fs")
const prompt = require("./prompt-questions");
const chalk = require("chalk");

const { shouldBeProjectFolder } = require("./toolkit-common-fun");
const { PAGE_OBJECTS_SUFFIX } = require("./toolkit-common-vars");
const { LOCAL_CONFIG } = require("./toolkit-config");

shouldBeProjectFolder(true);

(async () => {
    let newConfig = {};
    try {
        const projectData = LOCAL_CONFIG.read();
        const currentNamespace = projectData.namespaces.find( namespace => namespace.themeName === projectData.current);
        const otherNamespaces = projectData.namespaces.filter( namespace => namespace.themeName !== projectData.current);
        console.log(`\n Update configuration for ${projectData.current.yellow}:`)
        const userAnswer = await prompt.ask(["MarketplacePath"], [{name:"MarketplacePath", default: currentNamespace.marketplacePath}]);
        const updatedNamespace = {
            ...currentNamespace,
            marketplacePath: userAnswer.MarketplacePath,
            pageObjectsPath: `${userAnswer.MarketplacePath}${PAGE_OBJECTS_SUFFIX}`
        };
        newConfig = {
            ...projectData,
            namespaces: [
                ...otherNamespaces,
                updatedNamespace
            ]
        }
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to find configuration file.\n`));
        process.exit(1);
    }
    try{
        LOCAL_CONFIG.save(newConfig);
    } catch (err) {
        console.error(chalk.red(`\n ERROR: Unable to save config file due to: \n  ${err}`));
        process.exit(1);
    }
    try {
        LOCAL_CONFIG.configFileUpdate();
    } catch (err) {
        console.error(chalk.red(` ERROR: Unable to update configuration to ${newConfig.current} due to: ${err}`));
        process.exit(1);
    }
    console.log(chalk.green(`\n Configuration for ${newConfig.current.yellow} updated.\n`));
})();