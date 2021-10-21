const Path = require('path')
const Fs = require('fs')
const Webpack = require('webpack')
const { merge: WebpackMerge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
let env = process.env.BUILD_ENV
const devConfig = function (env) {
	return {
		mode: 'development',
		plugins: [
			new Webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			// contentBase: Path.resolve(__dirname, '../dist'), // server服务运行根目录
			// contentBasePublicPath: '/', // server静态内容绝对路径
			host: 'cli.mumuxili.com', //指定访问内容
			// hot: true,//热更新模块
			// http2: true,// HTTP/2 服务 开启-->成功-->http2 开启-->失败-->https
			// open: true,
			https: true || {
				key: Fs.readFileSync(Path.resolve(__dirname, '../certs/server.key')),
				cert: Fs.readFileSync(Path.resolve(__dirname, '../certs/server.crt')),
				ca: Fs.readFileSync(Path.resolve(__dirname, '../certs/ca.pem')),
			}, // https服务
			proxy: {
				'/get': {
					target: `https://mis-service${env != 'prod' ? env : ''}.mumuxili.com`,
					pathRewrite: {
						'^/get': ''
					},
					changeOrigin: true,
					secure: true
				},
				'/post': {
					target: `https://mis-service${env != 'prod' ? env : ''}.mumuxili.com`,
					pathRewrite: {
						'^/post': ''
					},
					changeOrigin: true,
					secure: true
				},
				'/jsonp': {
					target: `https://api${env != 'prod' ? env : ''}.mumuxili.com`,
					pathRewrite: {
						'^/jsonp': ''
					},
					changeOrigin: true,
					secure: true
				}
			}
			// injectClient: false,// boolean = false function (compilerConfig) => boolean 是否始终注入客户端
			// injectHot: false,// boolean = false function (compilerConfig) => boolean 确保devServer.hot设置为true
			// index: 'index.html',//访问首页页面
			// lazy: true,// 当它被请求的DEV-服务器将只编译软件包
			// liveReload: false, // 当检测到文件更改时，开发服务器将重新加载/刷新页面。 devServer.hot必须禁用
			// hotOnly: true, //热更新模块,不刷新页面作为构建失败时的回退
			// filename: 'bundle.js', // 此选项可让您减少惰性模式下的编译
			// headers: {

			// }, //向所有响应添加标头
			// compress: false, //启用压缩
			// port: 9000,
			// clientLogLevel: 'info' | 'warn' | 'error' | 'none' | 'warning', // DevTools 中的控制台将显示消息 silent、trace、debug和warning将在下一个主要版本中弃用。
			// disableHostCheck: false, // 绕过主机检查。不推荐这样做，因为不检查主机的应用程序容易受到 DNS 重新绑定攻击
			// bonjour: false, //启动时通过ZeroConf网络广播服务器
			// allowedHosts: [
			//   '.mumuxili.com', '.localhost.com'
			// ], //将允许访问开发服务器的服务列入白名单 开头的值.可以用作子域通配符
			// before: function (app, server, compiler) {
			//   console.log('server proxy before')
			//   // 提供在服务器内部的所有其他中间件之前执行自定义中间件的能力。这可用于定义自定义处理程序
			//   // app.get('/some/path', function (req, res) {
			//   //   res.json({ custom: 'response' });
			//   // });
			// },
			// after: function (app, server, compiler) {
			//   console.log('server proxy after')
			//   // 提供在服务器内部的所有其他中间件之后执行自定义中间件的能力。
			// },
		},
	}
}
module.exports = WebpackMerge(baseConfig(env), devConfig(env))
