import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios';
import { API } from 'aws-amplify';
import Amplify from 'aws-amplify';
import config from "./config";
import { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "esperto-app",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

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
		user: {},
		loginStatus: {
			isLoggedIn: false,
			mustChangePass: false,
		},
		userGoalsData: {
			heartRateGoals: {},
			stepGoals: {}
		}
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
        },
		stepGoalProgress: state => {
			const currentSteps = state.stepCountData.current;
			const stepCountGoal = state.userGoalsData.stepGoals.currentGoal;
			return (currentSteps/stepCountGoal)*100;
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
			state.user.height = payload.value;
			state.user.heightUnit = payload.unit;
		},
		CHANGE_USER_WEIGHT(state, payload){
			state.user.weight = payload.value;
			state.user.weightUnit = payload.unit;
		},
		CHANGE_USER_HANDEDNESS(state, newHandedness){
			state.user.handedness = newHandedness;
		},
		CHANGE_USER_GENDER(state, newGender){
			state.user.gender = newGender;
		},
		CHANGE_STEP_GOAL(state, newGoal){
			state.userGoalsData.stepGoals.currentGoal = newGoal;
		},
		CHANGE_HEART_GOAL(state, newGoal){
			state.userGoalsData.heartRateGoals.currentGoal = newGoal;
		},
        GET_STEP_COUNT(state, stepCount){
            state.stepCountData.current = stepCount.current;
            state.stepCountData.dailySteps = stepCount.dailySteps.values;
        },
        GET_HEART_RATE(state, heartRate){
            state.heartRateData.current = heartRate.current;
            state.heartRateData.dailyHR = heartRate.dailyHR.values;
        },
		LOGOUT_SUCCESS(state){
			//reset to default state upon logout
			state.loginStatus = {
				isLoggedIn: false,
				mustChangePass: false,
			}
		},
		GET_USER_INFO(state, userInfo){
			state.user = userInfo;
			state.loginStatus.isLoggedIn = true;
		},
		GET_USER_STEP_GOALS(state, stepGoals){
			state.userGoalsData.stepGoals = stepGoals;
		},
		GET_USER_HEART_GOALS(state, heartRateGoals){
			state.userGoalsData.heartRateGoals = heartRateGoals;
		},
		NEW_PASS_REQUIRED(state, cognitoUser){
			state.cognitoUser = cognitoUser;
			state.loginStatus.mustChangePass = true;
		}
	},
	actions: {
  		async changeUserName (context, newName) {
  			const userObj = Object.assign({}, context.state.user);
			userObj.name = newName;
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
    		context.commit('CHANGE_USER_NAME', newName);
  		},
  		async changeUserBirthdate(context, newDate){
			const userObj = Object.assign({}, context.state.user);
			userObj.birthDate = newDate;
  			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
  			context.commit('CHANGE_USER_BIRTHDATE', newDate);
  		},
  		async changeUserHeight(context, payload){
			const userObj = Object.assign({}, context.state.user);
			userObj.height = payload.value;
			userObj.heightUnit = payload.unit;
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
  			context.commit('CHANGE_USER_HEIGHT', payload);
  		},
  		async changeUserWeight(context, payload){
  			const userObj = Object.assign({}, context.state.user);
			userObj.weight = payload.value;
			userObj.weightUnit = payload.unit;
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
  			context.commit('CHANGE_USER_WEIGHT', payload);
  		},
  		async changeUserHandedness(context, newHandedness){
			const userObj = Object.assign({}, context.state.user);
			userObj.handedness = newHandedness;
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
  			context.commit('CHANGE_USER_HANDEDNESS', newHandedness);
  		},
  		async changeUserGender(context, newGender){
			const userObj = Object.assign({}, context.state.user);
			userObj.gender = newGender;
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
  			context.commit('CHANGE_USER_GENDER', newGender);
  		},
		
		//still need to add api calls here
		//right now newGoal just contains new int to be set as currentGoal
		//eventually will need to be an object with isAutoset and currentGoal
		changeStepGoal(context, newGoal){
			context.commit('CHANGE_STEP_GOAL', newGoal);
		},
		changeHeartGoal(context, newGoal){
			context.commit('CHANGE_HEART_GOAL', newGoal);
		},

  		async getStepCountData(context){
            const stepCount = await API.get('StepCountCRUD', `/StepCount/${context.state.user.username}`);
			context.commit('GET_STEP_COUNT', stepCount[0]);
		},
        async getHeartRateData(context){
            const heartRate = await API.get('HeartRateCRUD', `/HeartRate/${context.state.user.username}`);
            context.commit('GET_HEART_RATE', heartRate[0]);
        },
		async getUserInfo(context, userId){
			const id = userId ? userId : context.state.user.userId
			const userInfo = await API.get('esperto-app', `/userInfo/${id}`);
			context.commit('GET_USER_INFO', userInfo);
		},
		async getStepCountGoals(context){
			const stepCountGoals = await API.get('StepCountGoalsCRUD', `/StepCountGoals/${context.state.user.username}`);
			context.commit('GET_USER_STEP_GOALS', stepCountGoals[0]);
		},
		async getHeartRateGoals(context){
			const heartRateGoals = await API.get('HeartRateGoalsCRUD', `/HeartRateGoals/${context.state.user.username}`);
			context.commit('GET_USER_HEART_GOALS', heartRateGoals[0]);
		},
		async login(context, loginAttempt){
			try {
				await Auth.signIn(loginAttempt.username, loginAttempt.password)
					.then(function(res){
						if(res.challengeName === 'NEW_PASSWORD_REQUIRED'){
							context.commit('NEW_PASS_REQUIRED', res);
						}
						else{
							context.dispatch('getUserInfo', res.username);
						}
					});
			} catch (e) {
				alert(e.message);
			}
		},

		//need to update to use cognito
		async signUp(context, signUpData){
            //todo: once server changes are made to make signup more secure, need to update this action
            await API.post('AccountsCRUD', '/Accounts', signUpData);
            context.commit('LOGIN_SUCCESS', signUpData);
		},

		async checkAuthentication(context){
			await Auth.currentUserInfo()
					.then(function(res){
						if(res){
							context.dispatch('getUserInfo', res.username)
						}
						else{
							console.log('No user signed in');
						}
					});
		},
		async resetPassword(context, payload){
			await Auth.completeNewPassword(payload.cognitoUser, payload.password, {email: payload.email})
				.then(function(res){
					context.dispatch('getUserInfo', payload.cognitoUser.username);
				});
		},
		async logout(context){
			 await Auth.signOut()
			 	.then(function(){
					 context.commit('LOGOUT_SUCCESS');
				 });
		}
	}
})
