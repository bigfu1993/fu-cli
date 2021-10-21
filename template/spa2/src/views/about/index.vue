<template>
  <div id="about">
    <div class="team-info">
      <div class="group">
        <ul>
          <li v-for="e in groups"
            :key="e"
            @click="handleDetail(e)">{{e}}</li>
        </ul>
      </div>
      <div class="team">
        <router-view></router-view>
      </div>
    </div>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      groups: ['bigfu', 'ron', 'mio', 'shaun', 'nuguri', 'zevan', 'kate', 'makey']
    }
  },
  methods: {
    handleDetail(name) {
      console.log(name)
      this.$router.push(`/about/member/${name}`)
    }
  }
}
</script>

<style lang="less" scoped>
#about {
  .team-info {
    display: flex;
    .group {
      width: 50%;
      background-color: #dedede;
    }
    .team {
      width: 50%;
      background-color: #f3f3f3;
    }
  }
}
</style>
