const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    client: ['./src/frontend/index.js']
  },

  output: {
    path: './dist',
    filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.scss']
  },

  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};
