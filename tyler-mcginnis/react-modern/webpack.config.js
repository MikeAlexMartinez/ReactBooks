const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  mode: "development",
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'},
      {test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.mode = process.env.NODE_ENV;
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UglifyJsPlugin()
  )
}

module.exports = config;