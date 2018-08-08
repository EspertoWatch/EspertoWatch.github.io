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
			avgHourlyHR: {},
			avgDailyHR: {}
		},
		stepCountData: {
			totalDailySteps: {}
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
		signUpInfo: {},
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
			//todo: remove hardcoded vals
			const today = state.stepCountData.currentSteps;
			const yesterday = state.stepCountData.totalDailySteps[moment().subtract(1, 'day').format("YYYY-MM-DD")] ? Math.round(state.stepCountData.totalDailySteps[moment().subtract(1, 'day').format("YYYY-MM-DD")], 1) : 0;

			let thisWkSum = state.stepCountData.currentSteps;
			let thisWkCounter = 1;
			for(let i = 1; i < 6; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					thisWkCounter++;
					thisWkSum = thisWkSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const thisWeek = Math.round(thisWkSum/thisWkCounter, 1);

			let lastWkSum = 0;
			let lastWkCounter = 0;
			for(let i = 6; i < 13; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					lastWkCounter++;
					lastWkSum = lastWkSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const lastWeek = Math.round(lastWkSum/lastWkCounter, 1);

			let thisMonthSum = state.stepCountData.currentSteps;
			let thisMonthCounter = 1;
			for(let i = 1; i < 30; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.stepCountData.totalDailySteps[date]){
					thisMonthCounter++;
					thisMonthSum = thisMonthSum + state.stepCountData.totalDailySteps[date];
				}
			}
			const thisMonth = Math.round(thisMonthSum/thisMonthCounter, 1);

            const lastMonth = 12000;
			const unit = state.stepCountData.unit;
			let tabData = [
				{
					title: "Today",
					mainValue: today,
					lastInterval: today - yesterday,
					unit: unit
				},
				{
					title: "This Week",
					mainValue: thisWeek,
					lastInterval: thisWeek - lastWeek,
					unit: unit
				},
				{
					title: "This Month",
					mainValue: thisMonth,
					totalValue: thisMonthSum,
					unit: unit
				},
			];
			return tabData;
		},
        getHomeCardHeartRateData: state => {
            //todo: remove hardcoded vals
            const current = Math.round(state.heartRateData.currentHR, 1);

			const lastHrSuffix = moment().hour() > 11 ? (moment().hour() - 1).toString() : "0" + (moment().hour() - 1).toString();
			const lastHR = state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD") + " " + lastHrSuffix] ? state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD") + " " + lastHrSuffix] : 0;

			const today = state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD")] ? Math.round(state.heartRateData.avgDailyHR[moment().format("YYYY-MM-DD")], 1) : 0;
            const yesterday = state.heartRateData.avgDailyHR[moment().subtract(1, 'day').format("YYYY-MM-DD")] ? Math.round(state.heartRateData.avgDailyHR[moment().subtract(1, 'day').format("YYYY-MM-DD")], 1) : 0;
			
			let thisWkSum = 0;
			let thisWkCounter = 0;
			for(let i = 0; i < 6; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.heartRateData.avgDailyHR[date]){
					thisWkCounter++;
					thisWkSum = thisWkSum + state.heartRateData.avgDailyHR[date];
				}
			}
			const thisWeek = Math.round(thisWkSum/thisWkCounter, 1);

			let lastWkSum = 0;
			let lastWkCounter = 0;
			for(let i = 6; i < 13; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				if(state.heartRateData.avgDailyHR[date]){
					lastWkCounter++;
					lastWkSum = lastWkSum + state.heartRateData.avgDailyHR[date];
				}
			}
			const lastWeek = Math.round(lastWkSum/lastWkCounter, 1);


			const unit = state.heartRateData.unit;
			let tabData = [
				{
					title: "Current",
					mainValue: current,
					lastInterval: current - lastHR,
					unit: unit
				},
				{
					title: "Today",
					mainValue: today,
					lastInterval: today - yesterday,
					unit: unit
				},
				{
					title: "This Week",
					mainValue: thisWeek,
					lastInterval: thisWeek - lastWeek,
					unit: unit
				},
			];
			return tabData;
        },
		stepGoalProgress: state => {
			return Math.round((state.stepCountData.currentSteps/state.userGoalsData.stepGoals.currentGoal)*100, 2);
		},
		getMonthSteps: state => {
			let monthSteps = [state.stepCountData.currentSteps];
			for(let i = 1; i < 30; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const numSteps = state.stepCountData.totalDailySteps[date] ? state.stepCountData.totalDailySteps[date] : 0;
				monthSteps.unshift(numSteps);
			}
			return monthSteps;
		},
		getTodayHR: state => {
			let todayHR = [state.heartRateData.currentHR];
			for(let i = 0; i < 24; i ++){
				const key = i < 10 ? moment().format("YYYY-MM-DD") + " 0" + i.toString() : moment().format("YYYY-MM-DD") + " " + i.toString();
				const hrVal = state.heartRateData.avgHourlyHR[key] ? state.heartRateData.avgHourlyHR[key] : 0;
				todayHR.push(hrVal);
			}
			return todayHR;
		},
		getWeekHR: state => {
			let weekHR = [];
			for(let i = 0; i < 6; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				const hrVal = state.heartRateData.avgDailyHR[date] ? state.heartRateData.avgDailyHR[date] : 0;
				weekHR.unshift(hrVal);
			}
			return weekHR;
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
            state.stepCountData = stepCount;
			state.stepCountData.unit = "Steps";
        },
        GET_HEART_RATE(state, heartRate){
            state.heartRateData = heartRate;
			heartRate.avgHourlyHR;
			state.heartRateData.unit = "BPM";

			let avgDailyHR = {};
			for(let i = 0; i < 13; i ++){
				const date = moment().subtract(i, 'day').format("YYYY-MM-DD");
				let sum = 0;
				let numVals = 0;
				for(let j = 0; j < 24; j++){
					const key = j < 10 ? date + " 0" + j.toString() : date + " " + j.toString();
					if(heartRate.avgHourlyHR[key]){
						sum = sum + heartRate.avgHourlyHR[key];
						numVals = numVals + 1;
					}
				}
				avgDailyHR[date] = sum === 0 ? 0 : sum/numVals;
			}

			state.heartRateData.avgDailyHR = avgDailyHR;
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
		},
		STORE_SIGN_UP_INFO(state, signUpInfo){
			state.signUpInfo = signUpInfo;
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
		async changeStepGoal(context, newGoal){
			const goalObj = Object.assign({}, context.state.userGoalsData.stepGoals);
			goalObj.currentGoal = newGoal;
			const res = await API.post('esperto-app', '/stepCountGoals', {body: goalObj});
			context.commit('CHANGE_STEP_GOAL', newGoal);
		},
		async changeHeartGoal(context, newGoal){
			const goalObj = Object.assign({}, context.state.userGoalsData.heartRateGoals);
			goalObj.currentGoal = newGoal;
			const res = await API.post('esperto-app', '/heartRateGoals', {body: goalObj})
			context.commit('CHANGE_HEART_GOAL', newGoal);
		},

  		async getStepCountData(context){
            const stepCount = await API.get('esperto-app', `/stepCount/${context.state.user.userId}`);
			context.commit('GET_STEP_COUNT', stepCount);
		},
        async getHeartRateData(context){
            const heartRate = await API.get('esperto-app', `/heartRate/${context.state.user.userId}`);
            context.commit('GET_HEART_RATE', heartRate);
        },
		async getUserInfo(context, userId){
			const id = userId ? userId : context.state.user.userId
			const userInfo = await API.get('esperto-app', `/userInfo/${id}`);
			context.commit('GET_USER_INFO', userInfo);
		},
		async postUserInfo(context, userObj){
			const res = await API.post('esperto-app', '/userInfo', {body: userObj});
			context.commit('GET_USER_INFO', userObj);
		},
		async getStepCountGoals(context){
			const stepCountGoals = await API.get('esperto-app', `/stepCountGoals/${context.state.user.userId}`);
			context.commit('GET_USER_STEP_GOALS', stepCountGoals);
		},
		async getHeartRateGoals(context){
			const heartRateGoals = await API.get('esperto-app', `/heartRateGoals/${context.state.user.userId}`);
			context.commit('GET_USER_HEART_GOALS', heartRateGoals);
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
			try{
				await Auth.signUp({username: signUpData.username, password: signUpData.password}).then(function(res){
					const signUpInfo = Object.assign({}, signUpData);
					debugger;
					signUpInfo.userId = res.userSub
					context.commit('STORE_SIGN_UP_INFO', signUpInfo);
				});
			} catch(e){
				alert(e.message);
			}
		},
		async confirmSignUp(context, confirmationCode){
			try {
				await Auth.confirmSignUp(context.state.signUpInfo.username, confirmationCode).then(function(res){
					const userInfo = {
						"name": context.state.signUpInfo.firstName + " " + context.state.signUpInfo.lastName,
						"userId": context.state.signUpInfo.userId
					};
					context.dispatch('postUserInfo', userInfo);
				})
				//await Auth.signIn(this.state.email, this.state.password);
			} catch (e) {
				alert(e.message);
			}
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
