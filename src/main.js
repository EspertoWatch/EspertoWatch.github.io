import Vue from 'vue'
import App from './App.vue'
import Profile from './Profile.vue'
import HeartRate from './HeartRate.vue'
import StepCount from './StepCount.vue'
import Home from './Home.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import {store} from './Store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VModal from 'vue-js-modal'

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VModal);

//globally register the icon component
Vue.component('icon', Icon)

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
  store,
  render: h => h(App)
})
