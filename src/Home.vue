<template>
  <div id="home">
    <h1> {{msg}} </h1>
      <v-layout row justify-space-around>
        <v-flex xs5>
          <HomeCard icon-src="/assets/app-images/step-nav.png" title="My Step Count" v-bind:tabs="stepCountData | getTabs" link="StepCount"></HomeCard>
        </v-flex>
        <v-flex xs5>
          <HomeCard icon-src="/assets/app-images/heart-nav.png" title="My Heart Rate" v-bind:tabs="heartRateData | getTabs" link="HeartRate"></HomeCard>
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
  computed: {
    heartRateData(){
      return this.$store.state.heartRateData;
    },
    stepCountData(){
      return this.$store.state.stepCountData;
    }
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