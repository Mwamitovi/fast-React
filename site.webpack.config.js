var webpack = require("webpack");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var path = require("path");

process.noDeprecation = true

module.exports = {
  entry: "./company-website/src/index.js",
  output: {
    path: path.join(__dirname, 'company-website/dist', 'assets'),
    filename: "bundle.js",
    publicPath: "assets",
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  devServer: {
    inline: true,
    contentBase: './company-website/dist',
    port: 3000
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }]
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [require('autoprefixer')]
          }
        }, 'sass-loader']
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
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}
