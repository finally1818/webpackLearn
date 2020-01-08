const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(webpackConfig, {
  // mode: 'production',
  // devtool: 'cheap-module-source-map',
  // plugins: [
  //   new CopyWebpackPlugin([
  //     {
  //       form: path.resolve(__dirname, '../public'),
  //       to: path.resolve(__dirname, '../dist')
  //     }
  //   ])
  // ],
  // optimization: {
  //   minimizer: [
  //     newUglifyJsPlugin({
  //       // 压缩js
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true
  //     }),
  //     new OptimizeCssAseetsPlugin({})
  //   ],
  //   splitChunks: {
  //     chunks: 'all',
  //     cacheGroups: {
  //       libs: {
  //         name: 'chunk-libs',
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: 10,
  //         chunks: 'initial' // 只打包初始时以来的第三方
  //       }
  //     }
  //   }
  // }
})
