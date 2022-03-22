import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_BASE_URL } from "../config";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {},
  actions: {
    addToCartData: async function (context, { productId, colorId, sizeId, quantity }) {
      try {
        const res = await axios.post(API_BASE_URL + "/api/baskets/products", {
          productId: productId,
          colorId: colorId,
          sizeId: sizeId,
          quantity: quantity,
        });
      } catch (error) {}
    },
  },
  modules: {},
});
