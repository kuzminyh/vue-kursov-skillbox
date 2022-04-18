<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.image"
        width="120"
        height="120"
        srcset="img/product-square-4@2x.jpg 2x"
        alt="Название товара"
      />
    </div>
    <h3 class="product__title">{{ item.product.title }}</h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{ background: item.color1 }"></i>
        Персиковый
      </span>
    </p>
    <span class="product__code"> Артикул: 1501230 </span>
    <counter-product :count="amount" @change="changeCount" />
    <b class="product__price"> {{ amount * item.price }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click="deleteItemInCart"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import { mapActions } from "vuex";
import CounterProduct from "./CounterProduct.vue";

export default {
  components: { CounterProduct },
  props: ["item"],
  computed: {
    amount: {
      get() {
        return this.item.quantity;
      },
      set(value) {
        // console.log("this.item=", this.item.id);

        this.$store.dispatch("updateCartProductAmount", { itemId: this.item.id, amount: value });
        console.log({
          itemId: this.item.id,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(["deleteCartProduct"]),
    changeCount(value) {
      if (value > 0) {
        this.amount = value;
      }
    },
    deleteItemInCart() {
      console.log(this.item);
      this.deleteCartProduct({ cartItemId: this.item.id }); //product
    },
  },
};
</script>
