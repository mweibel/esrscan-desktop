const webpack = require('webpack');
const config = require('./config.base');

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
]);

module.exports = config;
