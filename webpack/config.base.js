const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    client: ['./src/frontend/index.js']
  },

  output: {
    path: './app/out',
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
      },
      {
        test: /\.(woff2?|eot|svg|ttf|otf)([\?]?.*)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.scss', '.woff', '.woff2', '.eot', '.svg', '.ttf', '.otf']
  },

  plugins: [
    new ExtractTextPlugin('app.css')
  ]
}
