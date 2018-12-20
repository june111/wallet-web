const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

module.exports = {

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
