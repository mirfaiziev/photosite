const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => ({
  entry       : [
    './src/js/app.js',
  ],
  output      : {
    path    : path.resolve(__dirname, '..', 'public_html/assets'),
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

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
            publicPath: 'assets/fonts'
          }
        }]
      },
      {
        test: /\.css?$/,
        include: path.resolve(__dirname, 'src/css'),
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'css',
            publicPath: 'assets/css'
          }
        }]
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   loader: 'style-loader!css-loader!sass-loader'
      // },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use : [
          {
            loader : argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              sourceMap: argv.mode === 'development'
            }
          }, {
            loader : 'css-loader',
            /*options: {
              sourceMap    : argv.mode === 'development',
              importLoaders: 1,
              url          : false
            }*/
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
          }
        ]
      },
    ]
  },

  plugins     : [
    new MiniCssExtractPlugin({
      filename     : argv.mode === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: argv.mode === 'development' ? '[id].css' : '[id].[hash].css'
    }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    /*splitChunks: {
      chunks: 'all'
    },*/
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
  },
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