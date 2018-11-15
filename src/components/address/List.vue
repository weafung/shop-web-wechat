<template>
  <div id="address-list">
    <div class="empty-data-msg" v-if="JSON.stringify(addressList) === '[]'">
      还没有地址, 快添加一条吧~
    </div>
    <div class="address-list-container">
      <div class="address-list-box" v-if="JSON.stringify(addressList) !== '{}'">
        <div class="address-item" v-for="item in addressList" :key="'address'+item.addressId">
          <label :for="'radio' + item.addressId">
            <div class="left" v-if="select">
              <input type="radio" v-model="addressId" :value="item.addressId" :id="'radio' + item.addressId" />
              <img v-if="addressId == item.addressId" alt="" src="../../assets/images/gou.png">
              <img v-else-if="addressId != item.addressId" alt="" src="../../assets/images/quan.png">
            </div>
            <div class="center">
              <div class="address-who">
                {{item.name}} {{item.phone}}
              </div>
              <div class="address-detail">
                <span class="default-address" v-if="item.default === true">[默认]</span>
                {{item.province}}{{item.city}}{{item.district}}{{item.detail}}
              </div>
            </div>
          </label>
          <div class="right">
            <router-link class="edit-button" :to="'/address/edit/' + item.addressId">编辑</router-link>
            <div class="delete-address" @click="deleteAddress(item.addressId)">
              <i class="iconfont icon-delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <router-link :to="'/address/new/'">新增收货地址</router-link>
    </div>
  </div>
</template>

<script>
import Store from '../../common/Store'

export default {
  name: 'address-list',
  data () {
    return {
      addressList: {},
      count: 1,
      addressId: 0,
      select: this.$route.params.action === 'select'
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/address/list/').then(response => {
        this.addressList = response.data.data
        this.addressId = Store.fetchAddressId()
        console.log(this.addressId)
        // this.addressSelectedStatus = {}
        // for (let index in this.addressList) {
        //   this.addressSelectedStatus[this.addressList[index].addressId] = { 'selected': false, 'count': 1 }
        // }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteAddress (addressId) {
      this.$confirm('删除此地址?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.delete(process.env.API_ROOT + '/api/mall/address', { data: [addressId] }).then(response => {
          this.fetchData()
          this.$toast.center('删除成功')
        })
      })
    }
  },
  watch: {
    addressId (newAddressId, oldAddressId) {
      if (oldAddressId !== 0) {
        Store.saveAddressId(newAddressId)
        // this.$router.go(-1)
        let vm = this
        setTimeout(() => vm.$router.go(-1), 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#address-list {
  height: 100%;
}
.address-list-container {
  .address-list-box {
    display: flex;
    flex-direction: column;
    .address-item {
      background-color: white;
      display: flex;
      flex-direction: row;
      margin: 0.2rem 0;
      height: 4.5rem;
      label {
        flex: 7;
        display: flex;
      }
      .left {
        flex: 1;
        height: 100%;
        width: 100%;
        display: flex;
        img {
          width: 1rem;
          height: 1rem;
          margin: auto;
        }
        input[type='radio'] {
          display: none;
        }
      }
      .center {
        flex: 6;
        margin: auto 1rem;
        .address-detail {
          height: 1.1rem;
          line-height: 1.1rem;
          font-size: 0.8rem;
          overflow: -webkit-paged-x;
        }
      }
      .right {
        flex: 1.5;
        margin: auto;
        display: flex;
        .delete-address {
          flex: 0.5;
        }
        .edit-button {
          flex: 1;
        }
      }
    }
  }
}
.footer-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: white;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.1rem;
  background-color: #f5345e;
  a {
    color: white;
  }
}
</style>
