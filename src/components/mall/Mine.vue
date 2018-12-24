<template>
  <div class="mine-container">
    <div v-if="JSON.stringify(userData) === '{}'">
      <div class="empty-data-msg">快快登录吧</div>
    </div>
    <div v-if="JSON.stringify(userData) !== '{}'">
      <div class="user-data-container">
        <div class="user-data-avatar-area">
          <div class="avatar-box">
            <img class="lazy-img-fadein avatar-circle " v-lazy="userData.avatar" v-if="userData.avatar !==''" />
            <img class="lazy-img-fadein avatar-circle " v-lazy="defaultAvatar" v-if="userData.avatar ===''" />
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
        <router-link class="see-all-order" to="/order/list/-1"> 查看全部 > </router-link>

      </div>
      <div class="order-button-body">
        <router-link class="order-button-item" to="/order/list/-1"> <i class="iconfont icon-all-orders" />全部订单 </router-link>
        <router-link class="order-button-item" to="/order/list/0"> <i class="iconfont icon-wait-pay" /> 待付款 </router-link>
        <router-link class="order-button-item" to="/order/list/1"> <i class="iconfont icon-wait-send" /> 待发货 </router-link>
        <router-link class="order-button-item" to="/order/list/2"> <i class="iconfont icon-wait-receive" /> 待收货 </router-link>
        <router-link class="order-button-item" to="/order/list/3"> <i class="iconfont icon-withdraw" /> 退货退款 </router-link>
      </div>
    </div>
    <div class="menu-container">
      <router-link :to="'/address/list'">
        <div class="menu-item">
          地址管理
        </div>
      </router-link>

      <div class="menu-item" @click="contactService">
        联系客服
      </div>

      <!-- <div class="menu-item" @click="userContract">
        用户协议
      </div> -->
      <!-- <div class="menu-item">
        账号切换
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      user_contract: '',
      service_phone: '',
      defaultAvatar: 'https://coding.net/static/fruit_avatar/Fruit-8.png',
      userData: {
        'avatar': 'https://coding.net/static/fruit_avatar/Fruit-8.png',
        'nickname': '微风',
        'sex': 1
      }
    }
  },
  mounted () {
    this.fetchPageData()
  },
  methods: {
    fetchPageData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/user').then(response => {
        if (response.data.code === 200) {
          this.userData = response.data.data
        } else {
          this.$toast.center('网络出错, 请刷新页面')
        }
      }).catch(error => {
        this.$toast.center('网络出错, 请刷新页面')
        console.log(error)
      })
      this.$http.get(process.env.API_ROOT + '/api/config/get?key=service_phone').then(response => {
        if (response.data.code === 200) {
          this.service_phone = response.data.data
        } else {
          this.$toast.center('网络出错, 请刷新页面')
        }
      }).catch(error => {
        console.log(error)
      })
      // this.$http.get(process.env.API_ROOT + '/api/config/get?key=user_contract').then(response => {
      //   if (response.data.code === 200) {
      //     this.user_contract = response.data.data
      //   } else {
      //     this.$toast.center('网络出错, 请刷新页面')
      //   }
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    contactService () {
      this.$alert('请关注微信公众号：' + this.service_phone, '联系客服', {
        confirmButtonText: '确定',
        center: true
      }).then(() => {
      })
    },
    userContract () {
      this.$alert(this.userContract, '用户协议', {
        confirmButtonText: '确定',
        center: true
      }).then(() => {
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
  content: ">";
  float: right;
  color: gray;
}
</style>
