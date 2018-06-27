
const path = require('path')

//输出配置
exports.outputConfig = {
    dirName: 'dist',
    addHash: false
}

//执行环境
exports.isProduction = process.env.NODE_ENV === 'production'

//获取文件绝对路径
exports.resolve = dir => {
    return path.resolve(__dirname, '..', dir)
};

