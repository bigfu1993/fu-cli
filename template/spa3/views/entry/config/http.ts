

// import Vue from './vue'
import instance from './instance'

// 工具类方法
import { obj2Str, trimObj } from '../static/tools'

// 各环境域名
import { BUILD_ENV, DEFAULT_DOMAIN } from './env'
import DOMAIN,{domainType} from '../static/domain'

// 请求入参声明
export interface dataType {
	domain? : string | undefined,
	url : string,
	method : string,
	noTrim : boolean,
	data : {
		[key : string] : any
	}
}
interface httpConfType{
	http:any
	jsonp?:any
}
class HttpModel {
	http:any
	jsonp:any
	constructor(httpConf:httpConfType){
		httpConf.http&&(this.http = httpConf.http)
		httpConf.jsonp&&(this.jsonp = httpConf.jsonp)
	}
	getHttp(){

	}
	initHttp(){

	}
	$get(){

	}
	$post(){

	}
	$put(){

	}
	$delete(){

	}
	$jsonp(){

	}
}
// 当前运行环境
export let http = function(options:dataType) {
  let url = '' //请求地址
  let method = options.method.toLowerCase() //请求方法
  let data = {} //请求参数
	// 处理 url
  if (BUILD_ENV == 'runtime') {
    url = options.url
  } else {
    let domainKeys = Object.keys(DOMAIN) // 域名key列表
		let domainKey = options.url.split('/')[1] // 请求域名key
		let apiPath = options.url.substring(options.url.indexOf('Api') + 3)
		if(options.domain){
			url = `${options.domain}${apiPath}`
		}else{
			if(domainKeys.indexOf(domainKey)>-1){
				url = `${DOMAIN[domainKey as keyof domainType]}${apiPath}`
			}else{
				url = `${DOMAIN[DEFAULT_DOMAIN as keyof domainType]}${apiPath}`
			}
		}
  }
  // 处理data
	if (options.data) {
		data = options.noTrim ? options.data : trimObj(options.data)
	} else {
		data = {}
	}
	switch (method) {
		case 'jsonp' :{
			console.log('jsonp')
		}
		case 'get' :{
			console.log('get')
		}
		case 'post' :{
			console.log('post')
		}
		case 'put' :{
			console.log('put')
		}
		case 'delete' :{
			console.log('delete')
		}
		default : {
			console.log('get')
		}
	}
}


