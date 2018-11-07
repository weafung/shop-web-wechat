import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/mall/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }
  ]
})
