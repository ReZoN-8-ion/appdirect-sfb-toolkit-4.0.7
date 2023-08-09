const fs = require("fs")
const { CURRENT_PATH, CONFIG_PATH, TOOLKIT_GLOBAL_CONFIG, PAGE_OBJECTS_SUFFIX} = require("./toolkit-common-vars");
const { getThemeConfig } = require("./toolkit-common-fun");
const TOOLKIT_CONFIG_FILENAME = '.sfbconfig';

// reads local toolkit config file (.sfbconfig)
const read = (_dir = CURRENT_PATH) => {
    return JSON.parse(fs.readFileSync(`${_dir}/${TOOLKIT_CONFIG_FILENAME}`))
}

// writes to local toolkit config file (.sfbconfig)
const save = (_newData, _dir = CURRENT_PATH) => {
    let data = JSON.stringify(_newData, null, 2);
    return  fs.writeFileSync(`${_dir}/${TOOLKIT_CONFIG_FILENAME}`, data)
}

// helper to rewrite object to string version of it
const objectToString = obj => Object.keys(obj).map( key => {
    if (Array.isArray(obj[key])) return `\n\t${key}: [${obj[key].map(item => `"${item}"`)}]`;
    return `\n\t${key}: "${obj[key]}"`
});

// builds config/index.js file in the JS module style
const buildConfigFile = configObj => `"use strict"\n\nconst config = {${objectToString(configObj)}\n}\n\nmodule.exports = config`;

// updates config/index.js file to match current local config variables
const configFileUpdate = (_dir = CURRENT_PATH) => {
    const localConfig = read(_dir);
    const currentNamespace = localConfig.namespaces.find( namespace => namespace.themeName === localConfig.current );
    const themeConfig = getThemeConfig(_dir);
    const newConfig = {
        ...themeConfig,
        theme:  currentNamespace.themeName,
        marketplacePath: currentNamespace.marketplacePath,
        pageObjectsPath: `${currentNamespace.marketplacePath}${PAGE_OBJECTS_SUFFIX}`
    }
    return  fs.writeFileSync(`${_dir}/${CONFIG_PATH}`, buildConfigFile(newConfig));
}

module.exports = {
    GLOBAL_CONFIG : TOOLKIT_GLOBAL_CONFIG,
    LOCAL_CONFIG : {
        read,
        save,
        configFileUpdate
    }
}
