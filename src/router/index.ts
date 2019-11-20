import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import DiskTools from '../views/DiskTools.vue';
import DiskProperties from '@/components/DiskTools/DiskProperties.vue';
import Busses from '@/components/DiskTools/Busses.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/disk-tools',
    component: DiskTools,
    children: [
      {
        path: '/',
        name: 'disk-tools',
        component: DiskProperties
      },
      {
        path: 'busses',
        name: 'disk-tools-busses',
        component: Busses,
        
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'text-indigo-600 border-r-2',
});

export default router;
