import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create-wallet',
      name: 'create-wallet',
      component: () => import('./views/createwallet')
    },
    {
      path: '/restore-wallet',
      name: 'restore-wallet',
      component: () => import('./views/restorewallet')
    },
    {
      path: '/token',
      name: 'token',
      component: () => import('./views/token')
    }
  ]
})
