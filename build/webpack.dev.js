const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge(webpackConfig, {
  // mode: 'development',
  // devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   por: 3000,
  //   hot: true,
  //   contentBase: '../dist',
  // },
  // plugins: [new Webpack.HotModuleReplacementPlugin()],
  // module: {
  //   rules: [
  //     {
  //       test: /\.vue$/,
  //       loader: 'vue-loader',
  //       include: [path.resolve(__dirname, 'src')],
  //       exclude: /node_modules/,
  //     },
  //   ],
  // },
})
