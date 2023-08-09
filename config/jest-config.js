const {
    ACTIVE_THEME_PATH
  } = require("../src/tools/toolkit-common-vars")
const TESTS_CONFIG_PATH = `${ACTIVE_THEME_PATH}/__tests__/config`;
const testsConfig = require(TESTS_CONFIG_PATH);
const rootConfig = require(`${ACTIVE_THEME_PATH}/__tests__/config/${testsConfig.jestConfig}`);

module.exports = {
  ...rootConfig,
  setupFilesAfterEnv: ['./setup-tests.js']
}
