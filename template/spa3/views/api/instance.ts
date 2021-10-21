import axios from 'axios'

export interface reqConfType {
	[key:string]:string
}
export interface reqErrType {
	[key:string]:string
}
export interface resConfType {
	status:number,
	data:{
		msg:string,
		error:string
	}
}
export interface resErrType {
	response:{
		status:number,
		statusText:string
	}
}
export interface axiosConfType {
	timeout: number,
	headers: {
		[key:string]: string
	},
	withCredentials: boolean,
	crossDomain: boolean,
	reqConf?: reqConfType,
	resConf?: resConfType,
	reqErr?: reqErrType,
	resErr?: resErrType
}

export class Instance {
	instance:any
	constructor (axiosConf:axiosConfType){
		this.instance = axios.create(axiosConf)
		this.initInterceptors()
	}
	getInstance(){
		return this.instance
	}
	initInterceptors(){
		const { interceptors } = this.instance
		interceptors.request.use(
			(conf:reqConfType):reqConfType => {
				// 请求配置拦截
				return conf
			},
			(err:reqErrType):any => {
				// 请求报错拦截
				return Promise.reject(err)
			}
		)
		interceptors.response.use(
			(res:resConfType):any => {
				// 如果返回的状态码为200，说明接口请求成功, 否则的话抛出错误
				if (res.status === 200) {
					return Promise.resolve(res.data)
				} else {
					return Promise.reject(res)
				}
			},
			// 服务器状态码不是2开头的的情况,然后根据返回的状态码进行一些操作
			(err:resErrType):any => {
				return Promise.reject(err)
			}
		)
	}
}

export default new Instance({
	timeout:10000,
	headers:{
		'X-Requested-With': 'XMLHttpRequest'
	},
	withCredentials:true,
	crossDomain:true,
}).getInstance()
