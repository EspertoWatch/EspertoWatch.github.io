<template>
  <div id="home">
    <v-layout row justify-center>
        <p class="welcome"> Welcome {{user.name}}! </p>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs8>
          <p class="sync-text" style="margin-right: 10px"> Last synced my {{device.name}}: {{device.lastSynced | timestampToDate}}</p>
      </v-flex>
      <v-flex xs2/>
    </v-layout>
    <v-layout row justify-space-around>
      <v-flex xs5>
        <HomeCard icon-src="/assets/app-images/step-nav.png" :chartData="getMonthSteps.slice(Math.max(getMonthSteps.length - 7, 0))" chartTitle="This Week's Step Count" title="My Step Count" v-bind:tabs="getHomeCardStepData" link="StepCount" chartColor='#0000FF'></HomeCard>
      </v-flex>
      <v-flex xs5>
        <HomeCard icon-src="/assets/app-images/heart-nav.png" :chartData="getTodayHR" chartTitle="Today's Heart Rate" title="My Heart Rate" v-bind:tabs="getHomeCardHeartRateData" link="HeartRate" chartColor='#f87979'></HomeCard>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import HomeCard from './HomeCard.vue'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home Section'
    }
  },
  //todo: remove hardcoded vals
  computed: {
    device(){
      return this.$store.state.device;
    },
    user(){
      return this.$store.state.user;
    },
    ...mapGetters([
        'getHomeCardStepData',
        'getHomeCardHeartRateData',
        'getMonthSteps',
        'getTodayHR'
    ])
  },
  filters: {
    timestampToDate(date){
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  },
  methods: {
      ...mapActions([
          'getStepCountData',
          'getHeartRateData',
          'getStepCountGoals',
          'getHeartRateGoals'
      ])
  },
  mounted: function () {
      this.getStepCountData();
      this.getHeartRateData();
      this.getStepCountGoals();
      this.getHeartRateGoals();
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
  color: #2c3e50;
}
.welcome{
  font-size: 3.3rem;
  font-weight: 520;
  margin-bottom: 10px;
}
.sync-text{
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #696969;
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