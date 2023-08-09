const fs = require("fs-extra")
const chalk = require("chalk")
const { shouldBeProjectFolder, installSfbThemeComponents,
    createPackageJson, updateCustomComponentsMetadata, installSass } = require("./toolkit-common-fun");
const { ACTIVE_THEME_PATH, TOOLKIT_PATH } = require("./toolkit-common-vars");

shouldBeProjectFolder(true);

const addCustomCompToBase = (baseFilePath, data) => {
    fs.writeFile(baseFilePath, data, (err) => {
            if (err) return console.error(chalk.red(' ERROR: Unable to perform update to use custom components.'));
            console.log(chalk.green('Successfully installed custom components!\nPlease start/restart the toolkit server to observe the changes.'));
            console.log(chalk.green('\n\nFor custom components documentation please execute the following command:'))
            console.log(chalk.cyan('sfb-toolkit storybook\n'))
        });
}

const settingsSchemaData = `{ "useComponents": true }`;

(() => {
    const baseFilePath = `${ACTIVE_THEME_PATH}/content/layout/base.html`;
    const customComponentsPath = `${ACTIVE_THEME_PATH}/customComponents`
    const customComponentsEnabled = fs.existsSync(customComponentsPath);

    createPackageJson();

    installSfbThemeComponents();

    installSass();

    if(!fs.existsSync(`${ACTIVE_THEME_PATH}/settings-schema.json`)) {
        fs.writeFile(`${ACTIVE_THEME_PATH}/settings-schema.json`, settingsSchemaData, (err) => {
            if (err) return console.error(chalk.red(' ERROR: Unable to create settings-schema.json file.'));
        })
    }

    if (!customComponentsEnabled) {
        try {
            fs.copySync(`${TOOLKIT_PATH}/customComponents`, customComponentsPath)
        } catch (error) {
            return console.error(chalk.red(`  ERROR: Unable to copy required files\n  ${error}`));
        }
    }
    
    fs.readFile(baseFilePath, 'utf8', (err, data) => {
        if (err) return console.error(chalk.red(` ERROR: Unable to read the base layout file. Tried: ${baseFilePath}`));

        const cdnComponents = data.match(/\S+.+channelCanonicalBaseUrl.+(css|js).+/g);
        const assetsComponents = data.match(/\S+.+r\(.+assets.+sfb-components.+(css|js).+/g);
        const splitBundles = data.match(/componentsBundles\(config\)/g);

        if (cdnComponents !== null) {
            data = data.replace(/\S+.+channelCanonicalBaseUrl.+css.+/, 
                '<link rel="stylesheet" type="text/css" href="{{ r("/assets/js/components/sfb-components.css") }}">')

            data = data.replace(/\S+.+channelCanonicalBaseUrl.+js.+/, 
                '<script src="{{ r("/assets/js/components/sfb-components.js") }}"></script>')
            
            data = updateCustomComponentsMetadata(data);
            
            addCustomCompToBase(baseFilePath, data);

        } else if (splitBundles !== null) {
            data = data.replace('componentsBundles(config)', 'customComponentsBundles(config)');

            data = updateCustomComponentsMetadata(data);

            addCustomCompToBase(baseFilePath, data);
        } else if (assetsComponents === null) {
            data = updateCustomComponentsMetadata(data);

            const headElemIndex = data.indexOf('</head>');
            const output = data.substring(0, headElemIndex) 
                + '  <link rel="stylesheet" type="text/css" href="{{ r("/assets/js/components/sfb-components.css") }}">\n'
                + '  <script src="{{ r("/assets/js/components/sfb-components.js") }}"></script>\n'
                + data.substring(headElemIndex);
            

            addCustomCompToBase(baseFilePath, output);

        } else {
            console.log(chalk.green('Theme is already setup to use custom components.'))
            console.log(chalk.green('\n\nFor custom components documentation please execute the following command:'))
            console.log(chalk.cyan('sfb-toolkit storybook\n'))
        }
    })
})();