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
        <HomeCard icon-src="/assets/app-images/step-nav.png" :chartData="dailyHR" title="My Step Count" v-bind:tabs="getHomeCardStepData | getTabs" link="StepCount"></HomeCard>
      </v-flex>
      <v-flex xs5>
        <HomeCard icon-src="/assets/app-images/heart-nav.png" :chartData="dailySteps" title="My Heart Rate" v-bind:tabs="getHomeCardHeartRateData | getTabs" link="HeartRate"></HomeCard>
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
  computed: {
    device(){
      return this.$store.state.device;
    },
    user(){
      return this.$store.state.user;
    },
    dailyHR(){
        return this.$store.state.heartRateData.dailyHR.slice(0, 7);
    },
    dailySteps(){
        return this.$store.state.stepCountData.dailySteps.slice(0, 7);
    },
    ...mapGetters([
        'getHomeCardStepData',
        'getHomeCardHeartRateData'
    ])
  },
  filters: {
    getTabs(data){
      return [
        {
          title: "Daily",
          mainValue: `${data.today} ${data.unit}`,
          lastInterval: `${data.today - data.yesterday} ${data.unit}`,
          currentAvg: `${data.today - data.thisWeek} ${data.unit}`
        },
        {
          title: "Weekly",
          mainValue: `${data.thisWeek} ${data.unit}`,
          lastInterval: `${data.thisWeek - data.lastWeek} ${data.unit}`,
          currentAvg: `${data.thisWeek - data.thisMonth} ${data.unit}`
        },
        {
          title: "Monthly",
          mainValue: `${data.thisMonth} ${data.unit}`,
          lastInterval: `${data.thisMonth - data.lastMonth} ${data.unit}`,
          currentAvg: `${data.thisMonth - data.thisYear} ${data.unit}`
        },
      ];
    },
    timestampToDate(date){
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    }
  },
  methods: {
      ...mapActions([
          'getStepCountData',
          'getHeartRateData',
      ])
  },
  mounted: function () {
      this.getStepCountData();
      this.getHeartRateData();
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