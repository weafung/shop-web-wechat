<template>
  <div id="address">
    <div class="address-container">
      <div class="address-item">
        <div class="item-title">
          收货人
        </div>
        <div class="item-content">
          <input type="text" v-model="name" placeholder="姓名" />
        </div>
      </div>
      <div class="address-item">
        <div class="item-title">
          联系电话
        </div>
        <div class="item-content">
          <input type="text" v-model="phone" placeholder="联系电话" />
        </div>
      </div>

      <div class="address-item">
        <div class="item-title">
          省
        </div>
        <div class="item-content">
          <select v-model="provinceId">
            <option v-for="(value, key) in provinceData" :key="key" :value="key">{{value}}</option>
          </select>
        </div>
      </div>
      <div class="address-item">
        <div class="item-title">
          市
        </div>
        <div class="item-content">
          <select v-model="cityId">
            <option v-for="(value, key) in cityData" :key="key" :value="key">{{value}}</option>
          </select>
        </div>
      </div>
      <div class="address-item">
        <div class="item-title">
          区
        </div>
        <div class="item-content">
          <select v-model="districtId">
            <option v-for="(value, key) in districtData" :key="key" :value="key">{{value}}</option>
          </select>
        </div>
      </div>
      <div class="address-item">
        <div class="item-title">
          详细地址
        </div>
        <div class="item-content">
          <textarea v-model="detail" rows="3" placeholder="详细地址" />
          </div>
      </div>
      <!-- <div class="address-item">
        <div class="item-title">
          设为默认
        </div>
        <div class="item-content">
          <input type="checkbox" v-model="first" :value="address.first" :id="'checkbox'" @click="first = !first"/>
          <label for="checkbox">
            <img v-if="first == true" alt="" src="../../assets/images/gou.png">
            <img v-else-if="first == false" alt="" src="../../assets/images/quan.png">
          </label>
        </div>
      </div> -->
    </div>
    <div class="footer-container">
      <div class="save" @click="save">
        保存
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'address-list',
  data () {
    return {
      address: {
        'province': '',
        'city': '',
        'district': '',
        'detail': '',
        'name': '',
        'phone': '',
        'first': false
      },
      provinceId: 1,
      cityId: 1,
      districtId: 1,
      provinceData: {},
      cityData: {},
      districtData: {},
      name: '',
      phone: '',
      detail: '',
      first: false
    }
  },
  mounted () {
    if (this.$route.params.action === 'edit') {
      this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list').then(response => {
        this.provinceData = response.data.data
      })
      this.fetchAddressData()
    } else {
      this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list').then(response => {
        this.provinceData = response.data.data
        this.provinceId = 110000
        this.address['province'] = this.provinceData[this.provinceId]
        this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list?parentId=' + this.provinceId).then(response => {
          this.cityData = response.data.data
          this.cityId = Object.keys(this.cityData)[0]
          this.address['city'] = this.cityData[this.cityId]
          this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list?parentId=' + this.cityId).then(response => {
            this.districtData = response.data.data
            this.districtId = Object.keys(this.districtData)[0]
            this.address['district'] = this.districtData[this.districtId]
          })
        })
      })
    }
  },
  watch: {
    provinceId (to, from) {
      this.address['province'] = this.provinceData[this.provinceId]
      this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list?parentId=' + this.provinceId).then(response => {
        this.cityData = response.data.data
        if (to !== from && from !== 1) {
          this.cityId = Object.keys(this.cityData)[0]
        }
        this.address['city'] = this.cityData[this.cityId]
      })
    },
    cityId (to, from) {
      this.address['city'] = this.cityData[this.cityId]
      this.$http.get(process.env.API_ROOT + '/api/mall/chinaRegion/list?parentId=' + this.cityId).then(response => {
        this.districtData = response.data.data
        if (to !== from && from !== 1) {
          this.districtId = Object.keys(this.districtData)[0]
        }
        this.address['district'] = this.districtData[this.districtId]
      })
    },
    districtId (to, from) {
      if (JSON.stringify(this.districtData) !== '{}' && this.districtData[this.districtId] !== undefined) {
        this.address['district'] = this.districtData[this.districtId]
      }
    },
    first (to, from) {
      this.address.first = to
    },
    name (to, from) {
      this.address['name'] = to
    },
    phone (to, from) {
      this.address['phone'] = to
    },
    detail (to, from) {
      this.address['detail'] = to
    },
    address: {
      handler (newAddress, oldAddress) {
        // console.log(this.address)
      },
      deep: true
    }
  },
  methods: {
    fetchAddressData () {
      this.$http.get(process.env.API_ROOT + '/api/mall/address?addressId=' + this.$route.params.addressId).then(response => {
        this.address = response.data.data
        this.name = this.address['name']
        this.phone = this.address['phone']
        this.detail = this.address['detail']

        let item = []
        item.push(this.address.province)
        item.push(this.address.city)
        item.push(this.address.district)
        this.$http.post(process.env.API_ROOT + '/api/mall/chinaRegion/names', item).then(response => {
          let data = response.data.data
          this.provinceId = data[this.address.province]['regionId']
          this.cityId = data[this.address.city]['regionId']
          this.districtId = data[this.address.district]['regionId']
        })
      })
    },
    save () {
      console.log(this.address)
      let deal = (data) => {
        if (data.code === 200) {
          this.$toast.center('保存成功')
          let self = this
          setTimeout(() => {
            self.$router.go(-1)
          }, 1000)
        } else if (data.code === 400) {
          this.$toast.center('请填写所有内容')
        } else {
          this.$toast.center('网络出错, 请重新尝试')
        }
      }
      if (this.$route.params.action === 'edit') {
        this.$http.put(process.env.API_ROOT + '/api/mall/address', this.address).then(response => {
          deal(response.data)
        })
      } else {
        this.$http.post(process.env.API_ROOT + '/api/mall/address', this.address).then(response => {
          deal(response.data)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#address {
  height: 100%;
}

.address-container {
  background-color: white;
  // padding-top: 3em;
  .address-item {
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    padding: 0.5em 0.3em;
    .item-title {
      flex: 1;
      margin: auto 0;
    }
    .item-content {
      display: flex;
      flex: 2;
      margin: 0 1em 0 0;
      select {
        /* border: solid 1px #000; */
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        padding: 0 10px;
        width: 100%;
        font-size: 1em;
        outline: none;
      }
      input {
        height: 2.5em;
        font-size: 1em;
        padding: 0 10px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        width: 100%;
      }
      input:focus,
      input:hover,
      textarea {
        width: 100%;

        outline: none;
        border-color: #f23030;
      }
      textarea {
        font-size: 1em;

        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 10px;
        resize: none;
        font-family: 'PingFang SC', 'Avenir', Helvetica, Arial, sans-serif;
      }
      img {
        width: 1rem;
        height: 1rem;
        margin: auto;
      }
      input[type='checkbox'] {
        display: none;
      }
    }
  }
}

.footer-container {
  position: fixed;
  bottom: 0;
  width: 100%;

  .save {
    background-color: #f23030;
    color: white;
    height: 3em;
    line-height: 3em;
    text-align: center;
  }
}
</style>
