var webpack = require('webpack'),
    config = require('./'),
    glob = require("glob");

module.exports = {
    context: config.vendorBundleDir,
    plugins: process.env !== 'production' ? [] : [
      new webpack.optimize.UglifyJsPlugin()
    ],
    entry: './vendor.js',
    output: {
      path: config.destDirectory,
      filename: 'vendor.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
