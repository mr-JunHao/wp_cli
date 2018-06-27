const utils = require('./utils')


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
  }
}

