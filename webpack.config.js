var webpack = require("webpack");
var path = require("path");

process.noDeprecation = true

module.exports = {
  entry: "./color-organizer-react-redux/src/index.js",
  output: {
      path: path.join(__dirname, 'color-organizer-react-redux/dist', 'assets'),
      filename: "bundle.js",
      sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                  presets: ['env', 'stage-0', 'react']
              }
          },
          {
              test: /\.css$/,
              use: ['style-loader','css-loader', {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [require('autoprefixer')]
                  }}]
          },
          {
              test: /\.scss/,
              use: ['style-loader','css-loader', {
                  loader: 'postcss-loader',
                  options: {
                    plugins: () => [require('autoprefixer')]
                  }}, 'sass-loader']
          }          
      ]
  },
  plugins: [
      new webpack.DefinePlugin({
          "process.env": {
            //   NODE_ENV: JSON.stringify("production")
              NODE_ENV: JSON.stringify("development")
          }
      }),

      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          warnings: false,
          mangle: false
      })
  ]
}
