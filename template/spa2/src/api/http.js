import Vue from 'vue'
import axios from './instance'
// 工具类方法
import { obj2Str, trimObj } from '@/utils/utils'
// 各环境域名
const BUILD_ENV = process.env.BUILD_ENV
// 各项目域名
import DOMAIN from './domain'
// 当前运行环境
let http = function (options) {
	let url = '' //请求地址
	let method = '' //请求方法
	let data = {} //请求参数
	if (BUILD_ENV == 'runtime') {
		url = options.url
	} else {
		let keys = Object.keys(DOMAIN)
		let key = options.url.split('/')[1]
		let idx = keys.indexOf(key)
		if (idx > -1) {
			let spliceIdx = options.url.indexOf('Api')
			let apiUrl = options.url.substring(spliceIdx + 3)
			url = `${DOMAIN[key]}${apiUrl}`
		} else {
			url = `${DOMAIN['misServiceApi']}${options.url}`
		}
	}
	method = options.method.toLowerCase()
	data = options.data ? trimObj(options.data) : {}
	if (method == 'jsonp') {
		return new Promise((resolve, reject) => {
			new Vue()
				.$jsonp(url, data)
				.then(res => {
					if (res.success) {
						resolve(res)
					} else {
						this.$message.error(res.msg || 'err')
					}
				})
				.catch(err => {
					reject(err.data)
				})
		})
	} else {
		let conf = {} //axios配置参数
		conf = { method }
		if (method == 'get') {
			conf.url = `${url}?${obj2Str(data)}`
		} else if (method == 'post') {
			conf.url = url
			conf.data = data
		} else if (method == 'delete') {
			conf.url = url
			conf.data = data
		} else if (method == 'put') {
			conf.url = url
			conf.data = data
		} else {
		}
		return new Promise((resolve, reject) => {
			axios(conf).then(res => {
				if (res.success || res.code == '0') {
					resolve(res)
				} else {
					if (res.logUrl) {
						window.location.href = res.logUrl
					} else {
						this.$message.error(res.msg || 'NET ERR...')
						resolve(res)
					}
				}
			})
		}).catch(err => {
			console.log(err)
		})
	}
}
export { http }
Promise.prototype.finally = function (callback) {
	let P = this.constructor
	return this.then(
		value => P.resolve(callback(value)).then(() => value),
		reason =>
			P.resolve(callback(reason)).then(() => {
				throw reason
			})
	)
}
