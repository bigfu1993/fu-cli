// js entry

import Vue from './vue'
import { http } from '../config/http'
import { rootMixin } from '@/mixins/root'
import { bus } from '@/utils/bus'

// 全局注入mixin
Vue.mixin(rootMixin)

// 全局注入Event Bus
Vue.config.globalProperties.$bus = bus
// 全局注入http请求
Vue.config.globalProperties.$mumuHttp = http
