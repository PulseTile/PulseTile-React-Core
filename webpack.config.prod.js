const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(sourcePath, 'index.html'),
  filename: path.resolve(buildPath, 'index.html'),
  inject: 'body',
})

module.exports = {
  devtool: 'source-map',

  entry: {
    app: path.resolve(sourcePath, 'index.js'),
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [HtmlWebpackPluginConfig],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
