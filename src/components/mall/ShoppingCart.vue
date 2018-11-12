<template>
  <div id="shopping-cart">
    <div class="msg-container">
      <div class="shopping-cart-msg" v-if="JSON.stringify(data.shoppingCartDetailList) === '[]'">那么多好商品，你都不加购物车吗</div>
      <div class="shopping-cart-msg" v-if="showMsg">{{msg}}</div>
    </div>
    <div class="shopping-cart-container">
      <div class="shopping-cart-item-box" v-if="JSON.stringify(data) !== '{}' && JSON.stringify(data.shoppingCartDetailList) !== '[]'">
        <div class="shopping-cart-item" v-for="item in data.shoppingCartDetailList" :key="item.goods.goodsId + '_' + item.sku.skuId">
          <div class="shopping-cart-item-checkbox">
            <input type="checkbox" v-model="goodsSelectedStatus[item.sku.skuId].selected" @change="selectedGoodsChanged(item.sku.skuId)" :id="'checkbox' + item.sku.skuId" />
            <label :for="'checkbox' + item.sku.skuId" v-if="goodsSelectedStatus[item.sku.skuId].selected"><img alt="" src="../../assets/images/gou.png"></label>
            <label :for="'checkbox' + item.sku.skuId" v-else-if="!goodsSelectedStatus[item.sku.skuId].selected"><img alt="" src="../../assets/images/quan.png"></label>
          </div>
          <div class="shopping-cart-item-image">
            <img class="lazy-img-fadein" v-lazy="item.goods.goodsImage" />
          </div>
          <div class="shopping-cart-item-goods">
            <div class="goods-title">
              <router-link :to="'/goodsDetail/'+ item.goods.goodsId"> {{item.goods.title}} </router-link>
            </div>
            <div class="goods-attribute">
              <span v-for="value in item.sku.attributes" v-bind:key="item.goods.goodsId + '_' + item.sku.skuId + '_' + value.attributeNameId + '_' + value.attributeValueId">{{ value.attributeValue }} </span>
            </div>
            <div class="goods-price-count">
              <div class="goods-price">
                ¥&nbsp;{{item.sku.salePrice}}
              </div>
              <div class="goods-count">
                <el-input-number v-model="goodsSelectedStatus[item.sku.skuId].count" @change="updateShoppingCartItemCount(item.goods.goodsId, item.sku.skuId)" :min="1" :max=item.goods.limitPerOrder label="购买数量" :precision="0" style="width:120px"></el-input-number>
              </div>
            </div>
            <div class="goods-limit-delete">
              <div class="goods-limit" v-if="item.goods.limitPerOrder < 2147483647">
                限购 {{item.goods.limitPerOrder}} 件
              </div>
              <div class="goods-delete" @click="deleteShoppingCartItem(item.sku.skuId)">
                <i class="iconfont icon-delete" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shopping-cart-blank-block" v-if="JSON.stringify(data) !== '{}' && JSON.stringify(data.shoppingCartDetailList) !== '[]'"></div>
      <div class="shopping-cart-checkout-box" v-if="JSON.stringify(data) !== '{}' && JSON.stringify(data.shoppingCartDetailList) !== '[]'">
        <div class="shopping-cart-select-all">
          <input type="checkbox" v-model="selectAllGoods" @change="selectAllGoodsChange" :id="'checkboxall'" />
          <label :for="'checkboxall'" v-if="selectAllGoods"><img alt="" src="../../assets/images/gou.png"> &nbsp;&nbsp;全选</label>
          <label :for="'checkboxall'" v-else-if="!selectAllGoods"><img alt="" src="../../assets/images/quan.png">&nbsp;&nbsp;全选</label>
        </div>
        <div class="shopping-cart-selected-money">
          总计： <div class="selected-money">￥ {{money}}</div>
        </div>
        <div class="shopping-cart-checkout-button" @click="checkOut">
          结算({{selectedNum}})
        </div>
      </div>
    </div>
    <div class="foot-nav-blank-block"></div>
  </div>

</template>

<script>
import Store from '../../common/Store'

