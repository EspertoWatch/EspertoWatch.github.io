<template>
    <v-card>
      <v-layout row justify-space-between>
        <v-flex xs3>
          <p class="text-field-label">{{label}}</p>
        </v-flex>
        <v-flex xs5>
          <p class="text-field-value">{{value}}</p>
        </v-flex>
        <icon class="icon-style" :name="iconName" scale="2"></icon>
      </v-layout>
    </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'editField',
  data () {
    return {
      msg: 'Profile Section'
    }
  },
  props: {
    iconName: String,
    label: String,
    value: String
  },
}
</script>

<style lang="scss">
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