const utils = require('./utils')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  output: {
    path: utils.resolve(utils.outputConfig.dirName),
    filename: 'js/[name].js',
    publicPath: './'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([utils.resolve(utils.outputConfig.dirName)]),
  ]
}
