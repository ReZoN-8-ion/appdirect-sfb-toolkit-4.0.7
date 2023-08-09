const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (currentPath, config, isAsset) => {
  const assetPath = path.resolve(
    currentPath,
    `themes/${config.theme}/assets/js/components`
  )
  const libPath = path.resolve(
    currentPath,
    `themes/${config.theme}/components/lib`
  )

  return {
    entry: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
      path.resolve(
        currentPath,
        `themes/${config.theme}/customComponents/index.js`
      )
    ],
    mode: "development",
    output: {
      library: "__ADComponents",
      libraryTarget: "var",
      filename: "sfb-components.js",
      path: isAsset ? assetPath : libPath,
      publicPath: `http://localhost:3555/sfb-toolkit-assets/js/components/`,
      hotUpdateChunkFilename: "hot/hot-update.js",
      hotUpdateMainFilename: "hot/hot-update.json"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "sfb-components.css"
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                require.resolve("@babel/preset-env"),
                require.resolve("@babel/preset-react")
              ],
              plugins: [
                require.resolve("@babel/plugin-proposal-class-properties"),
                require.resolve("@babel/plugin-transform-runtime")
              ],
              include: [
                path.resolve(
                  currentPath,
                  `themes/${config.theme}/customComponents`
                ),
                path.resolve(
                  currentPath,
                  `themes/${config.theme}/node_modules/@appdirect/sfb-theme-components`
                )
              ]
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        },
        {
          test: /\.(png|gif|jpg|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 50000
            }
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        }
      ]
    },
    resolve: {
      modules: [
        path.resolve(currentPath, "node_modules"),
        path.resolve(__dirname, "node_modules"),
        path.resolve(currentPath, `themes/${config.theme}/node_modules`)
      ],
      extensions: [
        ".scss",
        ".js",
        ".jsx",
        ".json",
        ".png",
        ".gif",
        ".jpg",
        ".svg"
      ]
    },
    resolveLoader: {
      modules: [
        path.resolve(currentPath, "node_modules"),
        path.resolve(__dirname, "node_modules"),
        path.resolve(currentPath, `themes/${config.theme}/node_modules`)
      ]
    }
  }
}
