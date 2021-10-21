const Path = require("path");
const Webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 压缩

module.exports = {
	mode: "production",
	entry: {
		vue: ["vue"],
		vuex: ["vuex"],
		axios: ["axios"],
		router: ["vue-router"],
		qs: ["qs"],
		html2canvas: ["html2canvas"]
	},
	output: {
		path: Path.resolve(__dirname, "../dll"),
		filename: "[name].[hash:8].dll.js", //
		library: "[name]" //打包的库里面向外暴露出去的内容叫做什么名字
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true, // terser 多线程
				extractComments: false,
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
	plugins: [
		new Webpack.DllPlugin({
			name: "[name]", //映射库的暴露的内容名称
			path: Path.resolve(__dirname, "../dll/[name].manifest.json"), // dll文件输出路径
			context: __dirname
		})
	]
};
