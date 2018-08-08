<template>
  <div id="homeCard">
    <v-toolbar extension-height=40 style="backgroundColor: #fff">
        <v-layout justify-space-around>
          <div class="circle">
            <router-link :to="link"><img class="circle-icon" v-bind:src="iconSrc"></router-link>
          </div>
        </v-layout>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-toolbar-title class="title">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <img class="left-imgs" @click="showChartModal" src="/assets/app-images/graph-icon.png">
        <v-spacer></v-spacer>
        <img class="left-imgs" @click="showCalendarModal" src="/assets/app-images/calendar-icon.png">
        <v-tabs centered
          slot="extension"
          slider-color="cyan"
          slider-width=2px
          height=40px
          v-model="tab"
        >
          <v-tab v-for="tab in tabs" :key="tab.title" :href="'#tab-' + tab.title">
            {{tab.title}}
          </v-tab>
        </v-tabs>
    </v-toolbar>
    <v-card height=225px>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.title" :id="'tab-' + tab.title">
            <div class="main-value-container">
              <p class="main-value">{{tab.mainValue + " " + tab.unit}}</p>
            </div>
            <div class="divider-container">
              <v-layout row justify-center style="margin-bottom: 10px">
                <v-flex xs1 v-if="showUpIcon(tab) !== false">
                  <div v-if="showUpIcon(tab) === 'green'">
                    <v-icon large color="green darken-2">arrow_drop_up</v-icon>
                  </div>
                  <div v-else-if="showUpIcon(tab) === 'red'">
                    <v-icon large color="red darken-2">arrow_drop_down</v-icon>
                  </div>
                </v-flex>
                <p class="sub-text"> {{tab | getIntervalString}}</p>
              </v-layout>
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-dialog v-model="calendarModal" max-width="400">
      <CalendarView></CalendarView>
    </v-dialog>
    <v-dialog v-model="chartModal" max-width="500">
        <v-card style="padding-bottom: 50px;">
            <BarChart :data="chartMetaData" :options="chartOptions" class="chart"></BarChart>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CalendarView from './CalendarView.vue'
import LineChart from './Charts/LineChart.vue'
import BarChart from './Charts/BarChart.vue'

export default {
  name: 'homeCard',
  props: {
    iconSrc: String,
    title: String,
    tabs: Array,
    link: String,
    chartData: Array,
    chartColor: String,
    chartTitle: String
  },
  computed: {
      chartMetaData(){
          return {
              labels: this.getLabels(),
              datasets: [
                  {
                      label: this.title,
                      backgroundColor: this.chartColor,
                      data: this.chartData
                  }
              ]
          }
      },
      chartOptions(){
          return{
              title: {
                  display: true,
                  text: this.chartTitle,
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
      }
  },
  data () {
    return {
      tab: null,
      chartModal: false,
      calendarModal: false
    }
  },
  methods: {
    showCalendarModal () {
      this.calendarModal = true;
    },
    showChartModal(){
      this.chartModal = true;
    },
    getLabels(){
      const n = this.chartData.length; 
      return Array.from(Array(n).keys());
    },
    showUpIcon(item){
      if(item.title === "This Month"){
        return false;
      }
      else if(item.lastInterval > 0){
        return "green";
      }
      else{
        return "red";
      }
      return item.lastInterval > 0;
    }
  },
  filters:{
    getIntervalString(item){
      const lastInt = Math.abs(item.lastInterval);
      const unit = item.unit;
      if(item.title === "Today"){
        return lastInt + " " + unit + " from yesterday.";
      }
      else if(item.title === "This Week"){
        return lastInt + " " + unit + " from last week."
      }
      else if(item.title === "This Month"){
        return item.totalValue + " " + unit + " in total."
      }
      else if(item.title === "Current"){
        return lastInt + " " + unit + " from last hour."
      }
    }
  },
  components: {
    CalendarView,
    LineChart,
    BarChart
  }
}
</script>

<style lang="scss" scoped>
  #homeCard{
    text-align: center
  }
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
  .title{
    font-size: 2rem !important;
    font-weight: 525;
    margin: auto;
  }
  .left-imgs{
    height: 20px;
  }
  .title-container{
    align-items: center
  }
  .main-value-container{
    height: 150px;
  }
  .divider-container{
    margin-right: 10px;
    margin-left: 10px;
    height: 50px;
  }
  .main-value{
    font-size: 3.2rem !important;
    font-weight: 545;
    line-height: 150px;
  }
  .sub-text{
    font-size: 1.5rem !important;
    margin-right: 10px;
    margin-left: 10px;
  }
  .chart{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>