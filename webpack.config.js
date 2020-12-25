const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack')

const resolve = (dir) => path.resolve(__dirname, dir)


module.exports = function (env) {
  const isDevelopment = env ==='development'
  const baseConfig = {
    mode: env,
    stats: 'errors-only',
    // 入口文件
    entry: './src/index.tsx',
    // 输出文件名称
    output: {
      filename: '[name][chunkHash].js',
      path: resolve('./dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
      alias: {
        src: resolve('./src'),
        utils: resolve('./src/utils')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve('./public/index.html'),
        title: 'RTS脚手架' // React + Typescript
      }),
      // FIX: webpack5 process is undefined
      new webpack.DefinePlugin({
        "process.platform": JSON.stringify(process.platform),
        "process.env.TERM": JSON.stringify(process.env.TERM),
        "process.env.WDS_SOCKET_HOST": JSON.stringify(process.env.WDS_SOCKET_HOST),
        "process.env.WDS_SOCKET_PORT": JSON.stringify(process.env.WDS_SOCKET_HOST),
        "process.env.WDS_SOCKET_PATH": JSON.stringify(process.env.WDS_SOCKET_PATH)
    })
    ]
  }

  if (isDevelopment) {
    baseConfig.devServer = {
      contentBase: resolve('./dist'),
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    }
    baseConfig.plugins.push(
      new FriendlyErrorsWebpackPlugin(),
    )
  }

  return baseConfig
}