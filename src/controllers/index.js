const yaml = require("js-yaml")
const axios = require("axios")
const fs = require("fs")
const objectAssignDeep = require("object-assign-deep")
const storefrontUtils = require("@appdirect/storefront-utils")
const URI = require("urijs")
const { merge } = require("lodash")

const { callToActionsFilter } = require("./data-filters/call-to-actions-filter")
const { bootstrapDataFilter } = require("./data-filters//bootstrap-data-filter")

const { themeAssetsPath, toolkitAssetsPath } = require("../constants/pageUrls")
const buildHeaderAssets = require("./controllers-utils/assetsUtils")

const currentPath = process.cwd()
const API_PATHS = storefrontUtils.pageApi
const userMock = require("../constants/userMock")

const appendClearCartFunction = html => {
  const clearCartJS = `<script>    
    function AD_clearCart() {
      console.warn("Warning: Window function AD_clearCart is only available in toolkit mode and will not exist in production.");
      var url = "/api/checkout/v1/shoppingCarts/storefront/clear";
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log("Your mocked cart has been cleared. You may now refresh the page to see updated cart state.");
        }
      }
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
      xhr.send();
    }
  </script>`
  return html.replace("</body>", `${clearCartJS} </body>`)
}

class Pages {
  constructor({
    req = {
      params: {},
      cookies: {}
    },
    res = {},
    page
  }) {
    this.req = req
    this.sessionId = req.cookies.JSESSIONID
    this.mockRole = req.cookies.mockRole
    this.id = req.params.id
    this.section = req.params.section
    this.customPath = req.params && req.params[0] && req.params[0].split("/")
    this.query = req.query
    this.config = req.config || {}
    this.themeSettings = this.config.themeSettings || {}
    this.res = res
    this.currency = req.cookies.currency
    this.page = page
    this.defaultLocale = "en-US"
    this.locale = req.params && req.params.locale ? req.params.locale : "en-US"
    this.localeCookie = req.cookies["locale-language"]
    this.themePath = `${currentPath}/themes/${this.config.theme}`
    this.envData = this.getEnvDataFile()
    this.layoutEditorSettings = this.getSettingsFile()
    this.headerAssets = buildHeaderAssets(
      this.getAssetNames("images"),
      this.getAssetNames("fonts")
    )

    // like on the monolith side, we check if the user have changed language and we redirect and clear the cookie
    if (this.localeCookie && this.locale !== this.localeCookie) {
      const path = req.originalUrl.replace(this.locale, this.localeCookie)
      res.clearCookie("locale-language")
      res.redirect(path)
    }
  }

  isCustomPage(page) {
    return !!(page === "custom" && this.customPath && this.customPath.length)
  }

  getPage(page) {
    return this.isCustomPage(page) ? this.customPath[0] : page
  }

  redirectToLocalePage() {
    this.getData(this.config, this.page).then(response => {
      const { data = {} } = response
      const currentLocale = data.locale || this.defaultLocale
      const path = this.req.originalUrl === "/" ? "/home" : this.req.originalUrl
      this.res.redirect(`/${currentLocale}${path}`)
    })
  }

  redirectToMarketplacePage() {
    const { marketplacePath } = this.config
    const path = this.req.originalUrl || "/"
    this.res.redirect(`${marketplacePath}${path}`)
  }

  getDataHeaders() {
    const headers = {}
    if (this.sessionId) {
      headers.Cookie = `JSESSIONID=${this.sessionId};`
    }
    return headers
  }

  static filterData(data = {}) {
    return bootstrapDataFilter(callToActionsFilter(data))
  }

  static _isRecoverableBadLinkError(error) {
    return (
      error.status === 400 &&
      error.data &&
      error.data.code === "RECOVERABLE_BAD_LINK" &&
      error.data.link
    )
  }

