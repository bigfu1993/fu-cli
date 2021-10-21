
import { defineComponent  } from 'vue'
export let rootMixin = defineComponent({
  // 已启用类型推断
  data() {
    return {
      txt: 'world'
    }
  },
  mounted() {
		let currentComp:any = this.$options.name
		if(['RouterView','RouterLink',undefined].indexOf(currentComp)<0){
			console.log(`[mixins] ： component: ${currentComp} mounted ...`)
		}
  }
})
