const snapstub = require("snapstub")

const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)
const theme = config.theme || "classic"
const themePath = `/themes/${theme}`

const ENDPOINTS = require(`${currentPath}${themePath}/__mocks__/config`)

ENDPOINTS.forEach(endpoint => {
  snapstub.add({
    url: endpoint,
    addOptions: {},
    mockFolderName: `${themePath}/__mocks__`
  })
})