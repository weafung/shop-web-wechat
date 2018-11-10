<template>
  <div id="order">
    <div class="header-nav">
      <router-link class="header-nav-item"  active-class='header-nav-item-active' to="/order/-1">全部</router-link>
      <router-link class="header-nav-item"  active-class='header-nav-item-active' to="/order/0">待付款</router-link>
      <router-link class="header-nav-item"  active-class='header-nav-item-active' to="/order/1">待发货</router-link>
      <router-link class="header-nav-item"  active-class='header-nav-item-active' to="/order/2">待收货</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#order {
  background-color: #f5f5f5;
  height: 100%;
}

.header-nav {
  width: 100%;
  background-color: white;
  /* margin-top: 2%; */
  height: 8%;
  display: flex;
  justify-items: center;
}

.header-nav-item{
  display: flex;
  margin:auto auto;
}

.header-nav-item-active {
    color: #f5345e;
    padding: 3px 0px;
    border-bottom: 2px #f5345e solid;
}
</style>
