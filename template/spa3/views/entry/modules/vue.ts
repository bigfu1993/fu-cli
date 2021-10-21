// vue entry

import { createApp, h } from "vue"
import Root from '@/src/root.vue'
export class VueModel {
  vm: any
  constructor() {
    this.vm = createApp({
      render: () => h(Root)
    })
		this.vm.config.errorHandler = (err:any, vm:any, info:any):void => {
			// 处理错误
			// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
			console.log('------- error info --------')
			console.log(err)
			console.log(`err info : ${err}`)
			console.log(info)
			console.log('------- error info --------')
		}
		this.vm.config.warnHandler = (msg:any, vm:any, trace:any):void => {
			// `trace` 是组件的继承关系追踪
			console.log('------- warning info --------')
			console.log(`warning info : ${msg}`)
			console.log(trace)
			console.log('------- warning info --------')
		}
  }
  getVue() {
    return this.vm
  }
}

export default new VueModel().getVue()
