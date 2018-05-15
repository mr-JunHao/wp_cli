const webpack = require('webpack')
const merge = require('webpack-merge')

const utils = require('./utils')
const webpackbaseConf = require('./webpack.base.conf')

let modeConf = utils.isProduction ?
  require('./webpack.prod.conf') :
  require('./webpack.dev.conf');

let webpackConfig = merge(webpackbaseConf, modeConf);
// console.log(webpackConfig)
module.exports = webpackConfig;
