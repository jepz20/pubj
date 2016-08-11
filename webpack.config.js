const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const PATHS = {
  app: './index.js',
  build: path.join(__dirname, 'dist'),
};
config = {
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
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
      { from: 'images', to: 'images' },
    ]),
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
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }));

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true,
      warnings: false,
    },

    mangle: false,
    output: {
      comments: false,
    },
  }));

  config.plugins.push(new SWPrecacheWebpackPlugin({
    cacheId: 'pubj',
    filename: 'service-worker.js',
    runtimeCaching: [{
      urlPattern: /data/,
      handler: 'networkFirst',
    }],
  }));
} else {
  config.devtools = 'evals';
};

excludedPackages = [
  'express',
  'serve-favicon',
];

config.entry.vendor = config.entry.vendor.filter(e=>
  excludedPackages.indexOf(e) < 0
);

module.exports = config;
