<template>
  <main class="content container">
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

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model="formData.name"
              :error="formError.name"
              title="ФИО"
              placeholder="Введите ваше полное имя"
            />
            <BaseFormText
              v-model="formData.address"
              :error="formError.address"
              title=">Адрес доставки"
              placeholder="Введите ваш адрес"
            />
            <BaseFormText
              v-model="formData.phone"
              :error="formError.phone"
              title="Телефон"
              placeholder="Введите ваш телефон"
            />
            <BaseFormText
              v-model="formData.email"
              :error="formError.email"
              title="Email"
              placeholder="Введи ваш Email"
            />
            <BaseFormTextArea
              title="Комментарий к заказу"
              v-model="formData.comment"
              :error="formError.comments"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="1"
                    v-model="formData.deliveryTypeId"
                    checked=""
                    @change="changeDelivery"
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    v-model="formData.deliveryTypeId"
                    value="2"
                    @change="changeDelivery"
                  />
                  <span class="options__value"> Курьером <b>290 ₽</b> </span>
                </label>
              </li>
            </ul>
            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="item in paymentTypes" :key="item.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="item.id"
                    v-model="formData.paymentTypeId"
                  />
                  <span class="options__value"> {{ item.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <order-item
          :cartProducts="cartProducts"
          :fromOrderInfoPage="fromOrderInfoPage"
          :delivery="formData.deliveryTypeId"
        />
        <div class="cart__error form__error-block" v-if="isError">
          <h4>Заявка не отправлена!</h4>
          <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import OrderItem from "@/components/OrderItem.vue";
import BaseFormText from "@/components/BaseFormText.vue";
import BaseFormTextArea from "@/components/BaseFormTextArea.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      isError: false,
      delivery: 1,
      payment: 1,
      formData: {
        deliveryTypeId: 1,
        paymentTypeId: 1,
      },
      formError: {},
      fromOrderInfoPage: false,
      paymentTypes: [],
    };
  },
  components: { OrderItem, BaseFormText, BaseFormTextArea },
  methods: {
    async changeDelivery(event) {
      try {
        const res = await axios.get(API_BASE_URL + "/api/payments", {
          params: {
            deliveryTypeId: this.formData.deliveryTypeId,
          },
        });
        this.paymentTypes = res.data;
        this.formData.deliveryTypeId = event.target.value;
      } catch (error) {}
    },
    async order() {
      try {
        const res = await axios.post(
          API_BASE_URL + "/api/orders",
          {
            ...this.formData,
          },
          {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          }
        );
        this.isError = false;
        this.$store.commit("resetCart");
        this.$store.commit("updateOrderInfo", res.data);
        this.$router.push({ name: "orderInfo", params: { orderId: res.data.id } });
      } catch (error) {
        this.formError = error.response.data.error.request;
        this.isError = true;
      }
    },
  },
  computed: {
    ...mapGetters({ cartProducts: "cartProductsDetail" }),
  },
  created() {
    this.changeDelivery();
  },
};
</script>
