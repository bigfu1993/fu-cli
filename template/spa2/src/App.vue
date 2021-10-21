<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  metaInfo() {
    return {
      title: this.$store.state.meta.title,
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes'
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
#app {}
</style>
