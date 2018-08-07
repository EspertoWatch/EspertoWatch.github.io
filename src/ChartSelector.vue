<template>
    <div style="margin-left: 20px; margin-right: 20px;">
        <BarChart v-if="graphType === 'Bar'" :height="175" :data="chartData" :options="chartOptions" class="chart"></BarChart>
        <LineChart v-else-if="graphType ==='Line'" :height="175" :data="chartData" :options="chartOptions" class="chart"></LineChart>
        <v-layout row wrap>
            <v-flex xs4>
            <p class="input-label">Select Graph Type: </p>
            </v-flex>
            <v-flex xs7>
            <v-select
                :items="graphTypeChoices"
                v-model="graphType"
            ></v-select>
            </v-flex>
            <v-flex xs4>
            <p class="input-label">Select Time Period: </p>
            </v-flex>
            <v-flex xs7>
            <v-select
                :items="timePeriodChoices"
                v-model="timePeriod"
            ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'
export default {
  name: 'HeartRate',
  props: {
      graphType: String,
      timePeriod: String,
      includes: String,
      graphTypeChoices: Array,
      timePeriodChoices: Array,
      dayData: Array,
      weekData: Array,
      monthData: Array,
      chartColor: String
  },
  computed: {
    chartOptions(){
      return{
        title: {
          display: true,
          text: `${this.timePeriod}'s Graph`,
          fontSize: 20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
    },
    chartData(){
      return{
          labels: this.getLabels(),
          datasets: [
              {
                  label: 'Fake label',
                  backgroundColor: this.chartColor,
                  data: this.getData()
              }
          ]
      }
    }
  },
  components: {
    LineChart,
    BarChart
  },
  methods: {
    getData(){
      if(this.timePeriod === "Today"){
        return this.dayData;
      }
      else if(this.timePeriod === "This Week"){
        return this.weekData;
      }
      else{
        return this.monthData;
      }
    },
    getLabels(){
      let n;
      if(this.timePeriod === "Today"){
        n = this.dayData.length;
      }
      else if(this.timePeriod === "This Week"){
        n = this.weekData.length;
      }
      else{
        n = this.monthData.length;
      }
      return Array.from(Array(n).keys());
    }
  }
}
</script>

<style lang="scss" scoped>

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