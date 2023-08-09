const { toolkitAssetsPath } = require("../../constants/pageUrls")

function buildAssetTypeList(assetType, assetTypeNames) {
  if (!assetTypeNames) {
    return {}
  }
  const assetList = assetTypeNames.reduce((assets, assetName) => {
    const asset = {
      id: assetName,
      url: `${toolkitAssetsPath}/${assetType}/${assetName}`,
      key: ""
    }
    /* eslint-disable no-param-reassign */
    assets[assetName] = asset
    return assets
  }, {})
  return assetList
}

function buildHeaderAssets(imageNames, fontNames) {
  const images = buildAssetTypeList("images", imageNames)
  const fonts = buildAssetTypeList("fonts", fontNames)

  const assets = {
    images,
    fonts
  }
  return assets
}

module.exports = buildHeaderAssets
