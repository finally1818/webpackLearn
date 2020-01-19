// webpack.config.js

const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
// const Webpack = require('webpack')
const devMode = process.argv.indexOf('--mode=production') === -1

// let indexLess = new ExtractTextWebpackPlugin('index.less')
// let indexCss = new ExtractTextWebpackPlugin('index.css')

module.exports = {
  mode: 'development', // 开发模式
  entry: { main: path.resolve(__dirname, '../src/main.js') }, // 入口文件
  // entry: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
  output: {
    chunkFilename: 'js/[name].[hash:8].js',
    filename: 'js/[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist'), // 打包后的目录
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOption: {
                preserveWhitespace: false,
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: {
          loader: 'happypack/loader?id=happyBabel',
          // options: {
          //   presets: ['@babel/preset-env'],
          // },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist/css/',
              hmr: devMode,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../dist/css/',
              hmr: devMode,
            },
          },
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hase:8].[ext]',
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      ' @': path.resolve(__dirname, '../src'),
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
    },
    extensions: ['*', '.js', '.json', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new vueLoaderPlugin(),
    new HappyPack({
      id: 'happyBabel', // 与loader对应的id
      // 用法和loader的配置一样，注意这里是loaders
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
          cacheDirectory: true,
        },
      ],
      threadPool: happyThreadPool,
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json'),
    }),
    new CopyWebpackPlugin([{ from: 'static', to: 'static' }]),
    // new Webpack.HotModuleReplacementPlugin(),
    // indexLess,
    // indexCss
  ],
  // devServer: {
  //   port: 3000,
  //   hot: true,
  //   contentBase: '../dist'
  // }
}
