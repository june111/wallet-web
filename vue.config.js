const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

module.exports = {
  baseUrl: 'wallet-web/',
  outputDir: 'docs',
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: {
          entry: {
            app: path.join(__dirname, './src/components/skeleton/skeleton.js')
          }
        },
        minimize: true,
        quiet: true
      })
    ]
  }
}
