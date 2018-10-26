import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ContentfulVue from "contentful-vue";

Vue.config.productionTip = false;
Vue.use(ContentfulVue, {
  space: "",
  accessToken: ""
});

const content = {
  products: null,
  technologies: null,
  
}
content.install = function(){
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
