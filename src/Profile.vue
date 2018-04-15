<template>
  <div id="profile">
    <v-layout row justify-center>
      <v-flex xs10>
        <p class="section-header-text">About Me</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Name" :value="user.name" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Birth Date" :value="user.birthDate | timestampToBirthDate" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Height" :value="`${user.height.value} ${user.height.unit}`" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Weight" :value="`${user.weight.value} ${user.weight.unit}`" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="Handedness" :value="user.handedness" iconName="edit"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Gender" :value="user.gender" iconName="edit"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <EditField label="My Device" :value="`${device.name} ${device.version}`" iconName="info-circle"/>
            </v-flex>
            <v-flex xs5>
                <EditField label="Last Synced" :value="device.lastSynced | timestampToSyncDate" iconName="info-circle"/>
            </v-flex>
      </v-layout>
      <v-layout row justify-center>
          <v-flex xs10>
            <p class="section-header-text">My Goals</p>
          </v-flex>
      </v-layout>
  </div>
</template>

<script>
import moment from 'moment'
import EditField from './EditField.vue'
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
  },
  filters: {
    timestampToBirthDate(date){
      return moment.unix(date).format('MMM Do YYYY')
    },
    timestampToSyncDate(date){
      return moment.unix(date).fromNow();
    }
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