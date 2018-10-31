import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ContentfulVue from "contentful-vue";

Vue.config.productionTip = false;
Vue.use(ContentfulVue, {
  space: "5wam72y7e73r",
  accessToken:
    "6fd8c9605458c039f18d3fc206204dc0c71b192ee61d49d8968f8f353d75cda9"
});

const content = {
  products: null,
  technologies: null
};
content.install = function() {
  Object.defineProperty(Vue.prototype, "$content", {
    get() {
      return content;
    }
  });
};
Vue.use(content);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
