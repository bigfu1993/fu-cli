const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		stats: 'errors-only',
		open: true,
		hot: true,
		https: true,
		proxy: {
			'/tempApi': {
				target: 'https://www.mumuxili.com',
				pathRewrite: {
					'^/tempApi': ''
				},
				changeOrigin: true,
				secure: true
			}
		}
	}
}
module.exports = WebpackMerge(baseConfig, devConfig)
