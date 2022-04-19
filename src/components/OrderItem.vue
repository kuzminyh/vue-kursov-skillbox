<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in cartProducts" :key="item.id">
        <!-- {{ item }} -->
        <h3>
          {{ item.product.title }}
          <span> &nbsp &nbsp &nbsp</span>
          {{ item.quantity }}
        </h3>
        <!-- <span>{{ item.quantity }}</span> -->
        <b> {{ item.price * item.quantity }} ₽</b>
        <span>Артикул: 150030</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b> {{ deliveryTxt }} </b>
      </p>
      <p>
        Итого: <b> {{ cartProducts.length }} </b> товара на сумму <b>{{ totalSum }}</b>
      </p>
    </div>

    <button v-if="!fromOrderInfoPage" class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      deliveryTxt: "",
    };
  },
  props: ["cartProducts", "fromOrderInfoPage", "delivery"],
  computed: {
    // ...mapGetters({ cartProducts: "cartProductsDetail" }),
    totalSum() {
      return this.cartProducts.reduce((sum, current) => sum + current.price * current.quantity, 0);
    },
  },
  methods: {
    async getDelivery() {
      try {
        const res = await axios.get(API_BASE_URL + "/api/deliveries");
        this.deliveryTxt = res.data.find((item) => item.id === +this.delivery).title;
      } catch (error) {}
    },
  },
  watch: {
    delivery: {
      handler: "getDelivery",
      immediate: true,
    },
  },
};
</script>
