const path = require('path')
const glob = require('glob')
const utils = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractPlugin = new ExtractTextPlugin({
  filename: "css/[name].css",
  disable: utils.isProduction ? false : true
})

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
        // hash: true,
        //引用对应块名的js
        chunks: [name],
        template: `${path.resolve('src')}/${name}.html`,
        filename: `${name}.html`
      })
    )
  });
  return plugins
}

let plugins = [
  ...exportHTML(),
  new CopyWebpackPlugin([{
      from: 'src/js/lib',
      to: 'js/lib'
    },
    {
      from: 'src/media',
      to: 'media'
    }
  ]),
  extractPlugin
];

plugins = utils.isProduction ? plugins.unshift(
  new CleanWebpackPlugin(['dist'], {
    root: utils.resolve('src')
  })
) : plugins

module.exports = {
  // context: utils.resolve('src'),
  entry: getEntries(utils.resolve('src/js/*.js')),
  resolve: {
    alias: {
      'src': utils.resolve('src'),
      'css': utils.resolve('src/css'),
      'js': utils.resolve('src/js'),
      'img': utils.resolve('src/img')
    }
  },
  module: {
    noParse(content) {
      //忽略大型library处理
      return /jquery/.test(content)
    },
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules|lib/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'img',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            outputPath: 'font',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit: 10000,
            publicPath: 'media',
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader'
          ],
          fallback: 'style-loader',
          publicPath: '../'
        })
      },
      {
        test: /\.less$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          fallback: 'style-loader',
          publicPath: '../'
        })
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          fallback: 'style-loader',
          publicPath: '../'
        })
      },
      {
        test: /\.styl$/,
        use: extractPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ],
          fallback: 'style-loader',
          publicPath: '../'
        })
      }
    ]
  },
  plugins
}