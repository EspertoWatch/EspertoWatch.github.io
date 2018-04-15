<template>
  <div id="profile">
    <v-layout row justify-center>
      <v-flex xs10>
        <p class="section-header-text">About Me</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Name</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.name}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Birth Date</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.birthDate | timestampToBirthDate}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Height</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.height.value}} {{user.height.unit}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Weight</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.weight.value}} {{user.weight.unit}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Handedness</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.handedness}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Gender</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{user.gender}}</p>
                        </v-flex>
                        <icon class="icon-style" name="edit" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
      </v-layout>
      <v-layout row justify-space-around style="margin-bottom: 10px">
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                      <v-flex xs3>
                          <p class="text-field-label">My Device</p>
                      </v-flex>
                      <v-flex xs5>
                          <p class="text-field-value">{{device.name}} {{device.version}}</p>
                      </v-flex>
                      <icon class="icon-style" name="info-circle" scale="2"></icon>
                    </v-layout>
                </v-card>
            </v-flex>
            <v-flex xs5>
                <v-card>
                    <v-layout row justify-space-between>
                        <v-flex xs3>
                            <p class="text-field-label">Last Synced</p>
                        </v-flex>
                        <v-flex xs5>
                            <p class="text-field-value">{{device.lastSynced | timestampToSyncDate}}</p>
                        </v-flex>
                        <icon class="icon-style" name="info-circle" scale="2"></icon>
                    </v-layout>
                </v-card>
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