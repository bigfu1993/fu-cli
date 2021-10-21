import intercept from './intercept' // 路由拦截
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
import Home from '@/views/home' // 首页
import Document from '@/views/document' // 文档
import AboutLayout from '@/views/about' // 关于布局
import aboutModule from './modules/about' // 关于
import missModule from './modules/miss' // 404模块
const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			title: 'BIGFU-CLI'
		}
	},
	{
		path: '/document',
		component: Document,
		meta: {
			title: '说明文档'
		}
	},
	{
		path: '/about',
		component: AboutLayout,
		children: [
			...aboutModule
		]
	},
	...missModule
]
const BUILD_ENV = process.env.BUILD_ENV // 打包环境
const router = new VueRouter({
	mode: BUILD_ENV == 'runtime' ? '' : 'history',
	routes
})
router.beforeEach((to, from, next) => intercept(to, from, next))
export default router
