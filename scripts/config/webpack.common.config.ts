import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import { isDev, PROJECT_PATH } from '../constant';

const getCssLoaders = (importLoaders: Number) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 抽离css样式
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders,
    },
  },
  // PostCSS 处理浏览器兼容问题
  // {
  //   loader: 'postcss-loader',
  //   options: {
  //     ident: 'postcss',
  //     plugins: [
  //       /*
  //         postcss-flexbugs-fixes ：用于修复一些和 flex 布局相关的 bug。
  //         postcss-preset-env ：将最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题。我们使用 autoprefixer 来自动添加浏览器头。
  //         postcss-normalize ：从 browserslist 中自动导入所需要的 normalize.css 内容。
  //       */
  //       // 修复一些和 flex 布局相关的 bug
  //       require('postcss-flexbugs-fixes'),
  //       require('postcss-preset-env')({
  //         autoprefixer: {
  //           grid: true,
  //           flexbox: 'no-2009',
  //         },
  //         stage: 3,
  //       }),
  //       require('postcss-normalize'),
  //     ],
  //     sourceMap: isDev,
  //   },
  // },
];

let plugins = [
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
    typescript: {
      configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
    },
  }),
  // 启用 Webpack 进程使用 ESLint 对代码进行检查
  new ESLintPlugin({
    extensions: ['js', 'jsx', 'ts', 'tsx'],
  }),
  // 拷贝公共静态资源
  new CopyPlugin({
    patterns: [
      {
        context: path.resolve(PROJECT_PATH, './public'),
        from: '*',
        to: path.resolve(PROJECT_PATH, './build'),
        toType: 'dir',
      },
    ],
  }),
  // 显示编译进度
  new WebpackBar({
    name: isDev ? '正在启动' : '正在打包',
    color: '#fa8c16',
  }),
];
let minimizer: any[] = [];

if (!isDev) {
  plugins = [
    ...plugins,
    // 抽离css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
  ];
  minimizer = [
    // js 压缩
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: { pure_funcs: ['console.log'] },
      },
    }),
    new OptimizeCssAssetsPlugin(),
  ].filter(Boolean);
}

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
      // 样式文件处理
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: getCssLoaders(0),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          ...getCssLoaders(1),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      // 图片和字体文件处理
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Webpack 在模块解析期间以何种顺序查找哪些文件类型
    // 别名
    alias: {
      src: path.resolve(PROJECT_PATH, './src'),
      components: path.resolve(PROJECT_PATH, './src/components'),
      utils: path.resolve(PROJECT_PATH, './src/utils'),
    },
  },
  plugins,
  // 减少打包体积, 打包后将不会将react, react-dom打入包中
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  // 懒加载
  optimization: {
    minimize: !isDev,
    minimizer,
    splitChunks: {
      chunks: 'all',
      name: false, // todo: 不知道咋个配置
    },
  },
};

export default config;
