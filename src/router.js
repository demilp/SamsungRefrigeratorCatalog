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
      path: "/home",
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
      path: "/technology",
      name: "technology",
      component: Technology
    },
    {
      path: "/comparison/:id",
      name: "comparison",
      component: Comparison
    },
    /*{
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import("./views/About.vue")
    }*/
  ]
});
