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
    orderInfo: null,
    // totalPrice: 0,
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
    updateCartProductAmount(state, { productId, amount }) {
      console.log("productId=", productId);
      const item = state.cartProducts.find(
        (item) =>
          // console.log("item.product.id", item.product.id === productId);
          item.product.id === productId
      );
      console.log("item", item);
      if (item) {
        console.log("state.cartProducts=", productId);
        item.amount = amount;
        item.quantity = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.product.id !== productId);
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
  },
  getters: {
    cartProductsDetail(state) {
      const prod = state.cartProducts.map((item) => {
        console.log("item=", item);
        if (item.color.gallery !== null) {
          return {
            ...item,
            image: item.color.gallery[0].file.url,
            color1: item.color.color.code,
          };
        }
      });
      console.log("prod=", prod);
      return prod;
      // return state.cartProducts;
    },
    totalPrice(state) {},
  },
  actions: {
    async addToCartData(context, { productId, colorItemId, sizeId, quantity }) {
      console.log("context.state.userAccessKey=", context.state.userAccessKey);
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
        const resCart = await axios.get(API_BASE_URL + "/api/baskets", {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        });
        context.commit("updateCartProductData", resCart.data.items);
        context.commit("synCartProducts");
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
        // if (!context.state.userAccessKey) {
        localStorage.setItem("userAccessKey", res.data.user.accessKey);
        context.commit("updateUserAccessKey", res.data.user.accessKey);
        // }
        context.commit("updateCartProductData", res.data.items);
        context.commit("synCartProducts");
        console.log("context.state.userAccessKey=", context.state.userAccessKey);
      } catch (error) {}
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit("updateCartProductAmount", { productId, amount });
    },
    deleteCartProduct(context, productId) {
      context.commit("deleteCartProduct", productId);
    },
    async loadOrderInfo(context, orderId1) {
      try {
        const resp = await axios.get(API_BASE_URL + "/api/orders/" + orderId1, {
          params: {
            userAccessKey: context.state.userAccessKey,
            orderId: orderId1,
          },
        });
        context.commit("updateOrderInfo", res.data);
        console.log("context.state.orderInfo=", context.state.orderInfo);
      } catch (error) {}
    },
  },
  modules: {},
});
