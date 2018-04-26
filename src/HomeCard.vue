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
              <p class="main-value">{{tab.mainValue}}</p>
            </div>
            <div class="divider-container">
              <v-layout row justify-space-between style="margin-bottom: 10px">
                <v-flex xs6 style="border-right: solid 1px #d3d3d3">
                  <p class="sub-text"> {{tab | getIntervalString}}</p>
                </v-flex>
                <v-flex xs6>
                  <p class="sub-text"> {{tab | getAvgString}}</p>
                </v-flex>
              </v-layout>
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <modal name="calendarModal" width="400" height="auto" scrollable>
      <CalendarView @closeCalendar="closeCalendarModal"></CalendarView>
    </modal>
    <modal name="chartModal" width="400" height="auto" scrollable>
      <v-card>
        <BarChart :data="chartMetaData" :options="chartOptions" class="chart"></BarChart>
        <v-layout justify-center>
          <v-btn @click="closeChartModal">Close Chart View</v-btn>
        </v-layout>
      </v-card>
    </modal>
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
  },
  computed: {
      chartMetaData(){
          return {
              labels: [1, 2, 3, 4, 5, 6, 7],
              datasets: [
                  {
                      label: this.title,
                      backgroundColor: '#f87979',
                      data: this.chartData
                  }
              ]
          }
      },
      chartOptions(){
          return{
              title: {
                  display: true,
                  text: `${this.title} Over 7 Days`,
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
    }
  },
  methods: {
    showCalendarModal () {
      this.$modal.show('calendarModal');
    },
    closeCalendarModal () {
      this.$modal.hide('calendarModal');
    },
    showChartModal(){
      this.$modal.show('chartModal');
    },
    closeChartModal(){
      this.$modal.hide('chartModal');
    }
  },
  filters:{
    getIntervalString(item){
      if(item.title === "Daily"){
        return item.lastInterval + " from yesterday.";
      }
      else if(item.title === "Weekly"){
        return item.lastInterval + " from last week."
      }
      else if(item.title === "Monthly"){
        return item.lastInterval + " from last month."
      }
    },
    getAvgString(item){
      if(item.title === "Daily"){
        return item.currentAvg + " from this week's average.";
      }
      else if(item.title === "Weekly"){
        return item.currentAvg + " from this month's average."
      }
      else if(item.title === "Monthly"){
        return item.currentAvg + " from this year's average."
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
    font-size: 1.2rem !important;
    margin-right: 10px;
    margin-left: 10px;
  }
  .chart{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>