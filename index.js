const express = require("express")
const webpack = require("webpack")
const fs = require("fs")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { sep } = require("path")
const { pathToFileURL } = require("url")
const configWebpack = require("./webpack.config.cjs")
const routes = require("./src/routes")
const configMiddleware = require("./src/middlewares/config")
const getConfigComponentsWebpack = require("./webpack-components.config.cjs")

const {
  toolkitAssetsPath,
  themeAssetsPath
} = require("./src/constants/pageUrls")

const currentPath = process.cwd() // used to get current dev folder
const config = require(`${currentPath}/config`)

const app = express()
if (process.env.RUN_ENV === "dev") {
  const compiler = webpack(configWebpack)
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: configWebpack.output.publicPath,
      stats: { colors: true }
    })
  )
}

if (fs.existsSync(`${currentPath}/themes/${config.theme}/customComponents`)) {
  // This is a workaround for SASS bug:
  // https://github.com/dart-lang/sdk/issues/27979
  // which manifests itself sometimes when webpack dev middleware is used
  // (in dev mode), and app modules are imported in some unfortunate ways.
  if (!global.location) {
    global.location = {
      href: `${pathToFileURL(process.cwd()).href}${sep}`
    }
  }
  const configComponentsWebpackAsset = getConfigComponentsWebpack(
    currentPath,
    config,
    true
  )
  const compilerComponentsAsset = webpack(configComponentsWebpackAsset)
  app.use(
    webpackDevMiddleware(compilerComponentsAsset, {
      publicPath: configComponentsWebpackAsset.output.publicPath,
      writeToDisk: true,
      stats: { colors: true }
    })
  )
  app.use(
    webpackHotMiddleware(compilerComponentsAsset, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  )
}

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const assetsPath = toolkitAssetsPath
const utilsPath = `${__dirname}/src/front-end-utils`
app.use(express.static(`${__dirname}/mockPages/admin/css`))
app.use(express.static(`${__dirname}/mockPages/admin/images`))
app.use(assetsPath, express.static(themeAssetsPath(currentPath, config.theme)))
app.use(
  "/sfb-theme-components",
  express.static(`${__dirname}/node_modules/sfb-theme-components/dist/`)
)
app.use("/utils", express.static(utilsPath))
app.use(cookieParser())
app.use(bodyParser.json())
//  Connect all our routes to our application
app.use(configMiddleware)
app.use("/", routes)
const server = app.listen(3555, () =>
  console.log(
    "AppDirect Toolkit is running, you can view your storefront preview at: http://localhost:3555/en-US/home"
  )
)
server.on("error", err => {
  switch (err.errno) {
    case "EADDRINUSE":
      return console.log(
        `Error (${err.errno}):\n  Port 3555 is already in use.\n  The previous server instance might not have been terminated correctly.\n  Make sure the previous sfb-toolkit instance is properly terminated and enter \`rs\` to restart the current instance.`
          .red
      )
    default:
      return console.log(`Error (${err.errno}): Please try again.`.red, err)
  }
})
