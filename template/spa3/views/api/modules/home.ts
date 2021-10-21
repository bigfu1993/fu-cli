import { http,dataType } from '@/api/http'
export function testGet(data?:dataType):any {
	return http({
		url: '/get/app/constant/querySex',
		data:Object.assign({},data),
		headers: {
			'User-Application': 'get-cli/1.0.0.0'
		}
	})
}
export function testPost(data?:dataType) {
	return http({
		url: '/post/app/constant/querySex',
		data:Object.assign({},data),
		headers: {
			'User-Application': 'post-cli/1.0.0.0'
		}
	})
}
export function testJsonp(data?:dataType) {
	return http({
		method:'jsonp',
		url: '/jsonp/advertisement/info',
		data:Object.assign({
			name:'ZMYPlanTop',
			count:7
		},data),
		headers: {
			'User-Application': 'jsonp-cli/1.0.0.0'
		}
	})
}

