<template>
  <div id="category">
    <div class="category-container" v-if="JSON.stringify(categories) === '{}'">
      <div class="shopping-cart-empty-text">那么多好商品，你都不加购物车吗</div>
    </div>
    <div class="category-container" v-if="JSON.stringify(categories) !== '{}'">
      <div class="category-nav">
        <div v-for="firstNavItem in categories.children" :key="'Category'+firstNavItem.categoryId">
          <router-link class="category-nav-item" replace :to="{path: '/mall/category/' + firstNavItem.categoryId}" active-class="category-nav-item-active">
            {{firstNavItem.title}}
          </router-link>
        </div>
        <div class="foot-nav-blank-block"></div>
      </div>
      <div class="category-content">
        <div class="second-category-container" v-for="secondNavItem in secondCategories[categoryId]" :key="'SecondCategory'+secondNavItem.categoryId">
          <div class="second-category-title">{{secondNavItem.title}}</div>
          <div class="third-category-container">
            <div class="third-category-item" v-for="thirdNavItem in secondNavItem.children" :key="'ThirdCategory'+thirdNavItem.categoryId">
              <img class="lazy-img-fadein" v-lazy="thirdNavItem.image" />
              <div class="third-category-title"> {{thirdNavItem.title}} </div>
            </div>
          </div>
        </div>
        <div class="foot-nav-blank-block"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      categories: {},
      secondCategories: {},
      categoryId: 0
    }
  },
  mounted () {
    this.fetchCategoryData()
  },
  watch: {
    '$route' (to, from) {
      this.categoryId = this.$route.params.categoryId
    }
  },
  methods: {
    fetchCategoryData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/category/?categoryId=0').then(response => {
        this.categories = response.data.data
        this.$router.replace({ path: `/mall/category/${this.categories.children[0].categoryId}` })
        for (let index in this.categories.children) {
          let item = this.categories.children[index]
          this.secondCategories[item.categoryId] = item.children
        }
      })
      this.categoryId = this.$route.params.categoryId
    }
  }
}
</script>

<style lang="scss" scoped>
#category {
  height: 100%;
}

.category-container {
  display: flex;
  justify-content: flex-start;
  .category-nav {
    overflow: scroll;
    height: calc(100vh);
    ::-webkit-scrollbar {
      display: none;
    }
    flex: 1;
    .category-nav-item {
      height: 3em;
      line-height: 3em;
      text-align: center;
      display: block;
    }
    .category-nav-item-active {
      background-color: white;
      color: #f5345e;
      margin: auto;
    }
  }
  .category-content {
    flex: 3;
    background-color: white;
    overflow: scroll;
    height: 100vh;
    width: 100vw;
    ::-webkit-scrollbar {
      display: none;
    }
    .second-category-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      .second-category-title {
        font-weight: 600;
        margin: 2%;
      }
      .third-category-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        .third-category-item {
          flex: 0 0 33%;
          text-align: center;
          img {
            height: 64px;
            width: 64px;
          }
          .third-category-title {
            font-size: 0.8em;
          }
        }
      }
    }
  }
}
</style>
