const webpack = require("webpack")
const fs = require("fs")
const fsExtra = require("fs-extra")
const { TOOLKIT_PATH } = require("./toolkit-common-vars")

const getConfigComponentsProdWebpack = require(`${TOOLKIT_PATH}/webpack-components.config.prod.cjs`)
const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)
const customComponentsAssets = `${currentPath}/themes/${
  config.theme
}/assets/js/components`

if (fs.existsSync(customComponentsAssets)) {
  // Remove unnecessary hot directory for the webpack hot module reload
  fsExtra.remove(`${customComponentsAssets}/hot`, fsError => {
    if (fsError) {
      console.error(fsError)
    }

    const configComponentsWebpackAsset = getConfigComponentsProdWebpack(
      currentPath,
      config
    )
    webpack(configComponentsWebpackAsset, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.hasErrors())
      }
    })
  })
}
