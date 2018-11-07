<template>
  <div class="good-list-wrap">
    <ul class="good-list-box">
      <li class="good-list-item" v-for="good in data" :key="good.id">
        <router-link :to="'/detail/'+ good.goodsId">
          <div class="good-product">
            <div class="good-img">
              <img class="lazy-img-fadein" v-lazy="good.goodsImage" />
            </div>
            <p class="good-text">{{ good.title }}</p>
            <p class="good-price">
              ¥&nbsp;
              <span class="price">{{ good.salePrice }}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: [
        {
          'firstCategoryId': 1,
          'freeDelivery': false,
          'goodsId': 123456,
          'goodsImage': 'https://haitao.nosdn2.127.net/onlineigdedjll13723.jpg?imageView&thumbnail=188x0&quality=85',
          'introduce': '介绍',
          'limitPerOrder': 2147483647,
          'salePrice': 32,
          'secondCategoryId': 2,
          'thirdCategoryId': 3,
          'title': '轻奢·蕨之语提花四件套'
        }
      ]
    }
  },
  mounted () {
    this.$http.get(process.env.API_ROOT + '/api/mall/category/goods/?firstCategoryId=1').then(response => {
      this.data = response.data.data
    })
  }
}
</script>

<style scoped>
.good-list-wrap {
  background-color: #F5F5F5;
  height: 100%;
}
.good-list-box {
  overflow: hidden;
}
.good-list-item {
  float: left;
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.good-product {
  background-color: #fff;
  padding-bottom: 6px;
  font-size: 0;
  margin: 5px;
}
.lazy-img-fadein {
  width: 100%;
}
a {
  display: block;
}
.good-img {
  position: relative;
  width: 100%;
}
.good-text {
  font-size: 16px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  color: #232326;
  padding: 0 10px;
}
.good-price {
  font-size: 18px;
  overflow: hidden;
  color: #f23030;
  display: inline-block;
  padding: 0 10px 0 8px;
  position: relative;
  line-height: 25px;
}
</style>
