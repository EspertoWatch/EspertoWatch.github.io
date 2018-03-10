import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//basically stores the state of the whole application
//currently you just see the initial state but that will change
//when users interact with it/api calls are made
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
		deviceData: {},
		userData: {},
		userGoalsData: {}
	}
})