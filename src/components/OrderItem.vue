<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in cartProducts" :key="item.product.id">
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
        Доставка: <b> {{ delivery }} </b>
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
import { mapGetters } from "vuex";

export default {
  props: ["cartProducts", "fromOrderInfoPage", "delivery"],
  computed: {
    // ...mapGetters({ cartProducts: "cartProductsDetail" }),
    totalSum() {
      return this.cartProducts.reduce((sum, current) => sum + current.price * current.quantity, 0);
    },
  },
};
</script>
