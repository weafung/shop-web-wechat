<template>
  <div id="goods-detail">
    <div v-if="JSON.stringify(goodsDetail) !== '{}' ">
      <div v-if="JSON.stringify(goodsDetail.goodsImageList) !== '[]'">
        <el-carousel indicator-position="outside" arrow="always" :interval="2500">
          <el-carousel-item v-for="(value, key, index) in goodsDetail.goodsImageList" :key="index">
            <div class="goods-image-container">
              <div class="goods-image">
                <img v-lazy="value.imageUrl" />
              </div>
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
          <i class="iconfont icon-homepage" />
          分享
        </div>
      </div>
      <div class="goods-title">
        {{goodsDetail.title}}
      </div>
      <div class="goods-introduce">
        {{goodsDetail.introduce}}
      </div>
      <div class="foot-button-blank-block">
      </div>
      <div class="foot-button-container">
        <span class="homepage-button" href="/">
          <i class="iconfont icon-homepage" /> 首页
        </span>
        <span class="shopping-cart-button">
          <i class="iconfont icon-shopping-cart" /> 购物车
        </span>
        <span class="add-shopping-cart">
          加入购物车
        </span>
        <span class="buy-now">
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
      }
    }
  },
  mounted () {
    this.fetchGoodsDetailData()
  },
  methods: {
    fetchGoodsDetailData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/goods?goodsId=' + this.$route.params.goodsId).then(response => {
        this.goodsDetail = response.data.data
      })
    }
  }
}
</script>

<style scoped>
#goods-detail {
  background-color: #f5f5f5;
  height: 100%;
}

.goods-image {
  margin: 10px auto;
  width: 70%;
}

img {
  max-width: 100%;
  max-height: 100%;
}

.goods-price-box {
  width: 100%;
  background-color: white;
  padding: 0 5px;
}

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
}

.foot-button-blank-block {
  height: 50px;
}

.foot-button-container {
  padding-left: 2%;
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  height: 50px;
  display: flex;
}

.homepage-button,
.shopping-cart-button {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 20%;
  padding-top: 8px;
}

.add-shopping-cart {
  text-align: center;
  line-height: 50px;
  height: 50px;
  background-color: #404040;
  color: white;
  padding: 0 6%;
}

.buy-now {
  text-align: center;
  line-height: 50px;
  height: 50px;
  background-color: #f23030;
  color: white;
  padding: 0 6%;
}
</style>
