import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = {
	modules: {},
	state: {
		meta: {
			title: 'bigfu-cli'
		}
	},
	mutations: {
		// 设置meta
		setMeta(state, data) {
			state.meta = data
			sessionStorage.setItem('meta', JSON.stringify(data))
		},
	},
	actions: {},
	getters: {}
}
export default new Vuex.Store(store)
