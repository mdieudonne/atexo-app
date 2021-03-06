import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

require('dotenv').config()
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.timeout = 10000

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
