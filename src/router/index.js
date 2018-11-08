import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/mall/Goods'
import Mall from '@/components/Mall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mall',
      name: 'Mall',
      component: Mall,
      children: [
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        }
      ]
    }
  ]
})
