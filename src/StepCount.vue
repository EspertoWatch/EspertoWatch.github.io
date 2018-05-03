<template>
  <div id="stepCount">
    <h1> My Step Count Details </h1>
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
        />
      </v-card>
      <v-card width="45vw">
        <StepArchMeter :percentage1="stepGoalProgress | getPercentageForStep(20)" :percentage2="stepGoalProgress | getPercentageForStep(40)" :percentage3="stepGoalProgress | getPercentageForStep(60)" :percentage4="stepGoalProgress | getPercentageForStep(80)" :percentage5="stepGoalProgress | getPercentageForStep(100)" />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import StepArchMeter from './StepArchMeter.vue'
import ChartSelector from './Chartselector.vue'
export default {
  name: 'StepCount',
  components: {
    StepArchMeter,
    ChartSelector
  },
  data(){
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
      stepGoalProgress: 65
    }
  },
  filters:{
    getPercentageForStep(stepGoalProgress, basePercentage){
        const percentage = Math.min(Math.max(0, ((stepGoalProgress - (basePercentage-20))/20)*100), 100);
        return `${percentage}%`;
    }
  }
}
</script>

<style lang="scss" scoped>
#stepCount {
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
</style>