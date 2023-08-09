const { copy } = require("fs-extra");
const colors = require("colors");
const rimraf = require("rimraf");
const replace = require("replace-in-file");
const prompt = require("./prompt-questions");

const { CURRENT_PATH, TOOLKIT_PATH } = require("./toolkit-common-vars");
const { shouldBeProjectFolder } = require("./toolkit-common-fun");

shouldBeProjectFolder(true);
(async () => {
  // by default

  try {
    const { CreateExtension } = await prompt.ask(["CreateExtension"]);
    const { ExtensionName } = await prompt.ask(["ExtensionName"]);
    const { AppPath } = await prompt.ask(["AppPath"]);
    const { MarketplacePath } = await prompt.ask(["MarketplacePath"]);
    console.log("------------****-----------\n");
    console.log(" ");
    console.log("Please wait while we create your new extension\n".yellow);
    console.log(" ");
    console.log("------------****-----------\n");

    const ExtensionsPath = `${CURRENT_PATH}/extensions/${ExtensionName}`;
    await rimraf.sync(
      `${TOOLKIT_PATH}/node_modules/@appdirect/public-custom-app-ui/node_modules`
    );
    await copy(
      `${TOOLKIT_PATH}/node_modules/@appdirect/public-custom-app-ui`,
      `${ExtensionsPath}`
    );

    const updateWebpackConfig = () => ({
      files: `${ExtensionsPath}/webpack.config.js`,
      from: `microuits`,
      to: `extension_${ExtensionName}`,
    });

    const updatePackagejson = () => ({
      files: `${ExtensionsPath}/package.json`,
      from: `@appdirect/public-custom-app-ui`,
      to: `extension_${ExtensionName}`,
    });

    const updatePackageLockjson = () => ({
      files: `${ExtensionsPath}/npm-shrinkwrap.json`,
      from: `@appdirect/public-custom-app-ui`,
      to: `extension_${ExtensionName}`,
    });

    const updateConfig = () => ({
      files: `${ExtensionsPath}/static/app-dev-config.json`,
      from: `microuits`,
      to: `extension_${ExtensionName}`,
    });

    const updateWebpackConfig2 = () => ({
      files: `${ExtensionsPath}/webpack.config.js`,
      from: `const APPPATH = 'desiredPath';`,
      to: `const APPPATH = '${AppPath}';`,
    });

    const updateWebpackConfig3 = () => ({
      files: `${ExtensionsPath}/webpack.config.js`,
      from: `const developmentMarketplaceDomain = "https://engage19billing.test.devappdirect.me";`,
      to: `const developmentMarketplaceDomain = "${MarketplacePath}";`,
    });

    await replace(updateWebpackConfig());
    await replace(updateWebpackConfig2());
    await replace(updateWebpackConfig3());
    await replace(updatePackagejson());
    await replace(updatePackageLockjson());
    await replace(updateConfig());

    console.log("------------****-----------\n");
    console.log(" ");
    console.log("Your new extension is ready to go!\n".green);
    console.log(
      `You can find your new extension in extensions/${ExtensionName}\n`.green
    );
    console.log(
      `To get started, go into that folder, run the command "npm install && npm start", You can also have a look at our document at https://developer.appdirect.com. \n`
        .green
    );
    console.log(" ");
    console.log("------------****-----------\n");
  } catch (err) {
    console.error(` ERROR: Unable to copy extensions files due to: ${err}`.red);
    process.exit(1);
  }
})();
