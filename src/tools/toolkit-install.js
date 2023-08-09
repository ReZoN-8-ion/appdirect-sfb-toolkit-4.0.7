const fs = require("fs-extra");
const chalk = require("chalk");
const { shouldBeProjectFolder, createPackageJson, updateCustomComponentsMetadata } = require("./toolkit-common-fun");
const { spawn } = require("child_process");
const { COMMAND_PARAM, ACTIVE_THEME_PATH } = require("./toolkit-common-vars");

const npmModule = COMMAND_PARAM;

shouldBeProjectFolder(true);
if(npmModule === 'undefined'){
    console.error(chalk.red(` ERROR: Please provide the npm module to install.`));
    process.exit(1);
}

(() => {
    createPackageJson();
    
    spawn('npm',
        [`install --save ${npmModule} --production`], {
            cwd: ACTIVE_THEME_PATH,
            stdio: "inherit",
            shell: true
        }
    ).on('exit', () => {
        if (npmModule.includes('@appdirect/sfb-theme-components')) {
            const baseFilePath = `${ACTIVE_THEME_PATH}/content/layout/base.html`;
            const customComponentsPath = `${ACTIVE_THEME_PATH}/customComponents`
            const customComponentsEnabled = fs.existsSync(customComponentsPath);
    
            if (customComponentsEnabled) {
                fs.readFile(baseFilePath, 'utf8', (err, data) => {
                    if (err) return console.error(chalk.red(` ERROR: Unable to read the base layout file. Tried: ${baseFilePath}`));
                    const updatedMetadata = updateCustomComponentsMetadata(data);
                    fs.writeFile(baseFilePath, updatedMetadata, (err) => {
                        if (err) return console.error(chalk.red(` ERROR: Unable to update metadata due to: ${err}.`));
                    });
                });
            };
        };
    });

})();