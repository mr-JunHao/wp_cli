const utils = require('./utils')
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].js',
        publicPath: '/'
    },
    devServer: {
        hot: true,
        host: '127.0.0.1',
        port: 3000

    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}