'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://192.168.1.212:8080/"',
  REDIRECT_URL: '"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3c6c90720c6c7735&redirect_uri=http://swf.hs97.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"'
})
