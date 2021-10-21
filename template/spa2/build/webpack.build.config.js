const Path = require("path");
const WebpackMerge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包删除dist文件
const baseConfig = require("./webpack.base.config");
const prodConfig = {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin(),
			new TerserWebpackPlugin({
				cache: false, // 是否缓存
				parallel: true, // 是否并行打包
				sourceMap: true, // 开启代码定位
				extractComments: false, // 注释打包额外文件
				terserOptions: {
					compress: {
						unused: true,
						drop_debugger: true,
						drop_console: true,
						dead_code: true
					}
				}
			})
		]
	},
	plugins: [new CleanWebpackPlugin()]
};
module.exports = WebpackMerge(baseConfig, prodConfig);