  getData(pageSettings) {
    return new Promise(resolve => {
      let { page, locale, currency } = this
      if (page === "admin") {
        page = "home"
      }
      const apiURL = API_PATHS[page](
        this.config.marketplacePath,
        this.req.params,
        storefrontUtils.getCustomData(this.pageRawData, {
          ...this.config,
          pageComponents: pageSettings.components,
          envData: storefrontUtils.getEnvMarketplaceData(
            this.config.marketplacePath,
            this.envData
          ),
          currentPage: page
        }),
        storefrontUtils.getQueryData(
          {
            locale,
            currency
          },
          {
            page,
            ...this.req.params
          },
          {
            ...this.req.query,
            crossSellingEnabled: this.themeSettings.crossSellingEnabled
          }
        )
      )
      axios
        .get(apiURL, {
          baseURL: this.config.pageObjectsPath,
          headers: this.getDataHeaders()
        })
        .then(response => {
          const data = Pages.filterData(response.data)
          if (this.mockRole === "USER") {
            data.config.user = userMock
          }
          this.defaultLocale = data.config.defaultLocale || "en-US"
          resolve({
            config: this.config,
            ...data,
            i18n: Object.assign({}, data.i18n, {
              custom: this.getLocalization()
            })
          })
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            const statusCode = error.response.status
            if (
              statusCode &&
              Pages._isRecoverableBadLinkError(error.response)
            ) {
              const uri = URI(error.response.data.link)
              uri.addSearch(this.query)
              this.res.redirect(uri.valueOf())
            }
            console.error(
              `Unable to fetch page data with http status ${statusCode}`
            )
            this.renderErrorPage(statusCode)
          } else {
            const errorCode = error.code
            console.error(
              `Unable to fetch page data with error code ${errorCode}`
            )
            this.renderErrorPage(errorCode)
          }
        })
    })
  }

  getRawTemplates() {
    return storefrontUtils.getDevThemeContent(`${this.themePath}`)
  }

  getEnvDataFile() {
    try {
      return JSON.parse(
        fs.readFileSync(
          `${currentPath}/themes/${this.config.theme}/env-data.json`,
          "utf8"
        )
      )
    } catch (e) {
      console.log("env data not loading")
    }
    return {}
  }

  static getLocaleFile(locale, config) {
    try {
      return yaml.load(
        fs.readFileSync(
          `${currentPath}/themes/${
            config.theme
          }/translations/${locale.toLowerCase()}.yml`,
          "utf8"
        )
      )
    } catch (e) {
      console.log(`localization file ${locale} not found`)
    }
    return {}
  }

  getSettingsFile() {
    try {
      return JSON.parse(
        fs.readFileSync(
          `${currentPath}/themes/${this.config.theme}/settings.json`,
          "utf8"
        )
      )
    } catch (e) {
      // commented for 2.0.1 release.
      // console.log("settings not loading")
    }
    return {}
  }

  getAssetNames(assetType) {
    const assetPath = `${themeAssetsPath(
      currentPath,
      this.config.theme
    )}/${assetType}`
    try {
      return fs.readdirSync(assetPath)
    } catch (e) {
      console.log(
        `Failed to load assets of type "${assetType}" at "${assetPath}".`
      )
    }
    return []
  }

  getLocalization() {
    const localization = this.constructor.getLocaleFile(
      this.locale,
      this.config
    )
    const defaultLocalization =
      this.locale !== this.defaultLocale
        ? this.constructor.getLocaleFile(this.defaultLocale, this.config)
        : {}
    return objectAssignDeep({}, defaultLocalization, localization)
  }

  getAssetsMapperFunction() {
    return path => path.replace("/assets/", `${toolkitAssetsPath}/`)
  }

  renderErrorPage(statusCode = "404") {
    // const { params: locale } = req
    const data = {
      config: this.config,
      i18n: Object.assign(
        {},
        {
          custom: this.getLocalization()
        }
      ),
      statusCode
    }
    const rawTemplates = this.getRawTemplates()
    const headerTpl = rawTemplates.headerFooter
    const template = `/pages/error/error.html`
    const assetsMapperFunc = this.getAssetsMapperFunction()
    let staticPage = {}
    storefrontUtils.TplEngine.compile(
      rawTemplates,
      template,
      data,
      assetsMapperFunc
    ).then(html => {
      if (html) {
        staticPage = new storefrontUtils.StaticContent(html, data)
          .addGlobalString()
          .addUnavDefaultContent(headerTpl)
          .addDataStore()
          .addToolbar()
          .addPageReload401()
      }
      const generatedHTML = staticPage.html || html
      this.res
        .status(statusCode)
        .send(generatedHTML)
        .end()
    })
  }

  getRawMockTemplates(mockedPages) {
    const mockedPageObject = {}
    const mockedPagesPath = `${__dirname}/../../mockPages`
    mockedPages.forEach(folder => {
      try {
        const htmlContent = fs.readFileSync(
          `${mockedPagesPath}/${folder}/${folder}.html`,
          "utf8"
        )
        mockedPageObject[folder] = { [`${folder}.html`]: htmlContent }
      } catch (error) {
        console.error(
          `ERROR: could not find ${folder}.html in ${mockedPagesPath}/${folder}`
        )
      }
    })
    return mockedPageObject
  }

  getFile(isMockedPage, rawTemplates) {
    if (isMockedPage) {
      return `${this.page}/${this.page}.html`
    }
    return storefrontUtils.findPage(rawTemplates, {}, this)
  }

  render() {
    // const { params: locale } = req
    const mockedPages = fs.readdirSync(`${__dirname}/../../mockPages`)
    const rawMockTemplates = this.getRawMockTemplates(mockedPages)
    let rawTemplates = this.getRawTemplates()
    rawTemplates = { ...rawTemplates, ...rawMockTemplates }
    const assetsMapperFunc = this.getAssetsMapperFunction()
    const pageSettings = this.layoutEditorSettings.pages
      ? this.layoutEditorSettings.pages[this.getPage(this.page)] || {}
      : {}
    const defaultGlobalStyles = {
      namespaces: {
        storefront: {}
      }
    }
    const globalStyles = merge(
      defaultGlobalStyles,
      this.layoutEditorSettings.globalStyles
    )

    const headerTpl = rawTemplates.headerFooter
    let staticPage = {}
    const isMockedPage = mockedPages.includes(this.page)
    let file = this.getFile(isMockedPage, rawTemplates)

    if (file) {
      let template = isMockedPage ? `/${file}` : `/pages/${file}`
      this.pageRawData = storefrontUtils.getNestedProperties(
        rawTemplates.pages,
        file.split("/")
      )
      const updateTemplateWithPageData = data => {
        if (this.page === "profile") {
          file = storefrontUtils.findPage(
            rawTemplates,
            data,
            this,
            undefined,
            this.themeSettings
          )
          template = `/pages/${file}`
        }
      }

      this.getData(pageSettings).then(data => {
        // Now we have data for the product, we determine if we need to use a specific page for the product type.
        updateTemplateWithPageData(data)
        storefrontUtils.TplEngine.compile(
          rawTemplates,
          template,
          data,
          assetsMapperFunc
        ).then(html => {
          if (html) {
            staticPage = new storefrontUtils.StaticContent(
              html,
              data,
              this.page
            )
              .overrideDefaultStrings()
              .addDataStore()
              .addGlobalString()
              .addUnavDefaultContent(headerTpl)
              .addToolkitComponents(
                html,
                this.themePath,
                this.config.marketplacePath,
                this.themeSettings[
                  storefrontUtils.themeSettingsKeys.USE_COMPONENT
                ],
                this.layoutEditorSettings,
                this.getLocalization()
              )
              .addToolbar()
              .addLazyLoad()
              .addPageReload401()
              .addDevUniversalHeader(this.headerAssets, html)
              .addChangeCurrency()
              .addCart({ userId: 117 })
              .addGlobalStyling(globalStyles)
              .addFonts(globalStyles)

            staticPage.html = appendClearCartFunction(staticPage.html)
          }
          const generatedHTML = staticPage.html || html
          this.res.send(generatedHTML)
        })
      })
    } else {
      this.renderErrorPage(404)
    }
  }
}

module.exports = Pages
