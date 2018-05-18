<template>
  <div id="heartRate">
    <h1> My Heart Rate Data </h1>
    <v-layout row justify-space-around>
      <v-card width="45vw">
        <ChartSelector 
          :dayData="dayHR"
          :weekData="weekHR"
          :monthData="monthHR"
          graph-type="Bar"
          time-period="Today"
          includes="Goal Line"
          :graph-type-choices="['Bar', 'Line']"
          :time-period-choices="['Today', 'This Week', 'This Month']"
        />
      </v-card>
      <v-card width="45vw">
        <div style="margin-top: 15px;">
          <vue-circle
          :progress="50"
          :size="300"
          :reverse=false
          line-cap="round"
          :animation=false
          :fill="{gradient: ['red', 'yellow', 'green', 'yellow', 'red']}"
          empty-fill="rgba(0, 0, 0, 0)"
          insert-mode="append"
          :thickness="15"
          :show-percent=false>
        </vue-circle>
        </div>
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
    //todo: remove hardcoded vals 
    dayHR(){
       return [this.$store.state.heartRateData.currentHR];
    },
    weekHR(){
       return [70, 80, 85, 69, 90, 99, this.$store.state.heartRateData.currentHR];
    },
    monthHR(){
       return [60, 77, 74, 70, 80, 85, 69, 90, 99, this.$store.state.heartRateData.currentHR];
    }
  },
  methods: {
      ...mapActions([
          'getHeartRateData',
          'getHeartRateGoals'
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