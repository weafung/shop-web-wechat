import Vue from 'vue'
import Router from 'vue-router'
import Mall from '@/components/Mall'
import Goods from '@/components/mall/Goods'
import ShoppingCart from '@/components/mall/ShoppingCart'

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
        },
        {
          path: 'shoppingCart',
          name: 'ShoppingCart',
          component: ShoppingCart
        }
      ]
    }
  ]
})
