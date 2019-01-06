<template>
  <div id="order">
    <div class="header-nav">
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/list/-1" replace>全部</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/list/0" replace>待付款</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/list/1" replace>待发货</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/list/2" replace>待收货</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/list/3" replace>已完成</router-link>
    </div>
    <div class="empty-data-msg" v-if="JSON.stringify(orderList) === '[]'">
      还没有订单, 快去下单吧~
    </div>
    <div class="order-list-container" v-if="JSON.stringify(orderList) !== '[]'">
      <div class="order-list-item" v-for="gorder in orderList" v-bind:key="gorder.gorderDTO.gorderId">
        <div class="order-list-item-header">
          <span class="date">
            {{timestamp2Date(gorder.gorderDTO.orderTime)}}
          </span>
          <span class="status" v-if="gorder.gorderDTO.status == 0">待付款</span>
          <span class="status" v-else-if="gorder.gorderDTO.status == 1">待发货</span>
          <span class="status" v-else-if="gorder.gorderDTO.status == 2">待收货</span>
          <span class="status" v-else-if="gorder.gorderDTO.status == 3">已完成</span>
        </div>
        <div class="goods-container">
          <div class="goods-list" v-for="sorder in gorder.sorderDTOList" v-bind:key="sorder.orderId">
            <div class="goods-image">
              <img class="lazy-img-fadein" v-lazy="sorder.skuImage" />
            </div>
            <div class="goods-detail">
              <div class="goods-title">
                {{sorder.title}}
              </div>
              <div class="goods-attribute">
                <span v-for="value in sorder.attributes" v-bind:key="sorder.goodsId + '_' + sorder.skuId + '_' + value.attributeNameId + '_' + value.attributeValueId">{{ value.attributeValue }} </span>
              </div>
            </div>
            <div class="goods-price-count">
              <div class="goods-price">
                ¥&nbsp;{{parseMoney(sorder.salePrice)}}
              </div>
              <div class="goods-count">
                x {{sorder.count}}
              </div>
            </div>
          </div>
        </div>
        <div class="order-list-item-footer">
          <div class="goods-all-price-count">
            <div class="goods-all-count">
              共 {{gorder.gorderDTO.count}} 件
            </div>
            <div class="goods-all-price">
              应付总额 ￥{{parseMoney(gorder.gorderDTO.money)}}
            </div>
          </div>
          <div class="order-action-menu">
            <div class="order-action-white-button" v-if="gorder.gorderDTO.status == 0" @click="pay(gorder.gorderDTO.gorderId)">
              立即支付
            </div>
            <div class="order-action-white-button" v-if="gorder.gorderDTO.status == 2" @click="lookPackage(gorder.gorderDTO.packageCode)">
              查看物流
            </div>
            <div class="order-action-red-button" v-if="gorder.gorderDTO.status == 2" @click="received(gorder.gorderDTO.gorderId)">
              确认收货
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Util from '../../common/Util'
export default {
  name: 'order',
  data () {
    return {
      orderList: [],
      status: -1,
      img: 'http://yanxuan.nosdn.127.net/0d9db8ac841176d07a029b33fb67ad48.jpg?imageView&thumbnail=430x430&quality=95'
    }
  },
  watch: {
    '$route' (to, from) {
      this.status = this.$route.params.status === '-1' ? '' : this.$route.params.status
      this.fetchOrderListData()
    }
  },
  mounted () {
    this.status = this.$route.params.status === '-1' ? '' : this.$route.params.status
    this.fetchOrderListData()
  },
  methods: {
    fetchOrderListData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/order?status=' + this.status).then(response => {
        this.orderList = response.data.data
      }).catch(error => {
        console.log(error)
        this.$toast.center('网络出错, 请重新尝试')
      })
    },
    lookPackage (code) {
      this.$alert(code, '快递单号', {
        confirmButtonText: '确定',
        center: true
      }).then(() => {
      })
    },
    pay (gorderId) {
      this.$http.put(process.env.API_ROOT + '/api/mall/order/pay?gorderId=' + gorderId).then(response => {
        if (response.data.code === 200) {
          this.$toast.center('支付成功')
          this.$router.replace('/order/list/1')
        } else {
          this.$toast.center('支付失败, 请重新尝试')
        }
      }).catch(error => {
        console.log(error)
        this.$toast.center('网络出错, 请重新尝试')
      })
    },
    received (gorderId) {
      this.$http.put(process.env.API_ROOT + '/api/mall/order/received?gorderId=' + gorderId).then(response => {
        if (response.data.code === 200) {
          this.$toast.center('确认成功')
          this.$router.replace('/order/list/3')
        } else {
          this.$toast.center('确认失败, 请重新尝试')
        }
      }).catch(error => {
        console.log(error)
        this.$toast.center('网络出错, 请重新尝试')
      })
    },
    timestamp2Date (timestamp) {
      return Util.timestamp2Date(timestamp)
    },
    parseMoney (cent) {
      return Util.cent2yuan(cent)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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

  .header-nav-item {
    display: flex;
    margin: auto auto;
  }
  .header-nav-item-active {
    color: #f5345e;
    padding: 3px 0px;
    border-bottom: 2px #f5345e solid;
  }
}

.order-list-container {
  margin-top: 2%;

  .order-list-item {
    clear: both;
    margin-top: 1%;
    padding: 5px 3px;
    background-color: white;
    .order-list-item-header {
      border-bottom: 1px #f5f5f5 solid;
      overflow: auto;
      .status {
        float: right;
        margin-right: 2%;
      }
    }
    .goods-container {
      background-color: #fff;
      .goods-list {
        clear: both;
        overflow: auto;
        border-bottom: 1px #f5f5f5 solid;
        padding: 5px 3px;
        display: flex;
        .goods-image {
          display: flex;
          flex: 2;
          img {
            padding: 10px;
            max-width: 100%;
            max-height: 100%;
            height: 100px;
            width: 100px;
            margin: auto;
          }
        }
        .goods-detail {
          flex: 3;
          .goods-attribute {
            font-size: 0.8em;
            color: gray;
          }
        }
        .goods-price-count {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-items: right;
          text-align: right;
          padding-right: 0.25em;
          .goods-count {
            color: gray;
          }
        }
      }
    }
    .order-list-item-footer {
      .goods-all-price-count,
      .order-action-menu {
        display: flex;
        justify-content: flex-end;
      }
      .goods-all-price-count {
        line-height: 2.5em;
        height: 2.5em;
        .goods-all-price,
        .goods-all-count {
          margin-left: 2.5em;
        }
      }

      .order-action-menu {
        margin-right: 0.25em;
        .order-action-white-button,
        .order-action-red-button {
          border: 1px solid;
          border-radius: 20px;
          padding: 0.25em 0.75em;
          margin-left: 0.5em;
        }

        .order-action-white-button {
          border-color: #ff0a0a;
          background-color: #fffafa;
        }

        .order-action-red-button {
          color: white;
          background-color: #e31436;
        }
      }
    }
  }
}
</style>
