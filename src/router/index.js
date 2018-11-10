import Vue from 'vue'
import Router from 'vue-router'
import Mall from '@/components/mall/Mall'
import Goods from '@/components/mall/Goods'
import ShoppingCart from '@/components/mall/ShoppingCart'
import Mine from '@/components/mall/Mine'
import Category from '@/components/mall/Category'
import GoodsDetail from '@/components/GoodsDetail'
import Order from '@/components/order/Order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mall',
      name: 'Mall',
      component: Mall,
      meta: {
        title: '友品'
      },
      children: [
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'category',
          name: 'Category',
          component: Category,
          meta: {
            title: '分类'
          }
        },
        {
          path: 'shoppingCart',
          name: 'ShoppingCart',
          component: ShoppingCart,
          meta: {
            title: '购物车'
          }
        },
        {
          path: 'mine',
          name: 'Mine',
          component: Mine,
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/goodsDetail/:goodsId',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/order/:status?',
      name: 'Order',
      component: Order,
      meta: {
        title: '我的订单'
      }
    }
  ]
})
