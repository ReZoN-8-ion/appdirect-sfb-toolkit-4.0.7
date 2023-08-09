const path = require("path")
const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)
const storefrontUtils = require("@appdirect/storefront-utils")

let envData = {}
try {
  envData = require(`${currentPath}/themes/${config.theme}/env-data.json`)
} catch (e) {
  envData = {}
}

let themeSettings = {}
try {
  themeSettings = require(`${currentPath}/themes/${config.theme}/settings-schema.json`)
} catch (e) {
  themeSettings = {}
}

const stripTrailingSlash = str => (str.endsWith("/") ? str.slice(0, -1) : str)

const marketplacePath = stripTrailingSlash(config.marketplacePath)
const PAGE_OBJECTS_OVERRIDE = process.env.PAGESOBJECTSPATH

module.exports = (req, res, next) => {
  req.config = {
    ...config,
    themeSettings,
    marketplacePath,
    envData: storefrontUtils.getEnvMarketplaceData(marketplacePath, envData),
    pageObjectsPath: PAGE_OBJECTS_OVERRIDE || config.pageObjectsPath,
    projectPath: `${path.resolve(__dirname)}/../`,
    serviceName: 'sfb-toolkit'
  }
  return next()
}
