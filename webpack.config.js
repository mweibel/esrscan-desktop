const electronRenderer = require('webpack-target-electron-renderer')

var config
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack/config.prod.js')
} else {
  config = require('./webpack/config.dev.js')
}
config.target = electronRenderer(config)

module.exports = config