export default {
  name: 'Goods',
  data () {
    return {
      data: {
      },
      goodsSelectedStatus: {},
      money: 0,
      selectAllGoods: false,

      selectedNum: 0,
      notSelectedNum: 0,
      goodsNum: 0,

      msg: '',
      showMsg: false
    }
  },
  created () {
    this.initShoppingCartData()
  },
  methods: {
    initShoppingCartData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/shoppingCart').then(response => {
        this.data = response.data.data
        let detailList = this.data.shoppingCartDetailList
        this.goodsSelectedStatus = {}
        for (let index in detailList) {
          this.goodsSelectedStatus[detailList[index].sku.skuId] = { 'selected': false, 'goodsId': detailList[index].goods.goodsId, 'count': detailList[index].count }
          this.notSelectedNum++
        }
        this.goodsNum = this.notSelectedNum
        this.selectAllGoods = false
        Store.save(this.goodsSelectedStatus)
      }).catch(error => {
        console.log(error)
        this.showMsg = true
        this.msg = '失去网络连接啦'
      })
    },
    deleteShoppingCartItem (skuId) {
      this.$http.delete(process.env.API_ROOT + '/api/mall/shoppingCart?&skuId=' + skuId).then(response => {
        this.initShoppingCartData()
      })
    },
    updateShoppingCartItemCount (goodsId, skuId) {
      this.$http.put(process.env.API_ROOT + '/api/mall/shoppingCart?skuId=' + skuId + '&count=' + this.goodsSelectedStatus[skuId].count).then(response => {
        this.initShoppingCartData()
      })
    },
    selectedGoodsChanged (skuId) {
      if (this.goodsSelectedStatus[skuId].selected === true) {
        this.selectedNum++
        this.notSelectedNum--
      } else if (this.goodsSelectedStatus[skuId].selected === false) {
        this.selectedNum--
        this.notSelectedNum++
      }
      if (this.notSelectedNum === 0) {
        this.selectAllGoods = true
      } else {
        this.selectAllGoods = false
      }
      // console.log(this.selectedNum)
      // console.log(this.notSelectedNum)
      // console.log(this.selectAllGoods)
      // console.log(this.goodsSelectedStatus)
      Store.save(this.goodsSelectedStatus)
      console.log(Store.fetch())
    },
    selectAllGoodsChange () {
      if (this.selectAllGoods) {
        this.selectedNum = this.goodsNum
        this.notSelectedNum = 0
      } else {
        this.selectedNum = 0
        this.notSelectedNum = this.goodsNum
      }
      for (let index in this.goodsSelectedStatus) {
        this.goodsSelectedStatus[index].selected = this.selectAllGoods
      }
      // console.log(this.selectedNum)
      // console.log(this.notSelectedNum)
      // console.log(this.selectAllGoods)
      // console.log(this.goodsSelectedStatus)
      Store.save(this.goodsSelectedStatus)
      console.log(Store.fetch())
    },
    checkOut () {
      if (this.selectedNum > 0) {
        this.$router.push('/order/checkout')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  height: 100%;
}
.shopping-cart-container {
  background-color: #f5f5f5;
  width: 100%;
  .shopping-cart-item-box {
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .shopping-cart-item {
      display: flex;
      background-color: white;
      margin: 2px 0px;
      .shopping-cart-item-checkbox {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      .shopping-cart-item-image {
        flex: 4;
        margin: auto;
        display: flex;
        img {
          height: 100px;
          width: 100px;
          margin: auto;
        }
      }
      .shopping-cart-item-goods {
        display: flex;
        flex: 8;
        flex-direction: column;
        padding: 1em;
        .goods-title {
          margin-top: 0.5em;
        }
        .goods-attribute {
          margin-top: 0.5em;
          color: #999999;
          font-size: 0.8em;
          line-height: 0.8em;
          height: 0.8em;
        }
        .goods-price-count {
          margin-top: 0.5em;
          display: flex;
          .goods-price {
            flex: 1;
            display: flex;
            justify-content: flex-start;
            margin: auto 0;
            color: #f23030;
          }
          .goods-count {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
        }
        .goods-limit-delete {
          margin-top: 0.5em;
          display: flex;
          .goods-limit {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            color: #999999;
            font-size: 0.8em;
          }
          .goods-delete {
            margin: auto;
            display: flex;
            flex: 1;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}

.shopping-cart-msg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

input[type='checkbox'] {
  display: none;
}
label {
  display: flex;
  justify-content: center;
  img {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
}

.shopping-cart-blank-block {
  height: 45px;
}

.shopping-cart-checkout-box {
  z-index: 5;
  display: flex;
  width: 100%;
  height: 45px;
  line-height: 45px;
  position: fixed;
  bottom: 55px;
  background-color: white;
  .shopping-cart-select-all {
    flex: 3;
    display: flex;
    margin-left: 0.5em;
    input[type='checkbox'] {
      margin: auto 0;
    }
  }
  .shopping-cart-selected-money {
    flex: 5;
    display: flex;
    .selected-money {
      color: #f23030;
    }
  }
  .shopping-cart-checkout-button {
    flex: 2;
    color: white;
    background-color: #f23030;
    text-align: center;
  }
}
</style>
