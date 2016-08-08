const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const PATHS = {
  app: './index.js',
  build: path.join(__dirname, 'dist'),
};
console.log(PATHS.build);
module.exports = {
  entry: {
    app: './index.js',
    vendor: Object.keys(pkg.dependencies),
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
  },
  devServer: {
    inline: true,
    port: 2222,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index-template.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new CleanWebpackPlugin([PATHS.build], {
      root: process.cwd(),
    }),
    new CopyWebpackPlugin([
      { from: 'data', to: 'data' },
    ]),
    new CopyWebpackPlugin([
      { from: 'rawData', to: 'rawData' },
    ]),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   comments: false,
    //
    //   compress: {
    //     sequences: true,
    //     dead_code: true,
    //     conditionals: true,
    //     booleans: true,
    //     unused: true,
    //     if_return: true,
    //     join_vars: true,
    //     drop_console: true,
    //   },
    //
    //   mangle: {
    //     except: ['$'],
    //     screw_ie8 : true,
    //   },
    //   output: {
    //     comments: false,
    //   },
    // }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: __dirname,
        loader: 'babel',
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader',
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
      },
    ],
  },
};
