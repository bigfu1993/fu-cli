<template>
  <div id="page">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, provide, readonly, getCurrentInstance } from 'vue'
export default defineComponent({
  // 已启用类型推断
  name: 'Root',
  setup() {
    let instance: any = getCurrentInstance()
    let root = ref('click me !!!')
    function changeRoot() {
      root.value = 'aha joke !!!'
      let timer = setTimeout(() => {
        root.value = 'click me !!!'
        clearTimeout(timer)
      }, 1000)
      // 触发 eventbus
      instance.proxy.$bus.$emit('emitHome')
    }
    provide('root', readonly(root))
    provide('changeRoot', changeRoot)
    return {
      root,
      changeRoot
    }
  }
})
</script>

<style lang='less' scoped>
#page {
}
</style>
