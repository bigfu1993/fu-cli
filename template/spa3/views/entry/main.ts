console.log(`[runtime env] : ${process.env.BUILD_ENV}`)

import './modules/style'  // 样式统一入口
import './modules/script' // js统一入口

import Vue from './modules/vue'  // vue实例
import { intercept } from './config/intercept' // 路由拦截器
import Router from './modules/router' // 路由实例
import Store from './modules/store' // 状态管理器实例

Router.beforeEach((to: any, from: any, next: Function) => intercept(to, from, next))
Vue.use(Router)
Vue.use(Store)
Vue.mount("#root")

