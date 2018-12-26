<template>
  <div id="goods">
    <div class="goods-search">
      <input type="text" v-model="title" placeholder="请输入关键词" />
      <button type="primary" @click="handleSearch">搜索</button>
    </div>
    <div class="empty-data-msg" v-if="data.length === 0">
      暂无商品
    </div>
    <div class="goods-items-container" v-if="data.length !== 0">
      <router-link :to="'/goodsDetail/'+ goods.goodsId" class="goods-item" v-for="goods in data" :key="goods.id">
        <div class="goods-img">
          <img :src="goods.goodsImage ? goods.goodsImage : defaultGoodsImage" width="200" height="200" />
        </div>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">
          ¥&nbsp;{{ goods.salePrice / 100 }}
        </div>
      </router-link>
    </div>
    <div class="foot-nav-blank-block"></div>
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
      data: [],
      defaultGoodsImage: 'http://url.w2fzu.com/upload/c0b3a7666eb5dfe95ba0889c47c1a2ea.jpg'
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
#goods {
  width: 100%;
}
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
  width: 100%;
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
        width: 100%;

        .good-img {
          position: relative;
          width: 100%;
        }
        .good-text {
          width: 100%;

          white-space: nowrap;
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
          width: 100%;
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
img {
  width: 100%;
}

.goods-items-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .goods-item {
    width: calc(50% - 5px);
    margin: 5px 0;
    background: #fff;
    .goods-title {
      margin-left: 1em;
      margin-top: 0.5em;
    }
    .goods-price {
      margin-left: 1em;
      margin-top: 0.5em;
      color: #f23030;
    }
  }
}
</style>
