import Vue from 'vue'
import App from './App.vue'
import Profile from './Profile.vue'
import HeartRate from './HeartRate.vue'
import StepCount from './StepCount.vue'
import Home from './Home.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Home },
	{ path: '/profile', component: Profile},
	{ path: '/heartRate', component: HeartRate},
	{ path: '/stepCount', component: StepCount}
];

const router = new VueRouter({routes})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
