'use strict'
const fs = require('fs')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
/** 
 * -------------------vue-cli新版本弃用dev-server.js,mock数据在devServer中配置
 * */
const express = require('express');
const app = express();
// 查询标签
// const labellist = require("../json/labellist.json");
// const appData2 = require("../json/data.json");
// 路由配置
const routeConfig = require('../router/index')
const apiRouters = express.Router();
app.use('/metadata',apiRouters);

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// Object.keys(baseWebpackConfig.entry).forEach(function(name) {
//   if (name !== 'verdors') {
//     baseWebpackConfig.entry[name] = baseWebpackConfig.entry[name].concat('webpack-hot-middleware/client?reload=true');
//   }
// });

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // mock配置
    before(app){
      // 维度标签
      // app.get('/metadata/label/table/labellist',(req,res) => {
      //   res.json({
      //     errno: 0,
      //     data: labellist
      //   })
      // });
      // app.get('/api/appData2',(req,res) => {
      //   res.json({
      //     errno: 0,
      //     data: appData2
      //   })
      // })
      function readJson(filePath) {
        return function(req, res) {
          var url = '/..' + filePath;
          fs.readFile(__dirname + url, function (err, data) {
            if (err) throw err;
            res.json(JSON.parse(data));
          });
        };
      }
      for (var i in routeConfig) {
        var page = routeConfig[i];
        for (var j in page) {
          var pageRoutes = page[j];
          if (j === 'get') {
            for (var k in pageRoutes) {
             app.get(k, readJson(pageRoutes[k]));
            }
          } else if (j === 'post') {
            for (var k in pageRoutes) {
              app.post(k, readJson(pageRoutes[k]));
            }
          }
        }
      }
    }
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env': require('../config/dev.env')
      // }),
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      // new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
    ]
  })

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
