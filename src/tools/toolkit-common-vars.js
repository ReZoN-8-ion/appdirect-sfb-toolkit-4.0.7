const fs = require("fs")

const CURRENT_PATH = process.cwd() // used to get current dev folder
const toolkitNameSuffix = process.argv[1].indexOf("-private") < 0 ? "" : "-private";
const TOOLKIT_PATH = `${__dirname}/../..`.replace(/sfb-toolkit(.)+/gi, `sfb-toolkit${toolkitNameSuffix}`); // get toolkit location path
const COMMAND_PARAM = process.argv[2];
const BOOTSTRAP_FOLDERS = ["config", "theme-zips", "themes", "theme-logs"]; // what folders to create
const BOOTSTRAP_FILES = ["config", "themes", ".sfbconfig"]; // what files to check if it's project's folder
const CONFIG_PATH = "config/index.js";
const COMPILERCSS_PATH = "src/tools/compiler-css.js"

const TOOLKIT_GLOBAL_CONFIG_PATH = `${TOOLKIT_PATH}/src/tools/.sfbconfig`;
const TOOLKIT_GLOBAL_CONFIG = JSON.parse(fs.readFileSync(TOOLKIT_GLOBAL_CONFIG_PATH));
const THEME_TEMPLATES_CONFIG_PATH = `${TOOLKIT_PATH}/themes-config.json`;
const THEME_TEMPLATES = JSON.parse(fs.readFileSync(THEME_TEMPLATES_CONFIG_PATH));
const PAGE_OBJECTS_SUFFIX = "/api/internal/storefront/v1";
const THEME_COMPONENT_MODULE = "@appdirect/sfb-theme-components";
const THEME_COMPONENT_VERSION = "0.0.331";
const SASS_MODULE = "sass";
const SASS_VERSION = "1.57.1";
const SASS_LOADER_MODULE = "sass-loader";
const SASS_LOADER_VERSION = "13.2.0";

let WORKSPACE_CONFIG;
try {
    WORKSPACE_CONFIG = require(`${CURRENT_PATH}/config`);
} catch (e) {
    WORKSPACE_CONFIG = {}
}
const ACTIVE_THEME = WORKSPACE_CONFIG.theme || "classic";
const ACTIVE_THEME_PATH = `${CURRENT_PATH}/themes/${ACTIVE_THEME}`;
const THEME_LOGS_PATH = `${CURRENT_PATH}/theme-logs`;
const THEME_LOGS_FILE_PATH = `${THEME_LOGS_PATH}/${ACTIVE_THEME}`;

const WHO_ARE_YOU_PROMPT = [
    { "name": "customer" },
    { "name": "AppDirect DTS" },
    { "name": "external dev" }
]

const EXTENSION_PROMPT = [
  { name: "Blank Extension" },
  { name: "DataGrid Boilerplate" },
  { name: "Dashboard Boilerplate" }
]

module.exports = {
    TOOLKIT_GLOBAL_CONFIG,
    BOOTSTRAP_FOLDERS,
    BOOTSTRAP_FILES,
    PAGE_OBJECTS_SUFFIX,
    COMMAND_PARAM,
    CURRENT_PATH,
    TOOLKIT_PATH,
    COMPILERCSS_PATH,
    CONFIG_PATH,
    WORKSPACE_CONFIG,
    ACTIVE_THEME,
    ACTIVE_THEME_PATH,
    THEME_TEMPLATES,
    THEME_COMPONENT_MODULE,
    THEME_COMPONENT_VERSION,
    SASS_MODULE,
    SASS_VERSION,
    SASS_LOADER_MODULE,
    SASS_LOADER_VERSION,
    THEME_LOGS_PATH,
    THEME_LOGS_FILE_PATH,
    WHO_ARE_YOU_PROMPT,
    EXTENSION_PROMPT,
}
