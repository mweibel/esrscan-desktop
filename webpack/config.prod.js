const fs = require('fs')
const webpack = require('webpack')
const config = require('./config.base')

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /(node_modules)/
  }
])

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true // eslint-disable-line camelcase
    }
  })
])

// thx http://jlongster.com/Backend-Apps-with-Webpack--Part-I :
config.externals = {}
fs.readdirSync('node_modules')
  .filter((module) => module !== '.bin')
  .forEach((module) => config.externals[module] = 'commonjs ' + module)

module.exports = config
