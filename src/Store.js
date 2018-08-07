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
		heartRateData: {},
		stepCountData: {},
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
			const yesterday = 12000;
			const thisWeek = 13000;
			const lastWeek = 12000;

			const thisMonth = 13000;
            const lastMonth = 12000;
			return {today: today, yesterday: yesterday, thisWeek: thisWeek, lastWeek: lastWeek, thisMonth: thisMonth, lastMonth: lastMonth, unit: state.stepCountData.unit};
		},
        getHomeCardHeartRateData: state => {
            //todo: remove hardcoded vals
            const today = state.heartRateData.currentHR;
            const yesterday = 85;
			const thisWeek = 90;
			const lastWeek = 85;

			const thisMonth = 80;
            const lastMonth = 85;
            return {today: today, yesterday: yesterday, thisWeek: thisWeek, lastWeek: lastWeek, thisMonth: thisMonth, lastMonth: lastMonth, unit: state.heartRateData.unit};
        },
		stepGoalProgress: state => {
			return Math.round((state.stepCountData.currentSteps/state.userGoalsData.stepGoals.currentGoal)*100, 1);
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
			state.heartRateData.unit = "BPM";
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
