'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//  VUE_APP_API_ENDPOINT: '"http://172-16-100-240.osz4.rdcloud.intra.hitachi.co.jp:3000"'  
//  VUE_APP_API_ENDPOINT: '"http://localhost:3000"'  
  VUE_APP_AUTH_URL: '"https://172-16-106-184.osz4.rdcloud.intra.hitachi.co.jp/auth"',
  //VUE_APP_AUTH_CLIENT_ID: '"hpay-pp"'
  VUE_APP_AUTH_CLIENT_ID: '"hpay-dev"'
})
