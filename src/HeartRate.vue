<template>
  <div id="heartRate">
    <h1> My Heart Rate Data </h1>
    <v-layout row justify-space-around>
      <v-card width="45vw">
        <ChartSelector 
          :fake-chart-data="fakeChartData" 
          :fake-chart-options="fakeChartOptions"
          graph-type="Bar"
          time-period="Today"
          includes="Goal Line"
          :graph-type-choices="['Bar', 'Line']"
          :time-period-choices="['Today', 'This Week', 'This Month']"
          :includes-choices="['Goal Line', 'Average Line']"
        />
      </v-card>
      <v-card width="45vw">
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import ChartSelector from './Chartselector.vue'
export default {
  name: 'HeartRate',
  data() {
    return{
      fakeChartData: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Fake Label',
            backgroundColor: '#f87979',
            data: [40, 20]
          }
        ]
      },
      fakeChartOptions: {
        title: {
          display: true,
          text: 'Fake Chart Title',
          fontSize: 20
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      },
    }
  },
  components: {
    ChartSelector
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