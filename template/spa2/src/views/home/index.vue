<template>
  <div id='home'>
    <img src="/public/logo.png"
      alt="">
    <h1>BIGFU-CLI</h1>
    <h2>Simple&nbsp;&nbsp;&nbsp;Pure&nbsp;&nbsp;&nbsp;Scalable</h2>
    <p>produced by
      <a href="https://www.mumuxili.group">@mumuxili</a>
      <router-link to="/about">@bigfu</router-link>
    </p>
    <router-link to="/document">document</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
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
}
</style>
