import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ui框架
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// filters
import * as filters from './filters'

Vue.config.productionTip = false
Vue.use(ElementUI) // global filters

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
