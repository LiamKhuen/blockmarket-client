var config = require('./gulp.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: [
      config.src.tsRoot
    ]
  },
  devtool: "source-map",
  watch: true,
  cache: true,
  debug: true,
  output: {
    path: config.dest.outputDir,
    filename: 'js/main-[chunkhash].js',
    publicPath: ''
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    // this injects JS scripts that are processed by webpack into the HTML file we specify
    new HtmlWebpackPlugin({
      template: config.src.indexFile,
      inject: 'body',
      filename: 'index.html' // file where output will be written (dist/client/index.html in our case)
    }),
    // this cleans up contents of dist/js/ on each webpack rerun
    new WebpackCleanupPlugin(['js'])
  ]
};