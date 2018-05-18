<template>
  <div id="stepCount">
    <h1> My Step Count Details </h1>
    <v-layout row justify-space-around>
      <v-card width="45vw">
        <ChartSelector 
          :dayData="daySteps"
          :weekData="weekSteps"
          :monthData="monthSteps"
          graph-type="Bar"
          time-period="Today"
          includes="Goal Line"
          :graph-type-choices="['Bar', 'Line']"
          :time-period-choices="['Today', 'This Week', 'This Month']"
        />
      </v-card>
      <v-card width="45vw">
        <div style="margin-top: 30px;">
          <StepArchMeter :percentage1="stepGoalProgress | getPercentageForStep(20)" :percentage2="stepGoalProgress | getPercentageForStep(40)" :percentage3="stepGoalProgress | getPercentageForStep(60)" :percentage4="stepGoalProgress | getPercentageForStep(80)" :percentage5="stepGoalProgress | getPercentageForStep(100)" />
          <p class="main-value">{{daySteps[0]}}/{{Math.round(daySteps[0]*100/stepGoalProgress, 0)}}</p>
          <p class="desc-text">You've achieved {{stepGoalProgress}}% of your daily step goal, keep up the good work!</p>
        </div>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import StepArchMeter from './StepArchMeter.vue'
import ChartSelector from './Chartselector.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'StepCount',
  components: {
    StepArchMeter,
    ChartSelector
  },
  computed: {
    //todo: stop using hardcoded vals
    ...mapGetters([
        'stepGoalProgress'
    ]),
    daySteps(){
       return [this.$store.state.stepCountData.currentSteps];
    },
    weekSteps(){
       return [10000, 11000, 12000, 13000, 14000, 9000, this.$store.state.stepCountData.currentSteps];
    },
    monthSteps(){
       return  [4500, 5500, 10000, 11000, 12000, 13000, 14000, 9000, this.$store.state.stepCountData.currentSteps];
    }
  },
  methods: {
      ...mapActions([
          'getStepCountData',
          'getStepCountGoals',
      ])
  },
  mounted: function () {
      this.getStepCountData();
      this.getStepCountGoals();
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

.desc-text{
  font-size: 1.8rem !important;
  margin-left: 10px;
  margin-right: 10px;
}

.main-value{
  font-size: 3.2rem !important;
  font-weight: 545;
}

</style>