<template>
  <div id='home'>
    <img src="/public/imgs/logo.png"
      alt=""
      @click="testGetM">
    <h1 @click="testPostM">Hello {{testTxt}}</h1>
    <h2 @click="testJsonpM">Simple&nbsp;&nbsp;&nbsp;Pure&nbsp;&nbsp;&nbsp;Scalable</h2>
    <p>produced by mumu team
      <a href="https://www.mumuxili.group">@mumuxili</a>
      <router-link to="/about">@bigfu</router-link>
    </p>
    <router-link to="/document">document</router-link>

    <h3 @click="changeRoot">{{root}}</h3>
  </div>
</template>

<script  lang="ts">
import { defineComponent, inject, getCurrentInstance, onMounted } from 'vue'
import { testGet, testJsonp } from '@/api/modules/home'
export default defineComponent({
  // 已启用类型推断
  name: 'Home',
  setup() {
    let testTxt: string = 'Bigfu-Cli'
    const instance: any = getCurrentInstance()
    const root = inject('root') // 接收上方传递下来的数据
    const changeRoot = inject('changeRoot', root)
    function onBus() {
      console.log('home receive bus event emit from root.vue')
    }
    function testGetM() {
      testGet().then((res: any) => {
        console.log(res)
      })
    }
    async function testJsonpM() {
      let res = await testJsonp()
    }
    onMounted(() => {
      instance.proxy.$bus.$on('emitHome', onBus)
    })
    return {
      root,
      changeRoot,
      testTxt,
      testGetM,
      testJsonpM
    }
  }
})
</script>

<style lang="less" scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    margin-top: 200px;
  }
  h1 {
    line-height: 60px;
    font-size: 40px;
  }
  h2 {
    line-height: 60px;
  }
  h3 {
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #00c7db;
    }
  }
}
</style>
