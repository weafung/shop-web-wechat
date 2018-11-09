<template>

  <div class="shopping-cart-container">
    <div v-if="JSON.stringify(data.shoppingCartDetailList) === '[]'">
      <div class="shopping-cart-empty-text">那么多好商品，你都不加购物车吗</div>
    </div>
    <div v-if="JSON.stringify(data.shoppingCartDetailList) !== '[]'">
      <ul class="shopping-cart-box">
        <li class="shopping-cart-item" v-for="item in data.shoppingCartDetailList" :key="item.goods.goodsId + '_' + item.sku.skuId">
          <div class="shopping-cart-item-selected">
            <el-radio v-model="radio"></el-radio>
          </div>
          <div class="shopping-cate-item-detail">
            <div class="shopping-cart-item-image">
              <img class="lazy-img-fadein" v-lazy="item.goods.goodsImage" />
            </div>
            <div class="shopping-cart-item-goods">
              <div class="goods-title">
                <router-link :to="'/detail/'+ item.goods.goodsId"> {{item.goods.title}} </router-link>
              </div>
              <div class="goods-attribute">
                <span v-for="value in item.sku.attributes" v-bind:key="item.goods.goodsId + '_' + item.sku.skuId + '_' + value.attributeNameId + '_' + value.attributeValueId">{{ value.attributeValue }} </span>
              </div>
              <div class="goods-price">
                ¥&nbsp;{{item.sku.salePrice}}
              </div>
              <div class="goods-count">
                <el-input-number v-model=count[item.sku.skuId] @change="updateShoppingCartItemCount(item.goods.goodsId, item.sku.skuId)" :min="1" :max=item.goods.limitPerOrder label="购买数量" :precision="0" style="width:150px"></el-input-number>
              </div>
              <div class="goods-count-limit" v-if="item.goods.limitPerOrder < 2147483647">
                限购 {{item.goods.limitPerOrder}} 件
              </div>
              <div class="goods-delete-button" @click="deleteShoppingCartItem(item.sku.skuId)">
                <i class="iconfont icon-delete" />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="checkout-box">
        <div class="shopping-cart-select-all">
          <el-checkbox v-model="selectAll" label="全选"></el-checkbox>
        </div>
        <div class="shopping-cart-selected-money">
          总计： <div class="selected-money">￥ {{money}}</div>
        </div>
        <div class="shopping-cart-checkout">
          结算({{selected_item_count}})
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      data: {
      },
      count: [],
      radio: [],
      money: 0,
      selectAll: false,
      selected_item_count: 0
    }
  },
  mounted () {
    this.fetchShoppingCartData()
  },
  methods: {
    handleChange (value) {
      console.log(value)
    },
    fetchShoppingCartData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/shoppingCart').then(response => {
        this.data = response.data.data
        let detailList = response.data.data.shoppingCartDetailList
        for (let index in detailList) {
          this.count[detailList[index].sku.skuId] = detailList[index].count
        }
      })
    },
    deleteShoppingCartItem (skuId) {
      this.$http.delete(process.env.API_ROOT + '/api/mall/shoppingCart?&skuId=' + skuId).then(response => {
        this.fetchShoppingCartData()
      })
    },
    updateShoppingCartItemCount (goodsId, skuId) {
      this.$http.put(process.env.API_ROOT + '/api/mall/shoppingCart?skuId=' + skuId + '&count=' + this.count[skuId]).then(response => {
      })
    }
  }
}
</script>

<style scoped>
.shopping-cart-container {
  background-color: #f5f5f5;
  height: 100%;
}

.shopping-cart-empty-text {
  text-align: center;
  height: 100%;
  padding: 100% 0;
}
.shopping-cart-box {
  overflow: hidden;
}

.shopping-cart-item {
  clear: both;
  height: 140px;
  background-color: white;
  margin: 10px 0px;
  /* padding: 10px 0px; */
  display: flex;
}

.shopping-cart-item-detail {
  padding: 5px;
}

.shopping-cart-item-selected {
  display: inline;
  margin: auto 0px auto 20px;
}

.shopping-cart-item-image {
  float: left;
  width: 30%;
  padding: 5px 10px;
  margin: 20px auto;
}

.shopping-cart-item-goods {
  float: left;
  width: 70%;
  padding-left: 5px;
}

.goods-title {
  padding: 10px 0px 10px 0px;
}

.goods-count {
  float: right;
  margin-right: 10px;
}

.goods-attribute {
  padding: 0px 5px;
  color: #999999;
}

.goods-count-limit {
  float: left;
  clear: right;
  padding: 5px;
  color: #999999;
}

.goods-delete-button {
  float: right;
  margin: 10px 20px;
}

.icon-delete {
  font-size: 18px;
}

.lazy-img-fadein {
  width: 100%;
}

a {
  display: block;
}

.goods-price {
  font-size: 18px;
  overflow: hidden;
  color: #f23030;
  line-height: 25px;
  display: inline;
  margin: 25px;
  line-height: 38px;
}

.checkout-box {
  position: fixed;
  bottom: 55px;
  width: 100%;
  background-color: white;
  margin: auto auto;
  font-size: 20px;
  border-bottom: 2px #f5f5f5 solid;
}

.shopping-cart-select-all,
.shopping-cart-selected-money,
.shopping-cart-checkout {
  display: inline;
}

.shopping-cart-select-all,
.shopping-cart-selected-money {
  padding: 15px;
  height: 100%;
  float: left;
}

.shopping-cart-checkout {
  float: right;
  background-color: #f23030;
  color: white;
  height: 100%;
  padding: 15px;
  text-align: center;
}

.selected-money {
  color: #f23030;
  display: inline;
}
</style>
