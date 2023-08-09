const fs = require("fs-extra");
const chalk = require("chalk");
const { shouldBeProjectFolder, installSfbThemeComponents, createPackageJson } = require("./toolkit-common-fun");
const { spawnSync } = require("child_process");
const { ACTIVE_THEME_PATH, THEME_LOGS_FILE_PATH } = require("./toolkit-common-vars");

shouldBeProjectFolder(true);
const storybookDependencies = [
    "@babel/core@7.19.0",
    "@babel/plugin-proposal-class-properties@7.13.0",
    "@babel/preset-env@7.19.0",
    "@storybook/addon-actions@6.3.1",
    "@storybook/addon-essentials@6.2.9",
    "@storybook/addon-knobs@6.2.9",
    "@storybook/addon-links@6.2.9",
    "@storybook/addon-a11y@6.3.1",
    "@storybook/addon-docs@6.3.1",
    "@storybook/react@6.3.1",
    "babel-loader@8.2.5",
    "core-js@3.12.1",
    "preset-react@1.0.0",
    "react@16.14.0",
    "react-content-loader@5.1.4",
    "react-dom@16.14.0",
    "sass@1.32.12",
    "sass-loader@10.3.1"
].join(' ');

const storybookModule = "@storybook/react";

(() => {    
    createPackageJson();

    installSfbThemeComponents();
    
    // check if .storybook is part of the @appdirect/sfb-theme-components module
    if(!fs.existsSync(`${ACTIVE_THEME_PATH}/node_modules/@appdirect/sfb-theme-components/.storybook`)) {
        return console.log(chalk.red("ERROR: missing storybook support, please update to the latest version by executing the following command:\n sfb-toolkit install @appdirect/sfb-theme-components@latest"));
    }

    // check if storybook module is installed otherwise install storybook dependencies
    spawnSync('npm',
    [`ls ${storybookModule} 2>&1 | (findstr ${storybookModule} || grep ${storybookModule}) > ${THEME_LOGS_FILE_PATH} 2>&1 || npm i -S ${storybookDependencies} --legacy-peer-deps --production`], {
        cwd: ACTIVE_THEME_PATH,
        stdio: "inherit",
        shell: true
    })    

    spawnSync('npx',
    ['start-storybook -p 6099 -c node_modules/@appdirect/sfb-theme-components/.storybook/ -s node_modules/@appdirect/sfb-theme-components/docs/images --loglevel silent'], {
        cwd: ACTIVE_THEME_PATH,
        stdio: "inherit",
        shell: true
    })

})();