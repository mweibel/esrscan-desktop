const electronRenderer = require('webpack-target-electron-renderer');

var config = require('./webpack.config.dev.js');
if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.config.prod.js');
}
config.target = electronRenderer(config);

module.exports = config;
