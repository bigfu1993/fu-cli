const Path = require('path') // 路径解析器
const Webpack = require('webpack') // webpack对象暴露内置模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css文件
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板
const CopyWebpackPlugin = require("copy-webpack-plugin") // 保留public静态文件
const { VueLoaderPlugin } = require('vue-loader') //解析vue模板
const baseConfig = function (env) {
	let conf = {
		mode: env == 'prod' ? 'production' : 'development',
		entry: {
			// app: Path.resolve(__dirname, '../entry/main.js'),
			app: Path.resolve(__dirname, '../views/entry/main.ts'),
		},
		output: {
			publicPath: '/', // 项目绝对路径 || 线上cdn地址
			assetModuleFilename: 'resources/[fullhash][ext][query]', // 资源文件命名格式
			filename: 'js/[name].[fullhash:8].min.js',
			chunkFilename: 'js/bundle/[name].[hash:8].chunk.js',
			path: Path.resolve(__dirname, '../dist'),
		},
		resolve: {
			extensions: ['.ts', '.js', '.vue', '.json', '.css', '.less'],
			modules: [Path.resolve(__dirname, '../views'), Path.resolve(__dirname, '../node_modules')],
			alias: {
				'@': Path.resolve(__dirname, '../views'),
				'#': Path.resolve(__dirname, '../views/assets'),
			}
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								appendTsSuffixTo: [/\.vue$/]
							}
						}
					]
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							cacheCompression: true,
							presets: ['@babel/preset-env', "@babel/preset-typescript"],
							plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
						}
					}
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
					test: /\.(c|le|sc)ss$/,
					use: [
						{ loader: env == 'prod' ? MiniCssExtractPlugin.loader : 'style-loader' },
						{ loader: 'css-loader' },
						{ loader: 'less-loader' },
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										['postcss-preset-env'],
										['autoprefixer']
									],
								},
							}
						},
					]
				},
				{
					test: /\.(png|jpg|jpeg|svg|gif)/,
					type: 'asset',
					parser: {
						dataUrlCondition: {
							maxSize: 8 * 1024 // 8kb
						}
					}
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: Path.resolve(__dirname, '../templates/index.html'),
				filename: 'index.html',
				hash: true
			}),
			new VueLoaderPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{ from: Path.resolve(__dirname, '../public'), to: Path.resolve(__dirname, '../dist/public') }
				]
			}),
			new Webpack.DefinePlugin({
				'process.env': {
					BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
					RUN_TYPE: JSON.stringify(process.env.RUN_TYPE)
				}
			}),
		]
	}
	if (env == 'prod') {
		let plugin = new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].min.css',
			chunkFilename: 'css/[name].[hash:8].chunk.css'
		})
		conf.plugins.push(plugin)
	}
	return conf
}
module.exports = baseConfig
