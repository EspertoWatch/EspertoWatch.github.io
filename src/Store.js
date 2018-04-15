import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex);

//basically stores the state of the whole application
//currently you just see the initial state but that will change
//when users interact with it/api calls are made

//for now the store has fake data but it'll change
export const store = new Vuex.Store({
	state: {
		heartRateData: {
			today: 80,
			yesterday: 78,
			thisWeek: 81,
			lastWeek: 82,
			thisMonth: 80,
			lastMonth: 77,
			thisYear: 76,
			unit: "BPM"
		},
		stepCountData: {
			today: 9000,
			yesterday: 9500,
			thisWeek: 8500,
			lastWeek: 10000,
			thisMonth: 9000,
			lastMonth: 8750,
			thisYear: 9500,
			unit: "Steps"
		},
		device: {
			name: "Esperto Watch",
			version: "1.0",
			lastSynced: 1520673603,
			specs: {
				storageSpaceTotal: "500Mb",
				storageSpaceRemaining: "400Mb",
				RAM: "20Mb",
				sensors: ["Accelerometer", "PPG (Heart Rate)", "Gyroscope", "Sp02 (temperature)"],
				processor: "nRF52",
			},
			image: "",
		},
		user: {
			name: "Austin Atmaja",
			birthDate: 914284800,
			gender: "Male",
			handedness: "Right",
			height: {value: 175, unit: "cm"},
			weight: {value: 150, unit: "lbs"}
		},
		userGoalsData: {}
	},
	mutations: {
		CHANGE_USER_NAME(state, newName){
			state.user.name = newName;
		},
		CHANGE_USER_BIRTHDATE(state, newDate){
			debugger;
			const dateTimeStamp = moment(newDate, 'YYYY-MM-DD').unix();
			state.user.birthDate = dateTimeStamp;
		},
		CHANGE_USER_HEIGHT(state, payload){
			state.user.height.value = payload.value;
			state.user.height.unit = payload.unit;
		},
		CHANGE_USER_WEIGHT(state, payload){
			state.user.weight.value = payload.value;
			state.user.weight.unit = payload.unit;
		},
		CHANGE_USER_HANDEDNESS(state, newHandedness){
			state.user.handedness = newHandedness;
		},
		CHANGE_USER_GENDER(state, newGender){
			state.user.gender = newGender;
		}
	},
	actions: {
  		changeUserName (context, newName) {
  			//api call goes here
    		context.commit('CHANGE_USER_NAME', newName);
  		},
  		changeUserBirthdate(context, newDate){
  			//api call goes here
  			context.commit('CHANGE_USER_BIRTHDATE', newDate);
  		},
  		changeUserHeight(context, payload){
  			//api call goes here
  			context.commit('CHANGE_USER_HEIGHT', payload);
  		},
  		changeUserWeight(context, payload){
  			//api call goes here
  			context.commit('CHANGE_USER_WEIGHT', payload);
  		},
  		changeUserHandedness(context, newHandedness){
  			context.commit('CHANGE_USER_HANDEDNESS', newHandedness);
  		},
  		changeUserGender(context, newGender){
  			context.commit('CHANGE_USER_GENDER', newGender);
  		}
	}
})