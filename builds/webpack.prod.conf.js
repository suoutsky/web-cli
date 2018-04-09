const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const os = require('os');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('../config/index');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      },
      cache: true,
      parallel: os.cpus().length
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin({
      format: chalk.yellow('打包中 [:bar] :current/:total :percent :elapseds :msg'),
      complete: '●',
      incomplete: '○',
      width: 20
    }),
    new CleanWebpackPlugin(
      ['dist'], {
        root: path.resolve(__dirname, '../'),
        verbose: false,
        dry: false
      }
    ),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
});
