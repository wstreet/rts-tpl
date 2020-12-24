const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = (dir) => path.resolve(__dirname, dir)


module.exports = (env = {}) => {
  const { development } = env
  const baseConfig = {
    // 入口文件
    entry: './src/index.tsx',
    // 输出文件名称
    output: {
      filename: '[name][chunkHash:8].js',
      path: resolve('./dist'),
    },
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    mode: development ? 'development' : 'production',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve('./public/index.html'),
        title: 'RTS脚手架' // React + Typescript
      })
    ]
  }

  if (development) {
    baseConfig.devServer = {
      contentBase: resolve('./dist'),
      compress: true,
      port: 9000
    }
  }

  return baseConfig
}