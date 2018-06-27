const utils = require('./utils')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        inline: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}