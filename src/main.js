// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/iconfont.css'
import ElementUI from 'element-ui'
import './assets/theme/element/index.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '友品'
  }
  next()
})
