const webpack = require('webpack')
const path = require('path')
const vueLoaderConfig = require('./build/vue-loader.conf')

module.exports = {
  entry: {
    selectContainer: './src/components/SelectContainer.vue'
  },
  output: {
    path: path.resolve(__dirname, './m-dist'),
    filename: '[name].js',
    library: 'selectContainer',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [path.resolve(__dirname, './src/mixins')]
      // }
    ]
  },
  devtool: '#source-map'
}
