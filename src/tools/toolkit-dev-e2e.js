const fs = require("fs-extra")
const { shouldBeProjectFolder } = require("./toolkit-common-fun")
const { ACTIVE_THEME_PATH } = require("./toolkit-common-vars")

shouldBeProjectFolder(true)

const addAssetsToBase = (baseFilePath, data) => {
  fs.writeFile(baseFilePath, data, err => {
    if (err)
      return console.error(
        " ERROR: Unable to perform update to add local sfb-components assets."
          .red
      )
    console.log(
      "Successfully installed update to add local sfb-components assets!\nPlease start/restart the toolkit server to observe the changes."
        .green
    )
  })
}

const settingsSchemaData = `{ "useComponents": true }`
;(() => {
  const baseFilePath = `${ACTIVE_THEME_PATH}/content/layout/base.html`

  if (!fs.existsSync(`${ACTIVE_THEME_PATH}/settings-schema.json`)) {
    fs.writeFile(
      `${ACTIVE_THEME_PATH}/settings-schema.json`,
      settingsSchemaData,
      err => {
        if (err)
          return console.error(
            " ERROR: Unable to create settings-schema.json file.".red
          )
      }
    )
  }

  fs.readFile(baseFilePath, "utf8", (err, data) => {
    if (err)
      return console.error(
        ` ERROR: Unable to read the base layout file. Tried: ${baseFilePath}`
          .red
      )

    const cdnComponents = data.match(
      /\S+.+channelCanonicalBaseUrl.+(css|js).+/g
    )
    const assetsComponents = data.match(
      /\S+.+r\(.+assets.+sfb-components.+(css|js).+/g
    )

    const sfbComponentsLocalBaseUrl = "http://localhost:3444"

    if (cdnComponents !== null) {
      data = data.replace(
        /\S+.+channelCanonicalBaseUrl.+css.+/,
        `<link rel="stylesheet" type="text/css" href="${sfbComponentsLocalBaseUrl}/sfb-components.css">`
      )

      data = data.replace(
        /\S+.+channelCanonicalBaseUrl.+js.+/,
        `<script src="${sfbComponentsLocalBaseUrl}/sfb-components.js"></script>`
      )

      addAssetsToBase(baseFilePath, data)
    } else if (assetsComponents === null) {
      const headElemIndex = data.indexOf("</head>")
      const output =
        `${data.substring(
          0,
          headElemIndex
        )}  <link rel="stylesheet" type="text/css" href="${sfbComponentsLocalBaseUrl}/sfb-components.css">\n` +
        `  <script src="${sfbComponentsLocalBaseUrl}/sfb-components.js"></script>\n${data.substring(
          headElemIndex
        )}`

      addAssetsToBase(baseFilePath, output)
    } else {
      console.log(
        "Theme is already setup to use local sfb-components dev server assets."
          .green
      )
    }
  })
})()
