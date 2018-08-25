const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => ({
  entry       : [
    './src/js/index.js',
    // './src/scss/index.scss'
  ],
  output      : {
    path    : path.resolve(__dirname, '..', 'public/assets'),
    filename: 'js/index.js'
  },
  module      : {
    rules: [
      {
        test   : /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        use    : {
          loader : 'babel-loader',
          options: {
            presets  : 'env',
            sourceMap: argv.mode === 'development',
          }
        }
      },
      /*{
        test   : /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use    : [{
          loader : argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            sourceMap: argv.mode === 'development'
          }
        }, {
          loader : 'css-loader',
          options: {
            sourceMap    : argv.mode === 'development',
            importLoaders: 1,
            url          : false
          }
        }, {
          loader : 'postcss-loader',
          options: {
            sourceMap: argv.mode === 'development',
            plugins  : [
              autoprefixer()
            ]
          }
        }, {
          loader : 'sass-loader',
          options: {
            sourceMap   : argv.mode === 'development',
            includePaths: []
          }
        }]
      }*/
    ]
  },
  plugins     : [
    /*new MiniCssExtractPlugin({
      filename     : argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css'
    }),*/
    // new webpack.HotModuleReplacementPlugin()
  ],
/*  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer  : argv.mode === 'development' ? [] : ([
        new UglifyJsPlugin({
          cache        : true,
          parallel     : true,
          sourceMap    : argv.mode === 'development',
          uglifyOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
          }
        })
      ])
  },*/
  /*devServer: {
   contentBase: path.resolve(__dirname, '..', '..', 'public', 'compressed'),
   disableHostCheck: true,
   host: '0.0.0.0',
   port: 8081,
   hot: true,
   headers: {
   'Access-Control-Allow-Origin': '*'
   },
   // needed on OSX/Windows for HRM to work via Docker
   watchOptions: {
   poll: true
   }
   }*/
});