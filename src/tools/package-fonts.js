const fs = require("fs")
const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)

const theme = config.theme || "classic"
const themeRootDirectory = `${currentPath}/themes/${theme}`
const fontFilePathWithoutExtention = `${themeRootDirectory}/header-footer/header`
const { supportedFontExtensions } = config

const possibleFontFilePaths = supportedFontExtensions.map(supportedFontExtension =>
    `${fontFilePathWithoutExtention}.${supportedFontExtension}`
)

const fontFilePath = possibleFontFilePaths.find(possibleFontFilePath =>
  fs.existsSync(possibleFontFilePath)
)

if (!fontFilePath) {
  // no font found, nothing to process
  process.exit()
}

const designPropertiesFile = `${themeRootDirectory}/design-properties.json`

const getDesignPropertiesContent = designPropertiesFilePath => {
  if (fs.existsSync(designPropertiesFilePath)) {
    const designPropertiesString = fs.readFileSync(designPropertiesFilePath)
    return JSON.parse(designPropertiesString)
  }
  return {}
}

const designPropertiesJSON = getDesignPropertiesContent(designPropertiesFile)

const fontData = fs.readFileSync(fontFilePath)
const encodingType = "base64"
const fontBase64 = Buffer.from(fontData).toString(encodingType)

const headerFontFieldName = "customheaderfont"

designPropertiesJSON[headerFontFieldName] = fontBase64

const newDesignPropertiesJSON = JSON.stringify(designPropertiesJSON, null, 2)

fs.writeFileSync(designPropertiesFile, newDesignPropertiesJSON)
