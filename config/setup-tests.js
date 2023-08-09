const {
    ACTIVE_THEME_PATH
} = require("../src/tools/toolkit-common-vars");
const puppeteer = require("puppeteer");

const execSetup = require(`${ACTIVE_THEME_PATH}/__tests__/config/setup-tests`);

const keysToMap = ["HEADLESS"];

const envOptions = keysToMap.map( option => typeof process.env[option] !== 'undefined' ? { [option] : process.env[option] } : {} )
const options = envOptions.reduce( (acc, curr) => ({ ...acc, ...curr}) );

execSetup(puppeteer, options);