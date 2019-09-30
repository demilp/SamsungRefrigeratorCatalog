import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";
import timeout from "./plugins/timeout";
import session from "./plugins/session";
import content from "./plugins/content";

//Vue.use(timeout);
Vue.use(content);
Vue.use(session);
Vue.use(VueResource);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
