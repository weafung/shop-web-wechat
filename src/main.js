// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/iconfont.css'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/load_default.png'),
  loading: require('./assets/images/load_default.png'),
  attempt: 1
})

Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
