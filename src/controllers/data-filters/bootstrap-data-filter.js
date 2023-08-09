const bootstrapDataFilter = (dataToFilter = {}) => {
  const dataToFilterMod = { ...dataToFilter }
  if (dataToFilter && dataToFilter.meta) {
    dataToFilterMod.meta = Object.keys(dataToFilterMod.meta).reduce(
      (accum, current) => {
        const currentMetaObj = accum
        // bootstrap data should not be exposed - return without copying over data
        if (current === "bootstrap") {
          return currentMetaObj
        }
        currentMetaObj[current] = dataToFilterMod.meta[current]
        return currentMetaObj
      },
      {}
    )
  }
  return dataToFilterMod
}

module.exports = {
  bootstrapDataFilter
}
