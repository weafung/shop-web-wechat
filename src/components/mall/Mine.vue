<template>
  <div class="mine-container">
    <div v-if="JSON.stringify(userData) === '{}'">
      <div class="empty-data-msg">快快登录吧</div>
    </div>
    <div v-if="JSON.stringify(userData) !== '{}'">
      <div class="user-data-container">
        <div class="user-data-avatar-area">
          <div class="avatar-box">
            <img class="lazy-img-fadein avatar-circle " v-lazy="userData.avatar" />
          </div>
        </div>
        <div class="user-data-other-area">
          <div class="user-data-nickname">
            <span v-if="userData.sex == 1"> <i class="iconfont icon-male" style="color: #67ccee" /> </span>
            <span v-if="userData.sex == 2"> <i class="iconfont icon-female" style="color: red" /> </span>
            {{userData.nickname}}
          </div>
        </div>
      </div>
    </div>
    <div class="order-button-container">
      <div class="order-button-header">
        <div class="my-order">
          我的订单
        </div>
        <router-link class="see-all-order" to="/order/-1"> 查看全部 > </router-link>

      </div>
      <div class="order-button-body">
        <router-link class="order-button-item" to="/order/-1"> <i class="iconfont icon-all-orders" />全部订单 </router-link>
        <router-link class="order-button-item" to="/order/0"> <i class="iconfont icon-wait-pay" /> 待付款 </router-link>
        <router-link class="order-button-item" to="/order/1"> <i class="iconfont icon-wait-send" /> 待发货 </router-link>
        <router-link class="order-button-item" to="/order/2"> <i class="iconfont icon-wait-receive" /> 待收货 </router-link>
        <router-link class="order-button-item" to="/order/3"> <i class="iconfont icon-withdraw" /> 退货退款 </router-link>
      </div>
    </div>
    <div class="menu-container">
      <div class="menu-item">
        联系客服
      </div>
      <div class="menu-item">
        账号切换
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      userData: {
        'avatar': 'https://coding.net/static/fruit_avatar/Fruit-8.png',
        'nickname': '微风',
        'sex': 1
      }
    }
  },
  mounted () {
    this.fetchUserData()
  },
  methods: {
    fetchUserData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/shoppingCart').then(response => {
      })
    }
  }
}
</script>

<style scoped>
.mine-container {
  background-color: #f5f5f5;
  height: 100%;
}

.user-data-container {
  width: 100%;
  height: 100px;
  background-color: white;
  margin-top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-data-avatar-area {
  width: 30%;
}

.avatar-box {
  position: relative;
}

.avatar-box img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.avatar-circle {
  height: 64px;
  width: 64px;
  border-radius: 50%;
}

.user-data-other-area {
  width: 70%;
}

.user-data-nickname,
.user-data-sex {
  line-height: 1.5rem;
}

.order-button-container {
  background-color: white;
  margin-top: 2%;
}

.order-button-header {
  border-bottom: 1px #f5f5f5 solid;
  height: 2.5em;
  line-height: 2.5em;
  padding: 0 3%;
}

.order-button-header .my-order {
  display: inline;
  margin: auto auto;
}

.order-button-header .see-all-order {
  float: right;
  padding: auto auto;
}

.see-all-order {
  font-size: 0.8em;
}

.order-button-body {
  clear: both;
  display: flex;
  /* justify-items: center; */
  margin: 0 auto;
  height: 5em;
  font-size: 0.8em;
}

.order-button-item {
  display: flex;
  justify-items: center;
  flex-direction: column;
  text-align: center;
  margin: auto auto;
}
.order-button-item i {
  font-size: 1.8em;
}

.menu-container {
  margin-top: 2%;
  background-color: white;
}

.menu-item {
  padding: 0 3%;
  height: 3em;
  line-height: 3em;
  border-bottom: 2px #f5f5f5 solid;
}

.menu-item::after {
  content: '>';
  float: right;
  color: gray;
}
</style>
