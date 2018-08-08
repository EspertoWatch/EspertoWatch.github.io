<template>
	<div>
	    <v-date-picker v-model="date" color="blue" width="400">
	    </v-date-picker>
	    <v-card style="padding-top: 20px; padding-bottom: 20px">
	      <v-layout row class="data-row">
	        <div class="circle">
	          <img class="circle-icon-calendar" src="/assets/app-images/step-nav.png"/>
	        </div>
	        <p class="data-text"> {{date | getDataText(stepData)}} </p>
	      </v-layout>
	      <v-layout row class="data-row">
	        <div class="circle">
	          <img class="circle-icon-calendar" src="/assets/app-images/heart-nav.png"/>
	        </div>
	        <p class="data-text"> {{date | getDataText(heartRateData)}} </p>
	      </v-layout>
	    </v-card>
	  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'CalendarView',
  //todo: remove hardcoded vals
  computed:{
  	heartRateData(){
      return {data: this.$store.state.heartRateData.avgDailyHR, unit: this.$store.state.heartRateData.unit};
    },
    stepData(){
      return {data: this.$store.state.stepCountData.totalDailySteps, unit: this.$store.state.stepCountData.unit};
    },
  },
  data(){
  	return{
  		date: moment().format("YYYY-MM-DD"),
  	}
  },
  filters: {
  	getDataText(date, data){
      if(data.data[date]){
        return `${data.data[date]} ${data.unit} on ${date}`;
      }
  		return `No data for ${date}`;
  	}
  },
  methods: {
  	//basically this tells the parent that closeCalendar is being called from this child view
  	//the parent can then handle the closing of this modal
  	closeCalendar() {
      this.$emit('closeCalendar');
    }
  }
}
</script>

<style lang="scss" scoped>
	.circle{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: solid 1px;
  }
  .circle-icon{
    margin-top: 10px;
    height: 20px;
    width: 20px;
  }
  .circle-icon-calendar{
    margin: 9px;
    height: 20px;
    width: 20px;
  }
  .data-row{
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 20px;
  }
  .data-text{
    margin-left: 10px;
    font-size: 16px;
    line-height: 40px;
  }
</style>