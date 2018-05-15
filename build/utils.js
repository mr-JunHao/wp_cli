
const path = require('path')

exports.outputConfig = {
    dirName: 'dist'
}
exports.isProduction = process.env.NODE_ENV === 'production';
exports.resolve = dir => {
    return path.resolve(__dirname, '..', dir)
};

