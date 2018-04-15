<template>
    <v-card>
      <v-layout row justify-space-between>
        <v-flex xs3>
          <p class="text-field-label">{{label}}</p>
        </v-flex>
        <v-flex xs5>
          <p v-if="!isEditing" class="text-field-value">{{getDisplayValue}}</p>
          <v-text-field v-if="isEditing" :value="value"/>
          <v-select v-if="isEditing && type==='unitField'" :items="options" :value="unit"/>
        </v-flex>
        <div v-on:click="onPressIcon">
            <icon v-if="!isEditing" class="icon-style" :name="iconName" scale="2"/>
            <icon v-else class="icon-style" name="check" scale="2"/>
        </div>
      </v-layout>
    </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'editField',
  data () {
    return {
      isEditing: false
    }
  },
  props: {
    iconName: String,
    label: String,
    value: String,
    type: String,
    options: Array,
    unit: String
  },
  methods: {
    onPressIcon: function(){
      if(this.type !== "info"){
        this.isEditing = !this.isEditing;
      }
    }
  },
  computed: {
    getDisplayValue: function(){
      if(this.type === "unitField"){
        return this.value.toString() + this.unit;
      }
      else{
        return this.value;
      }
    }
  }
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