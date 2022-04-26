<template>
  <div>
    <preloader v-if="productLoading" />
    <main class="content container" v-if="orderInfo">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="index.html"> Каталог </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Оформление заказа </a>
          </li>
        </ul>

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo.id }} </span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
              с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
              уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key"> Получатель </span>
                <span class="dictionary__value"> {{ orderInfo.name }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Адрес доставки </span>
                <span class="dictionary__value"> {{ orderInfo.address }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Телефон </span>
                <span class="dictionary__value"> {{ orderInfo.phone }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Email </span>
                <span class="dictionary__value"> {{ orderInfo.email }} </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key"> Способ оплаты </span>
                <span class="dictionary__value"> {{ orderInfo.paymentType }} </span>
              </li>
            </ul>
          </div>
          <OrderItem
            :cartProducts="cartProducts"
            :fromOrderInfoPage="fromOrderInfoPage"
            :delivery="delivery"
          />
        </form>
      </section>
    </main>
  </div>
</template>
<script>
import OrderItem from "@/components/OrderItem.vue";
import Preloader from "@/components/Preloader.vue";
export default {
  data() {
    return {
      fromOrderInfoPage: true,
      productLoading: false,
    };
  },
  components: { OrderItem, Preloader },
  computed: {
    cartProducts() {
      return this.$store.state.orderInfo.basket.items;
    },
    orderInfo() {
      return this.$store.state.orderInfo;
    },
    delivery() {
      return this.$store.state.orderInfo.deliveryType.id;
    },
  },
  methods: {
    async loadOrderInfoInner() {
      this.productLoading = true;
      await this.$store.dispatch("loadOrderInfo", this.$route.params.orderId);
      this.productLoading = false;
    },
  },
  created() {
    this.loadOrderInfoInner();
  },
};
</script>
