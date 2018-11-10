<template>
  <div id="order">
    <div class="header-nav">
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/-1" replace>全部</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/0" replace>待付款</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/1" replace>待发货</router-link>
      <router-link class="header-nav-item" active-class='header-nav-item-active' to="/order/2" replace>待收货</router-link>
    </div>
    <div class="order-list-container" v-if="JSON.stringify(orderList) !== '[]'">
      <div class="order-list-item" v-for="(gorder, key, index) in orderList" v-bind:key="'gorder' + index">
        <div class="order-list-item-header">
          <span class="date">
            {{gorder.gorderDTO.orderTime}}
          </span>
          <span class="status" v-if="gorder.gorderDTO.status == 0">待付款</span>
          <span class="status" v-if="gorder.gorderDTO.status == 1">待发货</span>
          <span class="status" v-if="gorder.gorderDTO.status == 2">待收货</span>
        </div>
        <div class="order-list-item-body" v-for="(sorder, key, index) in gorder.sorderDTOList" v-bind:key="'sorder' + index">
          <span class="goods-image">
            <img class="lazy-img-fadein" v-lazy="img" />
          </span>
          <span class="goods-detail">
            {{sorder.title}}
          </span>
          <div class="goods-price-count">
            <div class="goods-price">
              ￥{{sorder.salePrice}}
            </div>
            <div class="goods-count">
              x{{sorder.count}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      })
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
    .order-list-item-body {
      clear: both;
      overflow: auto;
      border-bottom: 1px #f5f5f5 solid;
      padding: 5px 3px;
      .goods-image {
        clear: both;
        float: left;
        width: 30%;
        img {
          padding: 10px;
          max-width: 100%;
          max-height: 100%;
          height: 100px;
          width: 100px;
        }
      }
      .goods-detail {
        float: left;
        overflow: auto;
      }
      .goods-price-count {
        float: right;
        display: flex;
        flex-direction: column;
        justify-items: right;
        text-align: right;
        .goods-count {
          color: gray;
        }
      }
    }
  }
}
</style>
