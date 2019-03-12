import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dummyData from "./generate-dummy-data";

Vue.config.productionTip = false;

Promise.all([
  store.dispatch('loadComponents'),
  store.dispatch('loadDiagrams'),
  store.dispatch('loadFrames'),
  store.dispatch('loadStories')
]).then(() => {
  dummyData()
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
)
