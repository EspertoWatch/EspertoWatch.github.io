<template>
  <div id="app">
    <div class="esperto-navbar">
      <div class="esperto-logo">
        <img src="./assets/espertoLogo.png">
      </div>
      <div class="nav-logos">
        <router-link to="Profile"><img src="./assets/profile-nav.png"></router-link>
        <router-link to="StepCount"><img src="./assets/step-nav.png"></router-link>
        <router-link to="HeartRate"><img src="./assets/heart-nav.png"></router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.esperto-navbar{
  height: 60px;
  border-bottom: solid 1px;
  display: flex;
  flex-direction: row;
}
.esperto-logo{
  margin-left: 10px;
  flex: 1;

  img{
    height: 50px;
    vertical-align: middle;
  }
}
.nav-logos{
  img{
    vertical-align: middle;
    height: 35px;
    margin-top: 12px;
    margin-left: 3vw;
    margin-right: 3vw;
  }
}

</style>
