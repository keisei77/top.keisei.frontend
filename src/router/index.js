import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Watch from '@/views/watch/watch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/map',
      name: 'map',
      component: () =>
        import(/* webpackChunkName: "map" */ '@/views/map/map')
    },
    {
      path: '/watch',
      name: 'watch',
      component: Watch
    }
  ]
})
