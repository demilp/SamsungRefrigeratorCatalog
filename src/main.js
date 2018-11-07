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

let session = { events: [], id: "", dateTime: "" };
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
let timeout = {};
timeout.install = function(Vue) {
  let t = {
    id: null,
    callback: null,
    start: function(time) {
      this.id = setTimeout(() => {
        if (this.callback != null) this.callback();
      }, time);
    },
    stop: function() {
      clearTimeout(this.id);
    }
  };
  Vue.prototype.$timeout = t;
};
Vue.use(timeout);
Vue.use(VueResource);
Vue.use(content);
Vue.use(session);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
