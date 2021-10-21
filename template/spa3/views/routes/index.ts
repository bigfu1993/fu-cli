
import { RouteRecordRaw } from 'vue-router'
const About = () => import('@/src/about/index.vue')
const Home = () => import('@/src/home/index.vue')
interface metaTyppe {
	title:string,
	content:string
}

const routes:RouteRecordRaw[] = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		component: Home,
		meta: {
			title: 'Bigfu Cli',
			content: 'disable-no'
		}
	},
	{
		path: '/about',
		component: About,
		meta: {
			title: 'Team',
			content: 'disable-no'
		}
	},
]

export default routes
