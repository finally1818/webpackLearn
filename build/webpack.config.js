// webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less')
let indexCss = new ExtractTextWebpackPlugin('index.css')

module.exports = {
  mode: 'development', // 开发模式
  entry: path.resolve(__dirname, '../src/main.js'), // 入口文件
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    indexLess,
    indexCss,
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: indexCss.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: indexLess.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')],
              },
            },
            'less-loader',
          ],
        }),
      },
    ],
  },
}
