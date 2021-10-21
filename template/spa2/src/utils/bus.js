export default {
	install(Vue, options) {
		// EventBus
		const Bus = new Vue()
		Vue.prototype.$bus = {
			/**
			 * @param {any} event 第一个参数是事件对象，第二个参数是接收到消息信息，可以是任意类型
			 * @method $on      事件订阅
			 * @method $off     取消事件订阅
			 * @method $emit    事件广播
			 * @method $once    事件订阅, 触发一次
			 */
			$on(...event) {
				Bus.$on(...event)
			},
			$off(...event) {
				Bus.$off(...event)
			},
			$once(...event) {
				Bus.$once(...event)
			},
			$emit(...event) {
				Bus.$emit(...event)
			}
		}
	}
}
