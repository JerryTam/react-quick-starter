import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';

import comm from './webpack.common.config';

const config: webpack.Configuration = {
  mode: 'production',
  // entry: './src/index.tsx',

  plugins: [
    new CleanWebpackPlugin(), // 构建过程开始时清除构建文件夹
  ],
};

export default merge(comm, config);
