const Path = require('path')
const Fs = require('fs')
const Webpack = require('webpack')
const AddAssetWebpackHtmlPlugin = require('add-asset-html-webpack-plugin') // 将dll文件插入html模板文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css文件
const CopyWebpackPlugin = require('copy-webpack-plugin') //copy public 公共文件夹
const VueLoaderPlugin = require('vue-loader/lib/plugin') //解析vue模板
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成tpl文件
const baseConfig = {
	externals: {
		CKEDITOR: 'window.CKEDITOR'
	},
	entry: {
		app: ['babel-polyfill', Path.resolve(__dirname, '../src/main.js')]
	},
	output: {
		publicPath: '/',
		path: Path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash:8].min.js',
		chunkFilename: 'js/[name].[hash:8].chunk.js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.vue', '.css', '.less'],
		modules: [Path.resolve(__dirname, '../src'), Path.resolve(__dirname, '../node_modules')],
		alias: {
			'@': Path.resolve(__dirname, '../src'),
			'#': Path.resolve(__dirname, '../src/assets/images')
		}
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{
										absoluteRuntime: false,
										corejs: false,
										helpers: false,
										regenerator: true,
										useESModules: false
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader'
					}
				]
			},
			{
				test: /\.(c|sc|le)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					// {
					// 		loader: 'postcss-loader',
					// 		options: {
					// 			plugins: [
					// 					require('autoprefixer')
					// 		 ]
					// 		}
					// },
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								modifyVars: {
									'primary-color': '#00C7DB'
								},
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							esModule: false,
							outputPath: 'images/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: Path.resolve(__dirname, '../src/index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].min.css',
			chunkFilename: 'css/[name].[hash:8].chunk.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: Path.resolve(__dirname, '../public'),
					to: Path.resolve(__dirname, '../dist/public')
				}
			]
		}),
		new Webpack.DefinePlugin({
			'process.env': {
				BUILD_ENV: JSON.stringify(process.env.BUILD_ENV)
			}
		}),
		new VueLoaderPlugin()
	]
}
// 将dll文件插入到html模板当中去
// let dlls = Fs.readdirSync(Path.resolve(__dirname, "../dll"));
// dlls.forEach(function(file, idx) {
// 	if (/.*\.dll.js$/.test(file)) {
// 		// 将某个文件打包出去，并在html中自动引入该资源
// 		baseConfig.plugins.push(
// 			new AddAssetWebpackHtmlPlugin({
// 				filepath: Path.resolve(__dirname, "../dll", file),
// 				outputPath: "/dll" // dll文件输出dist中位置
// 			})
// 		);
// 	}
// 	if (/.*\.manifest.json/.test(file)) {
// 		// 告诉webpack哪些库不参与打包，同时使用时的名称也得变
// 		baseConfig.plugins.push(
// 			new Webpack.DllReferencePlugin({
// 				manifest: Path.resolve(__dirname, "../dll", file)
// 			})
// 		);
// 	}
// });
module.exports = baseConfig
