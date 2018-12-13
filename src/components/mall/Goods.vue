<template>
  <div id="goods">
    <div class="goods-search">
      <input type="text" v-model="title"  placeholder="请输入关键词"/>
      <button type="primary" @click="handleSearch">搜索</button>
    </div>
    <div class="goods-list-container">
      <ul class="good-list-box">
        <li class="good-list-item" v-for="good in data" :key="good.id">
          <router-link :to="'/goodsDetail/'+ good.goodsId">
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
      <div class="foot-nav-blank-block"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      firstCategoryId: '',
      secondCategoryId: '',
      thirdCategoryId: this.$route.query.thirdCategoryId,
      title: this.$route.query.title,
      data: []
    }
  },
  mounted () {
    this.handleSearch()
  },
  methods: {
    handleSearch () {
      let params = {}
      if (this.title !== '') {
        params['title'] = this.title
      }
      if (this.thirdCategoryId !== '') {
        params['thirdCategoryId'] = this.thirdCategoryId
      }
      this.$http.get(process.env.API_ROOT + '/api/mall/category/goods', { params: params }).then(response => {
        this.data = response.data.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.goods-search {
  margin: 3% 3% 1% 3%;
  width: 94%;
  input {
    outline: none;
    height: 2em;
    width: 80%;
  }
  button {
    outline: none;
    height: 2em;
    width: 14%;
  }
}

.goods-list-container {
  background-color: #f5f5f5;
  height: 100%;
  .good-list-box {
    overflow: hidden;
    .good-list-item {
      float: left;
      width: 50%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: relative;
      .good-product {
        background-color: #fff;
        padding-bottom: 6px;
        font-size: 0;
        margin: 5px;
        .good-text {
          font-size: 15px;
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
      }
    }
  }
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
</style>
