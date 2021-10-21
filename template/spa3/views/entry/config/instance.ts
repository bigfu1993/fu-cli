import axios from 'axios'

interface reqConfType {

}
interface reqErrType {

}
interface resConfType {
	status:number,
	data:{
		msg:string,
		error:string
	}
}
interface resErrType {
	response:{
		status:number,
		statusText:string
	}
}
interface headerType {
	[key:string]:string
}
interface axiosConfType {
	timeout:number,
	headers:headerType,
	withCredentials:boolean,
	crossDomain:boolean,
	reqConf?:reqConfType,
	reqErr?:reqErrType,
	resConf?:resConfType,
	resErr?:resErrType
}

export class Instance {
	instance:any
	constructor (axiosConf:axiosConfType){
		this.instance = axios.create(axiosConf)
		this.initInterceptors(axiosConf)
	}
	getInstance(){
		return this.instance
	}
	initInterceptors(axiosConf:axiosConfType){
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
