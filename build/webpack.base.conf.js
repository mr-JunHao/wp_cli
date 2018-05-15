const path = require('path')
const glob = require('glob')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractPlugin = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: utils.isProduction ? false : true
});

function getEntries(pattern) {
  let files = glob.sync(pattern);
  let entries = {};
  for (let file of files) {
    entries[path.basename(file, path.extname(file))] = file
  }
  return entries
}


//生成多页面
function exportHTML() {
  let htmlFiles = Object.keys(getEntries(path.resolve('src') + '/*.html'))
  const isProduction = utils.isProduction
  let plugins = []
  htmlFiles.map(name => {
    plugins.push(
      new HtmlWebpackPlugin({
        //压缩html
        minify: isProduction ? {
          removeAttributeQuotes: true // 移除属性的引号
        } : false,
        hash: true,
        //引用对应块名的js
        chunks: [name],
        filename: `${name}.html`
      })
    )
  });
  return plugins
}

module.exports = {
  context: utils.resolve('src'),
  entry: getEntries(utils.resolve('src/entry/*.js')),
  module: {
    noParse(content){
      //忽略大型library处理
      return /jquery/.test(content)
    },
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'img',
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'font',
              name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              outputPath: 'media',
                name: '[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: [
            'css-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'less-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.styl$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'stylus-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    ...exportHTML(),
    extractPlugin
  ]
}
