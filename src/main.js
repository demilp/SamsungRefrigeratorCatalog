import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";

let content = { product: null, technology: null, video: null };
content.install = function() {
  Object.defineProperty(Vue.prototype, "$content", {
    get() {
      return content;
    },
    set(v) {
      content = v;
    }
  });
};

let session = [];
session.install = function() {
  Object.defineProperty(Vue.prototype, "$session", {
    get() {
      return session;
    },
    set(v) {
      session = v;
    }
  });
};

Vue.use(VueResource);
Vue.use(content);
Vue.use(session);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
