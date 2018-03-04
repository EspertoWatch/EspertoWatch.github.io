<template>
  <div id="home">
    <h1> {{msg}} </h1>
      <v-layout row justify-space-around>
        <v-flex xs5>
          <HomeCard></HomeCard>
        </v-flex>
        <v-flex xs5>
          <HomeCard></HomeCard>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import HomeCard from './HomeCard.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home Section'
    }
  },
  components: {
    HomeCard
  }
}
</script>

<style lang="scss">
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>