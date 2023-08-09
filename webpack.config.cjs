module.exports = {
  entry: "./src/front-end-utils/toolbar.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
        resolve: {
          fullySpecified: false,
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: `${__dirname}/src/front-end-utils/dist`,
    publicPath: "http://localhost:3555/utils/dist",
    filename: "toolbar.bundle.js"
  }
}
