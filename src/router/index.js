import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /**
   * Network Tools
   */
  {
    path: '/vlsm',
    name: 'networktools-vlsm',
    component: () => import(/* webpackChunkName: "vlsm" */ '../views/vlsm.vue')
  },
  /**
   * Disk Tools
   */
  {
    path: '/disk/properties',
    name: 'disktools-properties',
    component: () => import(/* webpackChunkName: "vlsm" */ '../views/DiskTools/DiskProperties.vue')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
