const url = require("url")
const querystring = require("querystring")
const URI = require("urijs")
const _ = require("lodash")

const CONFIGURE_ACTIONS = [
  "CONFIGURE",
  "FREE_CONFIGURE",
  "FREE_TRIAL_CONFIGURE"
]

const parseApplicationName = (name = "") =>
  name
    .replace(/[^a-z0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()

const configureUrlBuilder = (
  localeCode,
  productId,
  applicationName,
  editionId
) =>
  URI("/")
    .segment(localeCode)
    .segment("apps")
    .segment(productId)
    .segment(parseApplicationName(applicationName))
    .segment("configure")
    .query({ editionId })
    .toString()

const filterConfigureAction = (callToAction, applicationName, localeCode) => {
  const getToolkitConfigureUrl = actionUrl => {
    const parsedUrl = url.parse(actionUrl)
    const { productId, editionId } = querystring.parse(parsedUrl.query)
    return configureUrlBuilder(
      localeCode,
      productId,
      applicationName,
      editionId
    )
  }
  const { actionType, url: actionUrl } = callToAction
  if (CONFIGURE_ACTIONS.includes(actionType)) {
    return {
      ...callToAction,
      url: getToolkitConfigureUrl(actionUrl)
    }
  }
  return callToAction
}

const callToActionsFilter = (dataToFilter = {}) => {
  const dataToFilterMod = _.cloneDeep(dataToFilter)
  if (dataToFilter && dataToFilter.application) {
    const {
      config: {
        locale: { code: localeCode }
      },
      application: {
        callToActions: { items: callToActionsItem },
        editions: { items: editions },
        summary: { title: applicationName }
      }
    } = dataToFilterMod
    // eslint-disable-next-line
    callToActionsItem.forEach(function(callToAction, i) {
      this[i] = filterConfigureAction(callToAction, applicationName, localeCode)
    }, callToActionsItem)
    // eslint-disable-next-line
    editions.forEach(function(edition, i) {
      this[i] = {
        ...edition,
        callToAction: filterConfigureAction(
          edition.callToAction,
          applicationName,
          localeCode
        )
      }
    }, editions)
  }
  return dataToFilterMod
}

module.exports = {
  callToActionsFilter
}
