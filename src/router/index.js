import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";
import OrderPage from "@/pages/OrderPage.vue";
import OrderInfoPage from "@/pages/OrderInfoPage.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "main",
    component: MainPage,
    path: "/",
  },
  {
    name: "mainFilter",
    component: MainPage,
    path: "/:slug",
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
  {
    name: "order",
    component: OrderPage,
    path: "/order",
  },
  {
    name: "orderInfo",
    component: OrderInfoPage,
    path: "/orders/:orderId",
  },
  {
    name: "PageNotFound",
    component: PageNotFound,
    path: "*",
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
