import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import comm from './webpack.common.config';

import { PROJECT_PATH } from '../constant';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: 'development', // 打包环境, Webpack 将自动设置process.env.NODE_ENV为"development"
  devtool: 'eval-source-map',
  // devtool: 'inline-source-map', //  Webpack 使用完整的内联源映射
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 允许模块热更新
  ],
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    contentBase: path.join(PROJECT_PATH, './build'),
    historyApiFallback: true,
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  }, // 配置 Webpack 开发服务器
};

export default merge(comm, config);
