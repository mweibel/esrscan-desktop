const webpack = require('webpack');
const config = require('./webpack.config.base');

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    exclude: /(node_modules)/
  }
]);

config.entry.client = config.entry.client.concat([
  'webpack/hot/dev-server'
]);

config.devtool = 'sourcemap';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
  /*new webpack.BannerPlugin('require("source-map-support").install();',
    { raw: true, entryOnly: false })*/
]);

module.exports = config;
