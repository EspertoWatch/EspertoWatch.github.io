<template>
  <v-app style="backgroundColor: #fdfbfb">
    <div>
     <v-toolbar flat style=" backgroundColor: #fff; border-bottom: solid 1px; border-color: #d3d3d3">
      <v-toolbar-title><router-link to="/"><img src="/assets/app-images/espertoLogo.png" class="esperto-logo"></router-link></v-toolbar-title>
      <v-spacer/>
      <div class="nav-logos">
        <router-link to="Profile"><img src="/assets/app-images/profile-nav.png"></router-link>
        <router-link to="StepCount"><img src="/assets/app-images/step-nav.png"></router-link>
        <router-link to="HeartRate"><img src="/assets/app-images/heart-nav.png"></router-link>
      </div>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </div>
  </v-app>
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

<style lang="scss" scoped>
.esperto-logo{
  height: 50px;
}
.nav-logos{
  img{
    vertical-align: middle;
    height: 35px;
    margin-left: 3vw;
    margin-right: 3vw;
  }
}

</style>
