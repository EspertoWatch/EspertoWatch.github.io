<template>
  <div id="homeCard">
    <v-toolbar extension-height=40vh>
        <v-layout justify-space-around>
          <div class="circle">
            <img class="circle-icon" 
            v-bind:src="iconSrc">
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
        <img class="left-imgs" src="/assets/app-images/graph-icon.png">
        <v-spacer></v-spacer>
        <img class="left-imgs" src="/assets/app-images/calendar-icon.png">
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
    <v-card height=40vh>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="tab in tabs" :key="tab.title" :id="'tab-' + tab.title">
            <div class="main-value-container">
              <p class="main-value">{{tab.mainValue}}</p>
            </div>
            <div class="divider-container">
              <v-layout row justify-space-between style="margin-bottom: 10px">
                <v-flex xs6 style="border-right: solid 1px #d3d3d3">
                  <p> {{tab | getIntervalString}}</p>
                </v-flex>
                <v-flex xs6>
                  <p> {{tab | getAvgString}}</p>
                </v-flex>
              </v-layout>
            </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'homeCard',
  data () {
    return {
      iconSrc: "/assets/app-images/heart-nav.png",
      title: "My Heart Rate",
      tab: null,
      tabs: [
        {title: "Daily", mainValue: "80 BPM", lastInterval: {status: 'greater', amount: '2 BPM'}, currentAvg: {status: 'less', amount: '1 BPM'}},
        {title: "Weekly", mainValue: "78 BPM", lastInterval: {status: 'less', amount: '5 BPM'}, currentAvg: {status: 'less', amount: '3 BPM'}},
        {title: "Monthly", mainValue: "82 BPM", lastInterval: {status: 'greater', amount: '1 BPM'}, currentAvg: {status: 'greater', amount: '4 BPM'}}
      ]
    }
  },
  filters:{
    getIntervalString(item){
      if(item.title === "Daily"){
        return item.lastInterval.amount + " from yesterday.";
      }
      else if(item.title === "Weekly"){
        return item.lastInterval.amount + " from last week."
      }
      else if(item.title === "Monthly"){
        return item.lastInterval.amount + " from last month."
      }
    },
    getAvgString(item){
      if(item.title === "Daily"){
        return item.currentAvg.amount + " from this week's average.";
      }
      else if(item.title === "Weekly"){
        return item.currentAvg.amount + " from this month's average."
      }
      else if(item.title === "Monthly"){
        return item.currentAvg.amount + " from this year's average."
      }
    }
  } 
}
</script>

<style lang="scss" scoped>
  .circle{
    width: 7vh;
    height: 7vh;
    border-radius: 4vh;
    border: solid 1px;
  }
  .circle-icon{
    margin-top: 1.5vh;
    height: 4vh;
  }
  .title{
    font-size: 2rem !important;
    font-weight: 525; 
    margin: auto;
  }
  .left-imgs{
    height: 4vh;
  }
  .title-container{
    align-items: center
  }
  .main-value-container{
    height: 20vh;
  }
  .divider-container{
    border-bottom: solid 1px #d3d3d3;
    margin-right: 10px;
    margin-left: 10px;
  }
  .main-value{
    font-size: 3rem !important;
    font-weight: 545; 
    line-height: 20vh;
  }
</style>