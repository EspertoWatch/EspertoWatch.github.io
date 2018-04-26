import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios';
import { API } from 'aws-amplify';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

Vue.use(Vuex);
"use strict";

//basically stores the state of the whole application
//currently you just see the initial state but that will change
//when users interact with it/api calls are made

//for now the store has fake data but it'll change
export const store = new Vuex.Store({
	state: {
		heartRateData: {
            current: '',
            dailyHR: [],
            //below this line is fake data (not coming from api)
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
			current: '',
			dailySteps: [],
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
			birthDate: 914284800,
			gender: "Male",
			handedness: "Right",
			height: {value: 175, unit: "cm"},
			weight: {value: 150, unit: "lbs"},
			isLoggedIn: false
		},
		userGoalsData: {}
	},
	getters: {
		getHomeCardStepData: state => {
			//todo: fix sketchy logic once we better define step count db schema
			const today = state.stepCountData.current;
			const yesterday = state.stepCountData.dailySteps[1];
			const weekStepsArray = state.stepCountData.dailySteps.slice(0, 7);
			const thisWeek = Math.round(weekStepsArray.reduce((a,b) => a + b, 0) / weekStepsArray.length, 0);
			const lastWeekStepsArray = state.stepCountData.dailySteps.slice(7, 14);
			const lastWeek = Math.round(lastWeekStepsArray.reduce((a,b) => a + b, 0) / lastWeekStepsArray.length, 0);

			const thisMonthStepsArray = state.stepCountData.dailySteps.slice(0, 30);
			const thisMonth = Math.round(thisMonthStepsArray.reduce((a,b) => a + b, 0) / thisMonthStepsArray.length, 0);
			const lastMonthStepsArray = state.stepCountData.dailySteps.slice(30, 60);
            const lastMonth = Math.round(lastMonthStepsArray.reduce((a,b) => a + b, 0) / lastMonthStepsArray.length, 0);
			return {today: today, yesterday: yesterday, thisWeek: thisWeek, lastWeek: lastWeek, thisMonth: thisMonth, lastMonth: lastMonth, unit: state.stepCountData.unit};
		},
        getHomeCardHeartRateData: state => {
            //todo: fix sketchy logic once we better define heart rate db schema
            const today = state.heartRateData.current;
            const yesterday = state.heartRateData.dailyHR[1];
            const weekStepsArray = state.heartRateData.dailyHR.slice(0, 7);
            const thisWeek = Math.round(weekStepsArray.reduce((a,b) => a + b, 0) / weekStepsArray.length, 0);
            const lastWeekStepsArray = state.heartRateData.dailyHR.slice(7, 14);
            const lastWeek = Math.round(lastWeekStepsArray.reduce((a,b) => a + b, 0) / lastWeekStepsArray.length, 0);

            const thisMonthStepsArray = state.heartRateData.dailyHR.slice(0, 30);
            const thisMonth = Math.round(thisMonthStepsArray.reduce((a,b) => a + b, 0) / thisMonthStepsArray.length, 0);
            const lastMonthStepsArray = state.heartRateData.dailyHR.slice(30, 60);
            const lastMonth = Math.round(lastMonthStepsArray.reduce((a,b) => a + b, 0) / lastMonthStepsArray.length, 0);
            return {today: today, yesterday: yesterday, thisWeek: thisWeek, lastWeek: lastWeek, thisMonth: thisMonth, lastMonth: lastMonth, unit: state.heartRateData.unit};
        }
	},
	mutations: {
		CHANGE_USER_NAME(state, newName){
			state.user.name = newName;
		},
		CHANGE_USER_BIRTHDATE(state, newDate){
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
		},
		GET_HEART_RATE(state, heartRate){
			state.user.apiHeartRate = heartRate;
		},
        GET_STEP_COUNT(state, stepCount){
            state.stepCountData.current = stepCount.currentSteps;
            state.stepCountData.dailySteps = stepCount.dailySteps.values;
        },
        GET_HEART_RATE(state, heartRate){
            state.heartRateData.current = heartRate.currentHR;
            state.heartRateData.dailyHR = heartRate.dailyHR.values;
        },
		LOGIN_SUCCESS(state, accountInfo){
			state.user.username = accountInfo.username;
			state.user.name = `${accountInfo.firstName} ${accountInfo.lastName}`;
			state.user.isLoggedIn = true;
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
  		},
  		async getStepCountData(context){
            const stepCount = await API.get('StepCountCRUD', `/StepCount/${context.state.user.username}`);
			context.commit('GET_STEP_COUNT', stepCount[0]);
		},
        async getHeartRateData(context){
            const heartRate = await API.get('HeartRateCRUD', `/HeartRate/${context.state.user.username}`);
            context.commit('GET_HEART_RATE', heartRate[0]);
        },
		async login(context, loginAttempt){
  			//todo: once server changes are made to make login more secure, need to update this action
			const accountInfo = await API.get('AccountsCRUD', `/Accounts/${loginAttempt.username}`);
			if( (accountInfo.length > 0) && (accountInfo[0].password === loginAttempt.password) ){
				context.commit('LOGIN_SUCCESS', accountInfo[0]);
			}
		},
		async signUp(context, signUpData){
            //todo: once server changes are made to make signup more secure, need to update this action
            await API.post('AccountsCRUD', '/Accounts', signUpData);
            context.commit('LOGIN_SUCCESS', signUpData);
		}
	}
})
