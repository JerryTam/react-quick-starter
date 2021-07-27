import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { isDev, PROJECT_PATH } from '../constant';

const config: webpack.Configuration = {
  entry: './src/index.tsx', // 告诉 Webpack 从哪里开始寻找要捆绑的模块
  output: {
    path: path.resolve(PROJECT_PATH, './build'),
    // filename: '[name].[contenthash].js',
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    publicPath: '/', // Webpack 应用程序中的根路径
  },
  module: {
    // 告诉 Webpack 将如何处理不同的模块
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Webpack 在模块解析期间以何种顺序查找哪些文件类型
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 使用在src文件夹中的index.html作为模板。
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    // Webpack 进程对代码进行类型检查
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // 启用 Webpack 进程使用 ESLint 对代码进行检查
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
};

export default config;
