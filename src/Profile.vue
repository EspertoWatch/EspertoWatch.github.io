<template>
  <div id="profile">
    <v-layout row justify-center>
      <v-flex xs10>
        <p class="section-header-text">About Me</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Name" :value="user.name" iconName="edit" :submitFunction="changeUserName"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Birth Date" :value="user.birthDate | timestampToBirthDate" type="dateSelector" iconName="edit" :submitFunction="changeUserBirthdate"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Height" :value="user.height" :unit="user.heightUnit" :options="['cm', 'inches']" iconName="edit" type="unitField" :submitFunction="changeUserHeight"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Weight" :value="user.weight" :unit="user.weightUnit" :options="['lbs', 'kg']" type="unitField" iconName="edit" :submitFunction="changeUserWeight"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Handedness" :value="user.handedness" iconName="edit" :submitFunction="changeUserHandedness"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Gender" :value="user.gender" iconName="edit" :submitFunction="changeUserGender"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="My Device" :value="`${device.name} ${device.version}`" type="info" iconName="info-circle"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Last Synced" :value="device.lastSynced | timestampToSyncDate" type="info" iconName="info-circle"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-center>
          <v-flex xs10>
            <p class="section-header-text">My Goals</p>
          </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Heart Rate" :value="heartRateGoals.currentGoal" :submitFunction="changeHeartGoal" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Step Count" :value="stepGoals.currentGoal" :submitFunction="changeStepGoal"  iconName="edit"/>
            </v-flex>
      </v-layout>
  </div>
</template>

<script>
import moment from 'moment'
import EditField from './EditField.vue'
import { mapActions } from 'vuex'
export default {
  name: 'profile',
  data () {
    return {
      msg: 'Profile Section'
    }
  },
  computed: {
    user(){
      return this.$store.state.user;
    },
    device(){
      return this.$store.state.device;
    },
    heartRateGoals(){
      return this.$store.state.userGoalsData.heartRateGoals;
    },
    stepGoals(){
      return this.$store.state.userGoalsData.stepGoals;
    },
  },
  filters: {
    timestampToReadableBirthDate(date){
      return moment.unix(date).format('MMM Do YYYY')
    },
    timestampToBirthDate(date){
      return moment.unix(date).format('YYYY-MM-DD');
    },
    timestampToSyncDate(date){
      return moment.unix(date).fromNow();
    }
  },
  methods: {
    ...mapActions([
        'changeUserName',
        'changeUserBirthdate',
        'changeUserHeight',
        'changeUserWeight',
        'changeUserHandedness',
        'changeUserGender',
        'changeStepGoal',
        'changeHeartGoal',
        'getUserInfo',
        'getStepCountGoals',
        'getHeartRateGoals'
      ]),
  },
  mounted: function () {
      this.getUserInfo();
      this.getStepCountGoals();
      this.getHeartRateGoals();
  },
  components: {
    EditField
  }
}
</script>

<style lang="scss">
#profile {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.section-header-text{
  font-size: 40px;
  font-weight: normal;
}
.text-field-label{
  text-align: center;
  font-size: 20px;
  margin-top: 16px;
}
.text-field-value{
  text-align: center;
  font-size: 20px;
  color: #A9A9A9;
  margin-top: 16px;
}
.icon-style{
  margin-top: 15px;
  margin-right: 15px;
}
</style>