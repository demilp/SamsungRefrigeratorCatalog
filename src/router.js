import Vue from "vue";
import Router from "vue-router";
import Wait from "./views/Wait.vue";
import Home from "./views/Home.vue";
import Category from "./views/Category.vue";
import Product from "./views/Product.vue";
import Technology from "./views/Technology.vue";
import Loading from "./views/Loading.vue";
import Comparison from "./views/Comparison.vue";

Vue.use(Router);

export default new Router({
  /*mode:
    window.iframed || window.location.href.indexOf("file://") !== -1
      ? "hash"
      : "history",*/
  routes: [
    {
      path: "/",
      name: "loading",
      component: Loading
    },
    {
      path: "/wait",
      name: "wait",
      component: Wait
    },
    {
      path: "/home/:category",
      name: "home",
      component: Home
    },
    {
      path: "/category/:id",
      name: "category",
      component: Category
    },
    {
      path: "/product/:id",
      name: "product",
      component: Product
    },
    {
      path: "/technology/:id",
      name: "technology",
      component: Technology
    },
    {
      path: "/comparison/:id",
      name: "comparison",
      component: Comparison
    }
  ]
});
