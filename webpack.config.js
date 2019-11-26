const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist')
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {  // 刷新报错重定向webpack打包后生成的到目标根目录下的文件
      index: './index.html'
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, 'node_modules'),
      "@": path.resolve(__dirname)
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [{
      test: /\.(j|t)sx?$/,
      loader: "ts-loader",
      exclude: /node_module/
    },
    { // 前置调式
      enforce: "pre",
      test:/\.(j|t)sx?$/,
      loader: "source-map-loader"
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    },
    {
      test: /\.(gif|svg|png|jpg|jpeg)$/,
      use: ['url-loader']
    }
   ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

}