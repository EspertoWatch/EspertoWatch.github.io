<template>
  <div id="heartRate">
    <h1> My Heart Rate Data </h1>
    <v-layout row justify-space-around>
      <v-card width="80vw">
        <ChartSelector 
          :dayData="getTodayHR"
          :weekData="getWeekHR"
          graph-type="Line"
          time-period="Today"
          includes="Goal Line"
          :graph-type-choices="['Bar', 'Line']"
          :time-period-choices="['Today', 'This Week']"
          chartColor='#f87979'
        />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import ChartSelector from './Chartselector.vue'
import VueCircle from 'vue2-circle-progress'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HeartRate',
  components: {
    ChartSelector,
    VueCircle
  },
  computed: {
    ...mapGetters([
        'getTodayHR',
        'getWeekHR'
    ])
  },
  methods: {
      ...mapActions([
          'getHeartRateData',
          'getHeartRateGoals',
      ])
  },
  mounted: function () {
      this.getHeartRateData();
      this.getHeartRateGoals();
  },
}
</script>

<style lang="scss" scoped>
#heartRate {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  font-weight: normal;
  font-size: 40px;
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
.input-label{
  line-height: 60px;
  font-size: 18px;
}
</style>