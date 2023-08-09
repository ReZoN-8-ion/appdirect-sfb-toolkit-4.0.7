const toolkitAssetsPath = "/sfb-toolkit-assets"

const themeAssetsPath = (currentPath, theme) =>
  `${currentPath}/themes/${theme}/assets`

module.exports = { toolkitAssetsPath, themeAssetsPath }
