var webpack = require("webpack");
var path = require("path");

process.noDeprecation = true

module.exports = {
  entry: "./server-render-recipes/index-client.js",
  output: {
    path: path.join(__dirname, 'server-render-recipes', 'assets'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react']
        }
      }
    ]
  }
}
