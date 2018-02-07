import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(Vuex)

// temp store
const store = new Vuex.Store({
  state: {
    name: ''
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
