import Vue from "vue";
// jsonp跨域
import VueJsonp from "vue-jsonp";
Vue.use(VueJsonp);

// 动态meta
import VueMeta from "vue-meta";
Vue.use(VueMeta, { refreshOnceOnNavigation: true });

// 全局域名
import DOMAIN from "./api/domain";
Vue.prototype.$mumuDomain = DOMAIN;

// 全局http请求
import { http } from "./api/http";
Vue.prototype.$mumuHttp = http;

// 全局方法
import Bus from "./utils/bus";
Vue.use(Bus);

// 针对IE上报错‘Promise未定义’
import "babel-polyfill";

// 入口文件
import App from "./App";

// 路由表
import router from "./router";

// 状态管理
import store from "./store";

// 公共样式文件
import "./assets/styles/reset";
import "./assets/styles/common";

// vue实例
new Vue({
	render: h => h(App),
	metaInfo() {
		return {
			title: this.$store.state.meta.title || "BIG-CLI",
			meta: [
				{
					name: "keywords",
					content: this.$store.state.meta.keywords || "BIG-CLI"
				},
				{
					name: "description",
					content: this.$store.state.meta.description || "BIG-CLI"
				}
			]
		};
	},
	router,
	store
}).$mount("#app");
