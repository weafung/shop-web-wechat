<template>
  <div id="goods">
    <div class="goods-introduce" v-html="user_contract">

    </div>
    <div class="foot-nav-blank-block"></div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      user_contract: '暂无内容'
    }
  },
  mounted () {
    this.$http.get(process.env.API_ROOT + '/api/config/get?key=user_contract').then(response => {
      if (response.data.code === 200) {
        this.user_contract = response.data.data
        this.user_contract = this.user_contract.replace(/\r?\n/g, '<br />')
      } else {
        this.$toast.center('网络出错, 请刷新页面')
      }
    }).catch(error => {
      console.log(error)
    })
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
