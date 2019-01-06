import Vue from 'vue'
import Router from 'vue-router'
import Mall from '@/components/mall/Mall'
import Goods from '@/components/mall/Goods'
import ShoppingCart from '@/components/mall/ShoppingCart'
import Mine from '@/components/mall/Mine'
import Category from '@/components/mall/Category'
import GoodsDetail from '@/components/GoodsDetail'
import OrderList from '@/components/order/List'
import CheckOut from '@/components/order/CheckOut'
import AddressList from '@/components/address/List'
import Address from '@/components/address/Address'
import Token from '@/components/Token'
import UserContract from '@/components/mall/UserContract'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Mall,
      redirect: '/mall/goods',
      meta: {
        title: '友品'
      }
    },
    {
      path: '/token',
      name: 'Token',
      component: Token
    },
    {
      path: '/address/list/:action?',
      name: 'AddressList',
      component: AddressList,
      meta: {
        title: '地址管理'
      }
    },
    {
      path: '/user/contract',
      name: 'UserContract',
      component: UserContract,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/address/:action?/:addressId?',
      name: 'Address',
      component: Address,
      meta: {
        title: '地址管理'
      }
    },
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
          path: 'category/:categoryId?',
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
      path: '/order/list/:status?',
      name: 'OrderList',
      component: OrderList,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/order/checkOut',
      name: 'CheckOut',
      component: CheckOut,
      meta: {
        title: '确认订单'
      }
    }
  ]
})
