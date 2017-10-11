const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(sourcePath, 'index.html'),
  filename: path.resolve(buildPath, 'index.html'),
  inject: 'body',
});

const DEV_SERVER_URL = 'http://46.101.95.245';
// const DEV_SERVER_URL = 'https://securedev.ripple.foundation';

module.exports = {
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    path.resolve(sourcePath, 'index.js'),
  ],

  output: {
    path: path.resolve(buildPath),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    HtmlWebpackPluginConfig,

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new ExtractTextPlugin('styles.css'),

    // new BundleAnalyzerPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
        }),
      },
    ],
  },

  devServer: {
    host: 'localhost',
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true,
    // enable HMR on the server

    proxy: {
      '/': {
        target: DEV_SERVER_URL,
        // secure: false,
      },
    },
  },

};
