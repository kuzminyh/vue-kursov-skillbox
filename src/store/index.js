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
    userAccessKey: null,
    userId: 0,
    cartProductsData: [],
  },
  mutations: {
    updateCartProductData(state, items) {
      state.cartProductsData = items;
    },
    getUserAccessKey(state, { accessKey, userId }) {
      state.userAccessKey = accessKey;
      state.userId = userId;
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    synCartProducts(state) {
      state.cartProducts = state.cartProductsData;
    },
  },
  actions: {
    async addToCartData(context, { productId, colorItemId, sizeId, quantity }) {
      try {
        const res = await axios.post(
          API_BASE_URL + "/api/baskets/products",
          {
            productId: productId,
            colorId: colorItemId,
            sizeId: sizeId,
            quantity: quantity,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        );
        context.commit("updateCartProductData", res.data.items);
        // console.log("res.data.user.id=", res.data.user.id);
        // const dataUser = {
        //   accessKey: res.data.user.accessKey,
        //   userId: res.data.user.id,
        // };
        // context.commit("getUserAccessKey", dataUser);
      } catch (error) {}
    },
    async loadCart(context) {
      try {
        const res = await axios.get(API_BASE_URL + "/api/baskets", {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        if (!context.state.userAccessKey) {
          localStorage.setItem("userAccessKey", res.data.user.accessKey);
          context.commit("updateUserAccessKey", res.data.user.accessKey);
        }
        context.commit("updateCartProductData", res.data.items);
      } catch (error) {}
    },
  },
  modules: {},
});
