<template>
    <div>
        <BarChart v-if="graphType === 'Bar'" :height="175" :data="fakeChartData" :options="fakeChartOptions" class="chart"></BarChart>
        <LineChart v-else-if="graphType ==='Line'" :height="175" :data="fakeChartData" :options="fakeChartOptions" class="chart"></LineChart>
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
                @input="updateTitle"
            ></v-select>
            </v-flex>
            <v-flex xs4>
            <p class="input-label">Include: </p>
            </v-flex>
            <v-flex xs7>
            <v-select
                :items="includesChoices"
                v-model="includes"
                multiple
                chips
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
      fakeChartData: Object,
      fakeChartOptions: Object,
      graphType: String,
      timePeriod: String,
      includes: String,
      graphTypeChoices: Array,
      timePeriodChoices: Array,
      includesChoices: Array
  },
  components: {
    LineChart,
    BarChart
  },
  methods: {
    updateTitle(){
      this.fakeChartOptions.title.text = `${this.timePeriod}'s Graph`;
      debugger;
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