/*import Vue from 'vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import VueLogger from 'vuejs-logger';
import 'babel-polyfill'
import Vuetify from "vuetify";
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import VueInitialsImg from 'vue-initials-img'


Vue.use(Vuetify, {
    iconfont: 'md',
});
Vue.use(router);
Vue.config.productionTip = false
Vue.use(VueInitialsImg)
Vue.use(
    VueKeycloakJs, {
        config: {
            url: process.env.VUE_APP_AUTH_URL,
            realm: 'bc-services',
            clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
        },
        onReady: keycloak => {
        new Vue({
            components: { App },
            router,
            keycloak,
            template: '<App/>'
           // render: h => h(App)
        }).$mount('#app')
    }
})
*/
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

