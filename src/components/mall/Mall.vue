<template>
  <div id="mall">
    <router-view/>
    <div class="foot-nav">
        <template v-for="(item,index) in list">
          <div class="foot-nav-item-container" v-bind:key=index>
            <router-link :to="{path: item.path}" active-class='foot-nav-item-active'>
              <div class="foot-nav-item">
                <i class="iconfont" :class="item.icon"/>
                {{item.title}}
              </div>
            </router-link>
          </div>
        </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mall',
  data () {
    return {
      list: [
        {title: '首页', path: '/mall/goods', icon: 'icon-homepage'},
        {title: '分类', path: '/mall/category', icon: 'icon-category'},
        // {title: '店主精选', path: '/mall/shopOwner', icon: 'icon-yuanxuan'},
        {title: '购物车', path: '/mall/shoppingCart', icon: 'icon-shopping-cart'},
        {title: '我的', path: '/mall/mine', icon: 'icon-mine'}
      ]
    }
  }
}
</script>

<style scoped>
#mall {
  background-color: #F5F5F5;
  height: 100%;
}

.foot-nav {
  background: white;
  height: 55px;
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  z-index: 5;
}

.foot-nav-item-container {
  display: flex;
  margin:0 auto
}
.foot-nav-item {
  margin:auto auto;
  display: flex;
  flex-direction:column;
}

.foot-nav-item-active {
  color: #f5345e;
}
</style>
