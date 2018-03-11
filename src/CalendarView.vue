<template>
	<div>
	    <v-date-picker v-model="date" header-color="blue" width="400">
	    </v-date-picker>
	    <v-card>
	      <v-layout row class="data-row">
	        <div class="circle">
	          <img class="circle-icon-calendar" src="/assets/app-images/step-nav.png"/> 
	        </div>
	        <p class="data-text"> 13500 Steps on this day </p>
	      </v-layout>
	      <v-layout row class="data-row">
	        <div class="circle">
	          <img class="circle-icon-calendar" src="/assets/app-images/heart-nav.png"/> 
	        </div>
	        <p class="data-text"> 86 BPM on average </p>
	      </v-layout>
	      <v-layout justify-center>
	        <v-btn @click="closeCalendar" style="center">Close Calendar View</v-btn>
	      </v-layout>
	    </v-card>
	  </div>
</template>

<script>
export default {
  name: 'CalendarView',
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
    font-size: 20px;
    line-height: 40px;
  }
</style>