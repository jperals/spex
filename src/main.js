import Vue from "vue";
import App from "./App.vue";
import requireAuth from './require-auth'
import router from "./router";
import store from "./store";

requireAuth(router)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
