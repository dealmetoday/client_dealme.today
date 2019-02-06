"use strict";
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const common = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets:['react']
        }
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new MinifyPlugin({},{})
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  }
};

let config;
let env = process.env.NODE_ENV;

switch(env.trim()) {
  case 'production':
    config = merge(
        common,
        { devtool: "cheap-module-source-map" },
        {
          plugins: [
            plugins.loaderOptions,
            plugins.environmentVariables,
            //plugins.uglifyJs,
            plugins.manifest, // Add the manifest plugin
            plugins.sw,
            plugins.copy
          ],
        },
    );
    break;
 case 'development':
    config = merge(
        common,
        { devtool: 'eval-source-map' },
        loaders.devServer({
          host: process.env.host,
          port: process.env.port,
        }),
    );
    break;

}

module.exports = config;
