<template>
  <div>
    <!-- <main class="content container" v-if="productLoad"> </main> -->
    <main class="content container" v-if="productData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link" href="#"> {{ product.category.title }} </a>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ product.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img
              width="570"
              height="570 !important"
              :src="product.colors[0].gallery[0].file.url"
              alt="Название товара"
            />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: 150030</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <div class="item__row item__row--center">
                <counter-product :count="count" @change="changeCount" />
                <b class="item__price">{{ product.price }} ₽ </b>
              </div>

              <div class="item__row">
                <fieldset class="form__block">
                  <legend class="form__legend">Цвет</legend>
                  <ul class="colors colors--black" v-if="product">
                    <li
                      class="colors__item"
                      v-for="colorItem in product.colors"
                      :key="colorItem.id"
                    >
                      <!-- <span> productLoad = </span> {{colorItem}} -->
                      <label class="colors__label">
                        <input
                          class="colors__radio sr-only"
                          type="radio"
                          name="color-item"
                          :value="colorItem.color.id"
                          v-model="colorItemId"
                        />
                        <span class="colors__value" :style="{ background: colorItem.color.code }">
                        </span>
                      </label>
                    </li>
                  </ul>
                </fieldset>

                <fieldset class="form__block">
                  <legend class="form__legend">Размер</legend>
                  <label class="form__label form__label--small form__label--select">
                    <select class="form__select" type="text" name="category" v-model="sizeId">
                      <option :value="size.id" v-for="size in product.sizes" :key="size.id">
                        {{ size.title }}
                      </option>
                    </select>
                  </label>
                </fieldset>
              </div>

              <button class="item__button button button--primery" type="submit">В корзину</button>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current"> Информация о товаре </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Доставка и возврат </a>
            </li>
          </ul>

          <div class="item__content">
            <h3>Состав:</h3>

            <p>
              <span v-for="mater in product.materials" :key="mater.id">
                {{ mater.title }} <br
              /></span>
            </p>

            <h3>Уход:</h3>

            <p>
              Машинная стирка при макс. 30ºC короткий отжим<br />
              Гладить при макс. 110ºC<br />
              Не использовать машинную сушку<br />
              Отбеливать запрещено<br />
              Не подвергать химчистке<br />
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";
import { mapActions } from "vuex";
import CounterProduct from "../components/CounterProduct.vue";
export default {
  components: { CounterProduct },
  data() {
    return {
      productData: null,
      productLoad: false,
      productAdd: false,
      count: 1,
      // colorItemId: 0,
      sizeId: 0,
    };
  },
  computed: {
    product() {
      console.log("product=", this.productData ? this.productData : {});
      return this.productData ? this.productData : {};
      // return this.productData;
    },
    colorItemId() {
      return this.product.colors[0].color.id;
    },
  },
  methods: {
    ...mapActions(["addToCartData"]),
    loadProduct: async function () {
      this.productLoad = false;
      const resp = axios
        .get(API_BASE_URL + "/api/products/" + this.$route.params.id)
        .then((response) => {
          this.productData = response.data;
          this.productLoad = false;
          console.log(response.data);
        });
    },
    addToCart() {
      alert(this.colorItemId);
      this.productAdd = false;
      this.addToCartData({
        productId: this.product.id,
        colorItemId: this.colorItemId,
        sizeId: this.sizeId,
        quantity: this.count,
      });
    },
    changeCount(value) {
      if (value > 0) {
        this.count = value;
      }
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
