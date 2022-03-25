import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "main",
    component: MainPage,
    path: "/",
  },
  {
    name: "product",
    component: ProductPage,
    path: "/product/:id",
  },
  {
    name: "cart",
    component: CartPage,
    path: "/cart",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
