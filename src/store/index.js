import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
  },
  actions: {
    addToCartData() {
      console.log(5);
    },
  },
  modules: {
  },
});
