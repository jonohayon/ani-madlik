// Moduels
const path = require('path');
const webpack = require('webpack');

// Variables
const port = 6565;
const host = '127.0.0.1';
const srcPath = path.join(__dirname, 'src');

// The config itself
module.exports = {
  entry: {
    app: './src/main.jsx'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    contentBase: './src',
    publicPath: '/dist/',
    hot: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true,
    port,
    host
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: `${srcPath}/components`,
      stores: `${srcPath}/stores`,
      assets: `${srcPath}/assets`
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
      keys: path.join(__dirname, 'api-key.js')
    })
  ]
};
