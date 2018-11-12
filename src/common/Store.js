const CHECKOUT_KEY = 'swf-mall-checkout'
const ADDRESS_ID_KEY = 'swf-mall-address-id'

export default {
  fetch () {
    return JSON.parse(window.localStorage.getItem(CHECKOUT_KEY) || '[]')
  },
  save (mallStorage) {
    window.localStorage.setItem(CHECKOUT_KEY, JSON.stringify(mallStorage))
  },
  fetchAddressId () {
    return window.localStorage.getItem(ADDRESS_ID_KEY)
  },
  saveAddressId (addressId) {
    window.localStorage.setItem(ADDRESS_ID_KEY, addressId)
  }
}
