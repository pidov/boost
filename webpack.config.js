const path = require('path');
const pkg = require(path.resolve('./package.json'));
const libraryName = pkg.name;
const outputFile = libraryName + '.js';
const nodeModulesPath = path.resolve('./node_modules');
const srcPath = path.resolve('./src');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: './dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /\.json$/,
      loader: "json-loader"
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        srcPath,
      ]
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: false,
        warnings: true
      },
      output: {
        comments: false
      }

    })
  ],
  resolve: {
    extensions: ['.js']
  }
};