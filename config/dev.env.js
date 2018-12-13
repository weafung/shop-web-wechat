'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://192.168.1.212:8080/"',
  API_ROOT: '"http://backend.swf.hs97.cn/"',
  REDIRECT_URL: '"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c6c90720c6c7735&redirect_uri=http://swf.hs97.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"'
})
