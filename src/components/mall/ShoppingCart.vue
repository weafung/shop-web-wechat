<template>
  <div class="shopping-cart-container">
    <div v-if="JSON.stringify(data.shoppingCartDetailList) === '[]'">
      <div class="shopping-cart-empty-text">那么多好商品，你都不加购物车吗</div>
    </div>
    <div class="shopping-cart-item-box" v-if="JSON.stringify(data.shoppingCartDetailList) !== '[]'">
      <div class="shopping-cart-item" v-for="item in data.shoppingCartDetailList" :key="item.goods.goodsId + '_' + item.sku.skuId">
        <div class="shopping-cart-item-checkbox">
          <input type="checkbox" v-model="goodsSelectedStatus[item.sku.skuId]" @change="selectedGoodsChanged(item.sku.skuId)" :id="'checkbox' + item.sku.skuId" />
          <label :for="'checkbox' + item.sku.skuId" v-if="goodsSelectedStatus[item.sku.skuId]"><img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAulJREFUeNrMmU1sEkEYhr+urZrGHvAnFFCRECsnPSAcvNlz40+iRq0nTYDW6q2JsZEEPXk0Kn8aT40aNZp40JvePOlBLqgBDxoaSGh6qDFpmzS+H36YTQHZAXbZN3myBJidhxl2dmZ2IBgMUgfRwGFwVI5jwA22yee/wAL4Bj6C93JcV61oUPH7HjADzoO9//neVrATHASn5L0fYB4kQUmlJYxkB7gPvoNrbeRahctcB0VwF2zvleBp8AVMg83UfbZIL3zVtW5Hgtz9KfBMuqvX4XM+l54ZVBUcBq9AjMzPtNQ1bFSQf80TMEHWZULq3GRE8B44RtaH67zTTvAsiFL/chmcaSW4S/6w/U5KXBoEbxkdm0wOO9zcKMiD6EWyTy7Vbwaa7lIfspHgUH2I04RJsl8usBvLhcFus2tzOByUTCbJ5/MZLbIHBFlw3Aq5dDpN4XCYZmdnVYqOs2DQCjm/30/FYpHm5uZUitdacMwquVgsRktLSyqnCGgyE7ajHMfFgiNKJVwuSqVStaPJcpwRTbVEPB6nUChEmUymqaRerlAodCP3706yrFIgkUhQqVQit9vdILlRbmpqqis5dtNk9WU45XKZotFog6QJcrXqBrDsfIkXJ1VLOp1Oymaz5PF4atIrKyvk9Xp7Kcd5ocl6VTmVSoUikUitJUdHR82Q43zSZFFN3Ujm83nK5XK9luO84y7WZFHtsdlk4SfYp8l2xLwNZzPstF4fB3mqv2ojudX68kPTNecjGwk+rO/f6O8kN8CiDeTYId5s0VQFV20gOKNvqI334sfgQR/lsuBpu50F/gVv+iD3GlwxsvXBVxBvub21UI4b5FyzkaTVdOs3OA4yFshxHSekTjIqyFmTtemkSVf3opw7JnWRqqD+wgnIH7gXg/mqtFpAzt12wmokVdn12g9uq84hJQtS1i+tVjVSaKDDxxC80XiE/j6GOAQOyOKrvr5ZFiHeh/7MsxLwgTp4DPFHgAEAWJnmqBwgVNQAAAAASUVORK5CYII="></label>
          <label :for="'checkbox' + item.sku.skuId" v-else-if="!goodsSelectedStatus[item.sku.skuId]"><img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NJREFUeNrMmUtoE1EUhm+mvijtplXoA6IUtEKkFROsYivatVoXvu1KUKlJo+BGRJRWXKvVKqWCC0NrQQi6UFxowQfWkqrVjQ9wYU10kbhp6aJK9T/6T7mEpJnEJDMHfm5ukt7z5cy9M+ecurxer8rBDMgHbeW4CqqByvj5FBSDPkIRaJjjbPJCkUhkXkcLsgSrhfzQQcg9z/eWQEuhBmgX3/sChaBrUNSqQ6uAFVAXdBhazPdGoWfQC+gTIzbFz8oY0ZXQRqgZWg+dhk5C/dA56Ecmxy4Ll1gicJ0RERuCeqGnWUZ/M3QM2st5HOrAJb6TK6BEt0cW4fwef/Ub9X+2lldjB+dyyY8D9Fe6zZ7KSqGwBncCassDnOIabVxTMaphn89XahWwBBqEtkET3OiXVf5N1mykD/E1CMgSK4CXGH45aVugd6pw9pY+ovR5MRPgHijA1/KrPqsCG/ae+NjOaSeiuDsdYCV0la+DedpvViFfy0HhtBeQFakA5WQtg+5CV1SRDZA9vFMIQ3cyoJs3YcVbiV12luMRRNGtAx6FFkED0LhddIjiOBkWkukvoKid3+lT9pvJ0I4oGgLn5SWWtOKJ3XSIojCMkWmdwZRJ5fBsLaSZLK1mXic24iBAk8UrgPWcfHAQ4HuOqwWwmpNvDgL8zrHKSErTnWKTHMsF0MXJb+VAM3RaB3GZLJOGtveqHQRYZe5FQzu99Q4CnLuzCOArTpocBGiyjAngY06aHQRosgwbfAZPsG5tsZsMCUILWYQpYrAdEeLnfgdEz2QIIXGYNfNBKcRnWFQ32Bi9RjLMkGkuYZWq6gZfd9sYvS6O/YheNLkmkXQ7waLab0P0AvQd18sOHTChlZxSwHiKCOfRmgMBRC+Rri6+zZRb3n8I1RUBro6+xGcf4IYydRaCLP+kF/iowJH08D5cS5+dVlofcoL2Qw+gFWxPdBQAroNrL4fui09E76cVQLFpbljzckuLTLpda/IUtTDXNOhjJ+CmU33ZSgPzAA9NpbZPpUXyPEuwTTyE+7RDGQTYwHx/5LLYRJfu6nnoEAt8sZesvkaYEcWScssaZiUb+Aht0rbQTeiM3FLy1USPc89cYBTa6TCbDEh+wC1G/6vVP8q2yy8Ln1L/muHyQG9l4V/PiJVrNUWMkR3jSR1VKf4Nkcn+CDAAJ2LbtklBp/UAAAAASUVORK5CYII="></label>
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
              <el-input-number v-model=goodsBuyCount[item.sku.skuId] @change="updateShoppingCartItemCount(item.goods.goodsId, item.sku.skuId)" :min="1" :max=item.goods.limitPerOrder label="购买数量" :precision="0" style="width:120px"></el-input-number>
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
    <div class="shopping-cart-blank-block"></div>
    <div class="shopping-cart-checkout-box">
      <div class="shopping-cart-select-all">
        <input type="checkbox" v-model="selectAllGoods" @change="selectAllGoodsChange" :id="'checkboxall'"/>
        <label :for="'checkboxall'" v-if="selectAllGoods"><img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAulJREFUeNrMmU1sEkEYhr+urZrGHvAnFFCRECsnPSAcvNlz40+iRq0nTYDW6q2JsZEEPXk0Kn8aT40aNZp40JvePOlBLqgBDxoaSGh6qDFpmzS+H36YTQHZAXbZN3myBJidhxl2dmZ2IBgMUgfRwGFwVI5jwA22yee/wAL4Bj6C93JcV61oUPH7HjADzoO9//neVrATHASn5L0fYB4kQUmlJYxkB7gPvoNrbeRahctcB0VwF2zvleBp8AVMg83UfbZIL3zVtW5Hgtz9KfBMuqvX4XM+l54ZVBUcBq9AjMzPtNQ1bFSQf80TMEHWZULq3GRE8B44RtaH67zTTvAsiFL/chmcaSW4S/6w/U5KXBoEbxkdm0wOO9zcKMiD6EWyTy7Vbwaa7lIfspHgUH2I04RJsl8usBvLhcFus2tzOByUTCbJ5/MZLbIHBFlw3Aq5dDpN4XCYZmdnVYqOs2DQCjm/30/FYpHm5uZUitdacMwquVgsRktLSyqnCGgyE7ajHMfFgiNKJVwuSqVStaPJcpwRTbVEPB6nUChEmUymqaRerlAodCP3706yrFIgkUhQqVQit9vdILlRbmpqqis5dtNk9WU45XKZotFog6QJcrXqBrDsfIkXJ1VLOp1Oymaz5PF4atIrKyvk9Xp7Kcd5ocl6VTmVSoUikUitJUdHR82Q43zSZFFN3Ujm83nK5XK9luO84y7WZFHtsdlk4SfYp8l2xLwNZzPstF4fB3mqv2ojudX68kPTNecjGwk+rO/f6O8kN8CiDeTYId5s0VQFV20gOKNvqI334sfgQR/lsuBpu50F/gVv+iD3GlwxsvXBVxBvub21UI4b5FyzkaTVdOs3OA4yFshxHSekTjIqyFmTtemkSVf3opw7JnWRqqD+wgnIH7gXg/mqtFpAzt12wmokVdn12g9uq84hJQtS1i+tVjVSaKDDxxC80XiE/j6GOAQOyOKrvr5ZFiHeh/7MsxLwgTp4DPFHgAEAWJnmqBwgVNQAAAAASUVORK5CYII="> &nbsp;&nbsp;全选</label>
        <label :for="'checkboxall'" v-else-if="!selectAllGoods"><img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NJREFUeNrMmUtoE1EUhm+mvijtplXoA6IUtEKkFROsYivatVoXvu1KUKlJo+BGRJRWXKvVKqWCC0NrQQi6UFxowQfWkqrVjQ9wYU10kbhp6aJK9T/6T7mEpJnEJDMHfm5ukt7z5cy9M+ecurxer8rBDMgHbeW4CqqByvj5FBSDPkIRaJjjbPJCkUhkXkcLsgSrhfzQQcg9z/eWQEuhBmgX3/sChaBrUNSqQ6uAFVAXdBhazPdGoWfQC+gTIzbFz8oY0ZXQRqgZWg+dhk5C/dA56Ecmxy4Ll1gicJ0RERuCeqGnWUZ/M3QM2st5HOrAJb6TK6BEt0cW4fwef/Ub9X+2lldjB+dyyY8D9Fe6zZ7KSqGwBncCassDnOIabVxTMaphn89XahWwBBqEtkET3OiXVf5N1mykD/E1CMgSK4CXGH45aVugd6pw9pY+ovR5MRPgHijA1/KrPqsCG/ae+NjOaSeiuDsdYCV0la+DedpvViFfy0HhtBeQFakA5WQtg+5CV1SRDZA9vFMIQ3cyoJs3YcVbiV12luMRRNGtAx6FFkED0LhddIjiOBkWkukvoKid3+lT9pvJ0I4oGgLn5SWWtOKJ3XSIojCMkWmdwZRJ5fBsLaSZLK1mXic24iBAk8UrgPWcfHAQ4HuOqwWwmpNvDgL8zrHKSErTnWKTHMsF0MXJb+VAM3RaB3GZLJOGtveqHQRYZe5FQzu99Q4CnLuzCOArTpocBGiyjAngY06aHQRosgwbfAZPsG5tsZsMCUILWYQpYrAdEeLnfgdEz2QIIXGYNfNBKcRnWFQ32Bi9RjLMkGkuYZWq6gZfd9sYvS6O/YheNLkmkXQ7waLab0P0AvQd18sOHTChlZxSwHiKCOfRmgMBRC+Rri6+zZRb3n8I1RUBro6+xGcf4IYydRaCLP+kF/iowJH08D5cS5+dVlofcoL2Qw+gFWxPdBQAroNrL4fui09E76cVQLFpbljzckuLTLpda/IUtTDXNOhjJ+CmU33ZSgPzAA9NpbZPpUXyPEuwTTyE+7RDGQTYwHx/5LLYRJfu6nnoEAt8sZesvkaYEcWScssaZiUb+Aht0rbQTeiM3FLy1USPc89cYBTa6TCbDEh+wC1G/6vVP8q2yy8Ln1L/muHyQG9l4V/PiJVrNUWMkR3jSR1VKf4Nkcn+CDAAJ2LbtklBp/UAAAAASUVORK5CYII=">&nbsp;&nbsp;全选</label>
      </div>
      <div class="shopping-cart-selected-money">
        总计： <div class="selected-money">￥ {{money}}</div>
      </div>
      <div class="shopping-cart-checkout-button">
        结算({{selectedNum}})
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
      goodsBuyCount: [],
      goodsSelectedStatus: {},
      money: 0,
      selectAllGoods: false,
      selected_item_count: 0,

      selectedNum: 0,
      notSelectedNum: 0,
      goodsNum: 0
    }
  },
  mounted () {
    this.initShoppingCartData()
  },
  methods: {
    initShoppingCartData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/shoppingCart').then(response => {
        this.data = response.data.data
        let detailList = response.data.data.shoppingCartDetailList
        for (let index in detailList) {
          this.goodsBuyCount[detailList[index].sku.skuId] = detailList[index].count
          this.goodsSelectedStatus[detailList[index].sku.skuId] = false
          this.notSelectedNum++
        }
        this.goodsNum = this.notSelectedNum
        this.selectAllGoods = false
      })
    },
    deleteShoppingCartItem (skuId) {
      this.$http.delete(process.env.API_ROOT + '/api/mall/shoppingCart?&skuId=' + skuId).then(response => {
        this.initShoppingCartData()
      })
    },
    updateShoppingCartItemCount (goodsId, skuId) {
      this.$http.put(process.env.API_ROOT + '/api/mall/shoppingCart?skuId=' + skuId + '&count=' + this.goodsBuyCount[skuId]).then(response => {
      })
    },
    selectedGoodsChanged (skuId) {
      if (this.goodsSelectedStatus[skuId] === true) {
        this.selectedNum++
        this.notSelectedNum--
      } else if (this.goodsSelectedStatus[skuId] === false) {
        this.selectedNum--
        this.notSelectedNum++
      }
      if (this.notSelectedNum === 0) {
        this.selectAllGoods = true
      } else {
        this.selectAllGoods = false
      }
      console.log(this.selectedNum)
      console.log(this.notSelectedNum)
      console.log(this.selectAllGoods)
      console.log(this.goodsSelectedStatus)
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
        this.goodsSelectedStatus[index] = this.selectAllGoods
      }
      // console.log(this.selectedNum)
      // console.log(this.notSelectedNum)
      // console.log(this.selectAllGoods)
      // console.log(this.goodsSelectedStatus)
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart-container {
  background-color: #f5f5f5;
  height: 100%;
}

.shopping-cart-empty-text {
  text-align: center;
  height: 100%;
  padding: 100% 0;
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

.shopping-cart-item-box {
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

.shopping-cart-blank-block {
  height: 100px;
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
