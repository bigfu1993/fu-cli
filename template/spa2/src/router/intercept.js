// 路由拦截
import store from '../store'
export default function (to, from, next) {
	console.log(`leave: ${from.path} ---> to: ${to.path}`)
	if (to.meta) {
		store.commit('setMeta', to.meta)
	}
	next()
}
