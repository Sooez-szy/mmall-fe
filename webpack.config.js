var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//html模板配置
var getHtmlConfig = function(name){
  return {
    template:'./src/view/'+name+'.html',
    filename:'view/'+name+'.html',
    inject:true,
    hash:true,
    chunks:['common',name]
  }
}
//环境变量配置 'dev | online'
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var config = {
  devtool: 'source-map',
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/login.js']
  },
  output: {
    path: path.resolve(__dirname ,'dist'),
    filename: "js/[name].js?[hash]-[chunkhash]",
    chunkFilename: "js/[name].js?[hash]-[chunkhash]",
    publicPath: "/dist/"
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        })
      },{
        test: /\.(git|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
        use: 'url-loader?limit=1024&name=resource/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    //new HtmlWebpackPlugin(getHtmlConfig('login'))

  ]
};
if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;