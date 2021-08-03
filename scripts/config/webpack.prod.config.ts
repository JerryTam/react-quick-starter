import path from 'path';
import webpack from 'webpack';
import glob from 'glob';
import PurgeCSSPlugin from 'purgecss-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';

import comm from './webpack.common.config';

import { PROJECT_PATH } from '../constant';

const config: webpack.Configuration = {
  mode: 'production',
  // entry: './src/app.tsx',

  plugins: [
    // 去除未使用的样式.
    new PurgeCSSPlugin({
      paths: glob.sync(
        `${path.resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`,
        { nodir: true }
      ),
    }),
    new CleanWebpackPlugin(), // 构建过程开始时清除构建文件夹
    // 打包写入文件注释
    new webpack.BannerPlugin({
      raw: true,
      banner: '/** @preserve Powered by Jerry */',
    }),
    // 打包分析
    new BundleAnalyzerPlugin({
      analyzerMode: 'server', // 开一个本地服务查看报告
      analyzerHost: '127.0.0.1', // host 设置
      analyzerPort: 8888, // 端口号设置
    }),
  ],
};

export default merge(comm, config);
