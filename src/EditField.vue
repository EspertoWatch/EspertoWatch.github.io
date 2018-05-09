<template>
    <v-card>
      <v-layout row justify-space-between>
        <v-flex xs3>
          <p class="text-field-label">{{label}}</p>
        </v-flex>
        <v-flex xs7>
          <p v-if="!isEditing" class="text-field-value">{{getDisplayValue}}</p>
          <template v-else-if="type === 'dateSelector'">
              <v-date-picker :full-width="true" v-model="value" color="blue"/>
          </template>
          <template v-else>
            <v-text-field v-model="value"/>
            <v-select v-if="type==='unitField'" :items="options" v-model="unit"/>
          </template>
        </v-flex>
        <div v-on:click="onPressIcon">
            <icon class="icon-style" :name="isEditing ? 'check' : iconName" scale="2"/>
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
    value: [String, Number],
    type: String,
    options: Array,
    unit: String,
    submitFunction: Function,
  },
  methods: {
    onPressIcon: function(){
      if(this.type !== "info"){
        if(this.isEditing){
          if(this.type === "unitField"){
            const payload = {value: parseInt(this.value, 10), unit: this.unit}
            this.submitFunction(payload);
          }
          else{
             this.submitFunction(this.value);
          }
        }
        this.isEditing = !this.isEditing;
      }
    }
  },
  computed: {
    getDisplayValue: function(){
      if(this.type === "unitField"){
        return this.value.toString() + this.unit;
      }
      else if(this.type ==="dateSelector"){
        return moment(this.value, 'YYYY-MM-DD').format('MMM Do YYYY');
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