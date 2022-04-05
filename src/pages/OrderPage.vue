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
                  />
                  <span class="options__value"> Курьером <b>290 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="1"
                    checked=""
                    v-model="formData.paymentTypeId"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="2"
                    v-model="formData.paymentTypeId"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <order-item />
        <div class="cart__error form__error-block">
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
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      delivery: 1,
      payment: 1,
      formData: {
        deliveryTypeId: 1,
        paymentTypeId: 1,
      },
      formError: {},
    };
  },
  components: { OrderItem, BaseFormText, BaseFormTextArea },
  methods: {
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
      } catch (error) {}
    },
  },
};
</script>
