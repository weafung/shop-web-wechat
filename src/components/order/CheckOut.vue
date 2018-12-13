<template>
  <div id="checkOut">
    <div>
      <router-link :to="'/address/list/select'" class="address-container">
        <div class="left">
          <div class="address-who">
            收货人： {{addressData.name}} {{addressData.phone}}
          </div>
          <div class="address-detail">
            收货地址： {{addressData.province}}{{addressData.city}}{{addressData.district}}{{addressData.detail}}
          </div>
        </div>
        <div class="right">
          >
        </div>
      </router-link>
    </div>
    <div class="goods-container">
      <div class="checkout-list-item" v-for="item in goodsData" :key="item.goods.goodsId + '_' + item.sku.skuId">
        <div class="goods-image">
          <img class="lazy-img-fadein" v-lazy="item.goods.goodsImage" />
        </div>
        <div class="goods-detail">
          <div class="goods-title">
            {{item.goods.title}}
          </div>
          <div class="goods-attribute">
            <span v-for="value in item.sku.attributes" v-bind:key="item.goods.goodsId + '_' + item.sku.skuId + '_' + value.attributeNameId + '_' + value.attributeValueId">{{ value.attributeValue }} </span>
          </div>
        </div>
        <div class="goods-price-count">
          <div class="goods-price">
            ¥&nbsp;{{parseMoney(item.sku.salePrice)}}
          </div>
          <div class="goods-count">
            x {{data[item.sku.skuId].count}}
          </div>
        </div>
      </div>
    </div>
    <div class="price-container">
      <div class="price-item">
        <div class="price-name">
          商品总额
        </div>
        <div class="price-count">
          ￥{{parseMoney(money)}}
        </div>
      </div>
      <div class="price-item">
        <div class="price-name">
          运费
        </div>
        <div class="price-count">
          ￥{{packageFee}}
        </div>
      </div>
      <div class="agreement-container">
        提交订单则表示您同意《用户购买协议》
      </div>
    </div>
    <div class="blank-block"></div>
    <div class="footer-container">
      <div class="price-all">
        应付合计：<span class="price-color">￥{{parseMoney(money + packageFee)}}</span>
      </div>
      <div class="pay-button" @click="confirmOrder">
        确定下单
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../../common/Store'
import Util from '../../common/Util'

export default {
  name: 'checkOut',
  data () {
    return {
      data: Store.fetch(),
      goodsData: {},
      skuIdArray: [],
      addressId: '',
      addressData: {},
      money: 0,
      packageFee: 0
    }
  },
  mounted () {
    this.addressId = typeof (Store.fetchAddressId()) === 'undefined' || Store.fetchAddressId() === null ? '' : Store.fetchAddressId()
    this.fetchAddressData()

    for (let index in this.data) {
      if (this.data[index].selected) {
        this.skuIdArray.push(index)
      } else {
        delete this.data[index]
      }
    }
    Store.save(this.data)

    this.initGoodsData()
  },
  methods: {
    fetchAddressData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/address/?addressId=' + this.addressId).then(response => {
        this.addressData = response.data.data
        Store.saveAddressId(this.addressData.addressId)
      })
    },
    initGoodsData () {
      this.$http.post(process.env.API_ROOT + '/api/mall/goods/simple', this.skuIdArray).then(response => {
        this.goodsData = response.data.data
        this.money = 0
        for (let index in this.data) {
          if (this.data[index].selected) {
            this.money += this.data[index].count * this.data[index].salePrice
          }
        }
      })
    },
    confirmOrder () {
      console.log(this.data)
      let orderItems = new Set()
      for (let skuId in this.data) {
        orderItems.add({ 'skuId': skuId, 'count': this.data[skuId].count })
      }
      console.log(Store.fetchAddressId())
      console.log(orderItems)
      this.$http.post(process.env.API_ROOT + '/api/mall/order', { 'addressId': Store.fetchAddressId(), 'orderItems': orderItems }).then(response => {
        let res = response.data
        if (res.code === 200) {
          this.$toast.center('下单成功')
          let self = this
          setTimeout(() => {
            self.$router.replace('/order/list/0')
          }, 1000)
        } else {
          this.$toast.center(response.data.msg)
        }
      })
    },
    parseMoney (cent) {
      return Util.cent2yuan(cent)
    }
  }
}
</script>

<style lang="scss" scoped>
#checkOut {
  height: 100%;
  widows: 100%;
}

.address-container {
  background-color: #5d5f63;
  color: #fff;
  display: flex;
  margin: 0.2rem 0;
  height: 6rem;
  // margin: auto 1rem;
  .left {
    flex: 6;
    margin: auto auto auto 0.8rem;
    .address-who {
      margin: 1rem 0;
      font-weight: 600;
    }
    .address-detail {
      margin: 1rem 0;
      // padding-left: 1rem;
      font-size: 0.8rem;
    }
  }
  .right {
    flex: 1;
    text-align: center;
    margin: auto;
  }
}

.goods-container {
  background-color: #fff;
  .checkout-list-item {
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

.price-container {
  width: 100%;
  $height: 2.5rem;
  $paddingWidth: 0.8rem;
  background-color: white;

  .price-item {
    clear: both;
    padding: 0 $paddingWidth;
    width: 100%;
    line-height: $height;
    height: $height;
    text-align: center;
    .price-name {
      float: left;
      color: gray;
    }
    .price-count {
      float: right;
    }
  }
  .agreement-container {
    margin-left: $paddingWidth;
    line-height: $height;
    height: $height;
    border-top: 1px solid #f5f5f5;
    padding-right: 0px;
  }
}

.blank-block {
  height: 3rem;
}
.footer-container {
  $height: 3rem;
  position: fixed;
  bottom: 0;
  height: $height;
  width: 100%;
  background-color: white;
  display: flex;
  .price-all {
    flex: 3;
    display: inline;
    line-height: $height;
    text-align: right;
    margin-right: 2rem;
  }
  .pay-button {
    flex: 1;
    line-height: $height;
    height: $height;
    width: 30%;
    background-color: red;
    color: white;
    text-align: center;
    float: right;
  }
}

.price-color {
  color: #f23030;
}
</style>
