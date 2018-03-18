<template>
  <div id="stepCount">
    <h1> My Step Count Details </h1>
    <v-layout row justify-space-around>
      <v-card width="45vw">
        <StepArchMeter :percentage1="stepGoalProgress | getPercentageForStep(20)" :percentage2="stepGoalProgress | getPercentageForStep(40)" :percentage3="stepGoalProgress | getPercentageForStep(60)" :percentage4="stepGoalProgress | getPercentageForStep(80)" :percentage5="stepGoalProgress | getPercentageForStep(100)" />
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import StepArchMeter from './StepArchMeter.vue'
export default {
  name: 'StepCount',
  components: {
    StepArchMeter
  },
  data(){
    return{
      stepGoalProgress: 79
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
  margin-top: 10px;
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