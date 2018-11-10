<template>
  <div class="category-container">
    <div v-if="JSON.stringify(fetchUserData) === '{}'">
      <div class="shopping-cart-empty-text">那么多好商品，你都不加购物车吗</div>
    </div>
    <div v-if="JSON.stringify(fetchUserData) !== '{}'">
      123
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      userData: {
      }
    }
  },
  mounted () {
    this.fetchUserData()
  },
  methods: {
    fetchUserData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/shoppingCart').then(response => {
        this.data = response.data.data
        let detailList = response.data.data.shoppingCartDetailList
        for (let index in detailList) {
          this.count[detailList[index].sku.skuId] = detailList[index].count
        }
      })
    }
  }
}
</script>

<style scoped>
.category-container {
  background-color: #f5f5f5;
  height: 100%;
}
</style>
