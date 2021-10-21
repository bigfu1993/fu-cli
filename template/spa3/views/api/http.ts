// axios实例
import instance,{	reqConfType, reqErrType, resConfType, resErrType} from './instance'
import { jsonp } from 'vue-jsonp'
// 各环境域名
import { RUN_TYPE } from '@/config/env'
import { DEFAULT_DOMAIN } from '@/config/api'
import { DOMAIN, domainType } from '@/config/domain'
// 工具类方法
import { obj2Str, trimObj } from '@/utils/tools'
// 请求入参data声明
export interface dataType {
	[key: string]: any
}
// 请求入参声明
export interface optionsType{
	domain?: string | undefined,
	method?: string | undefined,
	noTrim?: boolean,
	data?: dataType,
	trimFlag?: boolean | undefined,
	headers:{
		'User-Application':string,
		[key:string]:string | boolean
	},
	url : string,
}
export interface httpConfType{
	http:any
	jsonp?:any
}
// 当前运行环境
export let http = function(options:optionsType):any {
	let httpObj = {}
	let { domain, method = 'get', data = {}, trimFlag = true, url, headers} = options
	let domainKeys = Object.keys(DOMAIN) // 域名key列表
	let domainKey = url.split('/')[1] // 请求域名key
	let apiPath = url.substring(url.indexOf('Api') + 3)

	if(RUN_TYPE==='runtime'){
		if(domain){
			url = `${domain}${apiPath}`
		}
	}else{
		if(domain){
		url = `${domain}${apiPath}`
		}else{
			if(domainKeys.indexOf(domainKey)>-1){
				url = `${DOMAIN[domainKey as keyof domainType]}${apiPath}`
			}else{
				url = `${DOMAIN[DEFAULT_DOMAIN as keyof domainType]}${apiPath}`
			}
		}
	}
  // 处理data
	data = trimFlag ?  trimObj(data):data
  httpObj = {
		headers,
		method,
		data,
		url
	}
	return new Promise((resolve,reject)=>{
		switch (method) {
			case 'jsonp' :{
				jsonp(url,data).then((res:any):any=>{
					console.log(`------ [jsonp] response data ------`)
					console.log(res)
					console.log(`------ [jsonp] response data ------`)
					if (res.success || res.code == '0') {
						resolve(res)
					} else {
						reject(res)
					}
				}).catch((err:any)=>{
					console.log(`------ [jsonp] catch err ------`)
					console.log(err)
					console.log(`------ [jsonp] catch err ------`)
				})
				break
			}
			default : {
				instance(httpObj).then((res:any)=>{
					if (res.success || res.code == '0') {
						console.log(`------ [axios] response data ------`)
						console.log(res)
						console.log(`------ [axios] response data ------`)
						resolve(res)
					} else {
						reject(res)
					}
				})
				break
			}
		}
	}).catch((err:any)=>{
		console.log(`------ [axios] catch err ------`)
		console.log(err)
		console.log(`------ [axios] catch err ------`)
	})

}


