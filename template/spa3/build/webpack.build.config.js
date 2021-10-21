

const { CleanWebpackPlugin } = require('clean-webpack-plugin') //打包删除dist文件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin') // 压缩css 
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩js
const { merge: WebpackMerge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const env = process.env.BUILD_ENV
const buildConfig = function (env) {
  let conf = {
    devtool: 'source-map',
    optimization: {
      minimize: false, // mode 非 production 时 设置为true 压缩同样生效
      minimizer: [], // mode=production 才生效 
      splitChunks: {
        // name: 'mmxl',
        // automaticNameDelimiter: '.',
        chunks: 'all', // 分割类型： async:异步代码 initial:同步 all:同步&&异步 
        minChunks: 1, // 拆分依据：模块被引用1次久会被分割成chunk文件
        // minSize: 10000, // 大于该值久会做代码分割
        // minRemainingSize: 10000, // 通过确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块
        // maxSize: 40000, // 单个文件最大体积
        // maxInitialSize: 20000, // 初始化文件最大体积
        // maxAsyncSize: 40000, // 异步加载模块最大体积
        // maxAsyncRequests: 20, // 按需加载时的最大并行请求数
        // maxInitialRequests: 20, // 入口点||初始化的最大并行请求数
        // enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值
        cacheGroups: {
          // lodash: {
          //   filename: 'js/node_modules/lodash.[fullhash:8].min.js',
          //   test: /[\\/]node_modules[\\/]\/[\\/]lodash[\\/]/,
          //   minChunks: 1,
          //   priority: -10, // 提取优先级
          // },
          // jquery: {
          //   filename: 'js/node_modules/jquery.[fullhash:8].min.js',
          //   test: /jquery/,
          //   minChunks: 1,
          //   priority: -10,
          // },
          // abc: {  //拆分第三方库（通过npm|yarn安装的库）
          //   filename: 'js/node_modules/vendor.[fullhash:8].min.js',
          //   test: /[\\/]node_modules[\\/]/,
          //   priority: -20,
          // },
          // default: {
          //   filename: 'vender',
          //   priority: -30,
          //   reuseExistingChunk: true
          // }
        },
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
    ]
  }
  if (env == 'prod') {
    conf.devtool = false
    conf.optimization.minimize = true
    conf.optimization.minimizer.push(new CssMinimizerWebpackPlugin({
      parallel: true, // 多线程压缩 提高构建速度 boolean || number
      minify: CssMinimizerWebpackPlugin.cleanCssMinify, // 重写压缩规则  Array || Fun
      minimizerOptions: {
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
          },
        ],
      }, // 删除注释
    }))
    conf.optimization.minimizer.push(new TerserWebpackPlugin({
      parallel: true, // 多线程压缩 提高构建速度 boolean || number 
      extractComments: false, // 剥离注释  boolean || 'all' || RegExp 
      terserOptions: {
        ecma: undefined, // js压缩标准 5 || 2015 || 2016
        parse: {}, // 自定义压缩器
        compress: {
          dead_code: true, // 删除未使用代码
          drop_console: true, // 去除日志
          drop_debugger: true, // debugger 
        }, // 自定义压缩选项
        mangle: true, // 自定义重整名称
        module: false,// Deprecated
        output: null,
        format: null, // 格式选项
        toplevel: false, // true:顶级变量&&删除未使用变量
        nameCache: null, // 缓存损坏的变量和属性名称
        ie8: true, // ie8兼容
        safari10: false, // safari兼容
        keep_classnames: false, //true:防止丢弃或修改类名
        keep_fnames: false, // true:防止丢弃或修改函数名称
      },
    }))
  }
  return conf
}
module.exports = WebpackMerge(baseConfig(env), buildConfig(env));