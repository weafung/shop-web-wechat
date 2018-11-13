<template>
  <div id="goods-detail">
    <div v-if="JSON.stringify(goodsDetail) !== '{}' ">
      <div class="goods-image-container" v-if="JSON.stringify(goodsDetail.goodsImageList) !== '[]'">
        <el-carousel indicator-position="outside" arrow="always" :interval="2500">
          <el-carousel-item v-for="(value, key, index) in goodsDetail.goodsImageList" :key="index">
            <div class="goods-image">
              <img v-lazy="value.imageUrl" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="goods-price-box" v-if="JSON.stringify(goodsDetail.skuList) !== '[]'">
        <div class="goods-onsale-price">
          <div class="goods-onsale-price-rmb">￥</div>{{(goodsDetail.skuList)[0].salePrice}}
        </div>
        <div class="goods-market-price">
          ￥{{(goodsDetail.skuList)[0].marketPrice}}
        </div>
        <div class="goods-share">
          <i class="iconfont icon-share" />
          分享
        </div>
      </div>
      <div class="goods-title">
        {{goodsDetail.title}}
      </div>
      <div class="goods-introduce">
        {{goodsDetail.introduce}}
      </div>
      <div class="spec-container" v-if="showSpecContainer">
        <div class="spec-mask" @click="hidePanel"></div>
        <div class="spec-body">
          <div class="spec-item-box" v-for="item in Array.from(attributeNameSet)" :key="'attributeName_' + item">
            <div class="spec-item-title">
              {{item}}
            </div>
            <div class="spec-item-attr-box">
              <div class="spec-item-attr" @click="clickAttr(item, attr)" :class="selected[item] == attr ? 'red' : allowKeyValue[item][attr] ? 'white' : 'gray'" v-for="attr in Array.from(attributeNameValue[item])" :key="'attributeNameValue' + attr">
                {{attr}}
              </div>
            </div>
          </div>
          <div class="spec-item-box">
            <div class="spec-item-title">
              购买数量
            </div>
            <div class="spec-item-attr-box">
              <el-input-number v-model="count" :min="1" :max="goodsDetail.limitPerOrder" label="购买数量" :precision="0" style="width:120px;"></el-input-number>
            </div>
          </div>
        </div>
      </div>
      <div class="foot-button-blank-block">
      </div>
      <div class="foot-button-container">
        <router-link to="/" class="homepage-button">
          <i class="iconfont icon-homepage" /> 首页
        </router-link>
        <router-link to="/mall/shoppingCart" class="shopping-cart-button">
          <i class="iconfont icon-shopping-cart" /> 购物车
        </router-link>
        <span class="add-shopping-cart" @click="showPanel">
          加入购物车
        </span>
        <span class="buy-now" @click="showPanel">
          立即购买
        </span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'goods-detail',
  data () {
    return {
      goodsDetail: {
        'firstCategoryId': 0,
        'freeDelivery': false,
        'goodsId': 0,
        'goodsImageList': [
          {
            'imageUrl': 'https://yanxuan.nosdn.127.net/dc1f8f353cbf19e96b3b6df6d2c98baa.png?quality=95&thumbnail=265x265&imageView'
          }
        ],
        'introduce': '',
        'limitPerOrder': 0,
        'secondCategoryId': 0,
        'skuList': [
          {
            'attributes': [
              {
                'attributeName': '颜色',
                'attributeNameId': 2,
                'attributeValue': '黑色',
                'attributeValueId': 4
              },
              {
                'attributeName': '尺寸',
                'attributeNameId': 1,
                'attributeValue': '1.8M',
                'attributeValueId': 2
              }
            ],
            'bonusRatio': 0,
            'goodsId': 0,
            'hidden': false,
            'marketPrice': 0,
            'onsale': true,
            'saleCount': 0,
            'salePrice': 0,
            'skuId': 0,
            'storeCount': 0
          }
        ],
        'title': ''
      },
      attributeNameSet: new Set(),
      attributeNameValue: {},
      skuItems: {},
      selected: {},

      allowKeyValue: {},

      skuId: 0,
      count: 1,
      showSpecContainer: false
    }
  },
  mounted () {
    this.fetchGoodsDetailData()
  },
  methods: {
    showPanel () {
      this.showSpecContainer = true
    },
    hidePanel () {
      this.showSpecContainer = false
    },
    calcDescartes (array) {
      if (array.length < 2) return array[0] || []
      return [].reduce.call(array, function (col, set) {
        var res = []
        col.forEach(function (c) {
          set.forEach(function (s) {
            var t = [].concat(Array.isArray(c) ? c : [c])
            t.push(s)
            res.push(t)
          })
        })
        return res
      })
    },
    fetchGoodsDetailData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/goods?goodsId=' + this.$route.params.goodsId).then(response => {
        this.goodsDetail = response.data.data
        let skuList = this.goodsDetail.skuList
        for (let sku of skuList) {
          let item = ''
          for (let attribute of sku.attributes) {
            item = item + attribute.attributeName + ':' + attribute.attributeValue + '_'
            this.attributeNameSet.add(attribute.attributeName)
            this.attributeNameValue[attribute.attributeName] = this.attributeNameValue[attribute.attributeName] || new Set()
            this.attributeNameValue[attribute.attributeName].add(attribute.attributeValue)

            this.allowKeyValue[attribute.attributeName] = this.allowKeyValue[attribute.attributeName] || []
            this.allowKeyValue[attribute.attributeName][attribute.attributeValue] = true
          }
          this.skuItems[sku.skuId] = item.slice(0, -1)
        }
        console.log('skuItems:')
        console.log(this.skuItems)

        console.log(this.attributeNameSet)
      })
    },
    clickAttr (item, attr) {
      if (!this.allowKeyValue[item][attr]) {
        return
      }

      this.selected = Object.assign({}, this.selected)

      if (this.selected[item] === attr) {
        delete this.selected[item]
      } else {
        this.selected[item] = attr
      }

      for (let key of this.attributeNameSet) {
        // 规格是否已选
        for (let value of this.attributeNameValue[key]) {
          this.allowKeyValue[key][value] = true
          let isSelectedValue = this.selected[key] === value
          // console.log(value + ' isSelectedValue:' + isSelectedValue)
          // 当前规格项的选中项, 跳过判断
          if (isSelectedValue) {
            continue
          }
          // 判断当前规格项的其他选项是否能满足其他规格项的选中项
          let selectedItems = []
          for (let selectedKey in this.selected) {
            if (selectedKey === key) {
              continue
            }
            selectedItems.push(selectedKey + ':' + this.selected[selectedKey])
          }
          let isAllow = false
          for (let skuItemIndex in this.skuItems) {
            let skuItem = this.skuItems[skuItemIndex]
            let isFind = true
            // 此 skuItem 要同时包含所有已选和当前判断项
            // 不包含当前项, 跳过
            if (skuItem.search(key + ':' + value) < 0) {
              continue
            }
            for (let selectedItem of selectedItems) {
              if (skuItem.search(selectedItem) < 0) {
                isFind = false
                break
              }
            }
            if (isFind) {
              isAllow = true
              break
            }
          }
          if (!isAllow) {
            this.allowKeyValue[key][value] = false
          }
        }
      }

      if (Object.keys(this.selected).length === this.attributeNameSet.size) {
        console.log('ok')
        console.log(this.selected)
        let selectedItems = []
        for (let selectedKey in this.selected) {
          selectedItems.push(selectedKey + ':' + this.selected[selectedKey])
        }
        for (let skuItemIndex in this.skuItems) {
          let skuItem = this.skuItems[skuItemIndex]
          let isThis = true
          for (let selectedItem of selectedItems) {
            if (skuItem.search(selectedItem) < 0) {
              isThis = false
              break
            }
          }
          if (isThis) {
            this.skuId = skuItemIndex
            break
          }
        }
        console.log(this.skuId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#goods-detail {
  background-color: #f5f5f5;
  height: 100%;
}
.goods-image-container {
  margin: 10px auto 0px;
  .goods-image {
    height: 300px;
    width: 400px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    height: 400px;
    width: 400px;
  }
}

.goods-price-box {
  width: 100%;
  background-color: white;
  padding: 0 5px;

  .goods-onsale-price-rmb {
    font-size: 18px;
    display: inline;
  }
  .goods-onsale-price {
    display: inline;
    color: #f23030;
    font-size: 32px;
    line-height: 60px;
  }

  .goods-market-price {
    color: #999;
    display: inline;
    font-size: 18px;
    text-decoration: line-through;
  }

  .goods-share {
    float: right;
    border-left: 1px #f5f5f5 solid;
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 14px 20px;
  }
}

.goods-title {
  border-top: 2px #f5f5f5 solid;
  font-weight: 600;
  color: black;
  line-height: 30px;
  background-color: white;
  padding: 0 5px;
}

.goods-introduce {
  color: #080808;
  line-height: 30px;
  background-color: white;
  padding: 0 5px;
  font-weight: 300;
}

.foot-button-blank-block {
  height: 53px;
  background-color: #f5f5f5;
}

.foot-button-container {
  display: flex;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 50px;

  .homepage-button,
  .shopping-cart-button {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-top: 7px;
    padding-bottom: 1px;
  }

  .homepage-button {
    width: 16%;
    padding-left: 1%;
  }

  .shopping-cart-button {
    width: 17%;
    padding-right: 3%;
  }
  .add-shopping-cart {
    text-align: center;
    line-height: 50px;
    height: 50px;
    background-color: #404040;
    color: white;
    padding: 0 5%;
    width: 35%;
  }

  .buy-now {
    text-align: center;
    line-height: 50px;
    height: 50px;
    background-color: #f23030;
    color: white;
    padding: 0 5%;
    width: 32%;
  }
}

.spec-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  .spec-mask {
    flex: 5;
    // background-color: #000000;
    width: 100%;
    height: 100%;
  }
  .spec-body {
    background: #fff;
    flex: 5;
    .spec-item-box {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      padding-left: 1em;
      .spec-item-title {
        color: gray;
        height: 2em;
        line-height: 2em;
      }
      .spec-item-attr-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .spec-item-attr {
          display: inline;
          border: 1px solid #d1d1d1;
          border-radius: 1em;
          padding: 0.3em 0.8em;
          margin: auto 0.5em;
          text-align: center;
        }
        .red {
          border-color: #f23030;
          background-color: #f23030;
          color: white;
        }
        .white {
          background-color: #fff;
          color: black;
        }
        .gray {
          border-color: #bbbbbb;
          border-style: dashed;
          background: #f5f5f5;
          color: #404040;
        }
      }
    }
  }
}
</style>
