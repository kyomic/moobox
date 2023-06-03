//see:https://blog.csdn.net/qq_53061847/article/details/125704272
//https://juejin.cn/post/6844904054103998477
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
//const { VueLoaderPlugin } = require('vue-loader/dist/index')
import { VueLoaderPlugin } from 'vue-loader'
import CleanWebpackPlugin from 'clean-webpack-plugin'
//const HtmlWebpackPlugin = import('html-webpack-plugin')
//const CleanWebpackPlugin = import('clean-webpack-plugin')

export default {
  optimization: {
    minimize: false, // 关闭代码压缩，可选
  },
  mode: 'development',
  //target: 'node',
  target: 'web',
  entry: './src/main.ts',

  devtool: 'inline-source-map',
  output: {
    path: path.resolve(path.resolve(), 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选
    },
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(path.resolve(), 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            //configFile: path.resolve(process.cwd(), 'tsconfig.json'),
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },

  plugins: [
    //new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'TS测试',
      template: path.join(path.resolve(), './index.html'),
    }),
    // 添加 VueLoaderPlugin 插件
    new VueLoaderPlugin(),
  ],
}
