<template>
  <div>
    <Preloader v-if="productLoading" />
    <main class="content container" v-if="productData">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link
              class="breadcrumbs__link"
              :to="{ name: 'mainFilter', params: { slug: product.category.slug } }"
            >
              {{ product.category.title }}</router-link
            >
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ product.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570 !important" :src="imgSrc" alt="Название товара" />
          </div>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: 150030</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form class="form" action="#" method="POST" @submit.prevent="addToCart">
              <div class="item__row item__row--center">
                <counter-product :count="count" @change="changeCount" />
                <b class="item__price">{{ product.price * count }} ₽ </b>
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
              <Preloader class="item__button" v-if="productLoading" />
              <button v-else class="item__button button button--primery" type="submit">
                В корзину
              </button>
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
import CounterProduct from "@/components/CounterProduct.vue";
import Preloader from "@/components/Preloader.vue";

export default {
  components: { CounterProduct, Preloader },
  data() {
    return {
      productData: null,
      productLoad: false,
      productLoading: true,
      productAdd: false,
      count: 1,
      currentSizeId: 0,
      currentColorItemId: 0,
      imgSrc: undefined,
    };
  },
  computed: {
    product() {
      return this.productData ? this.productData : {};
    },
    colorItemId: {
      get() {
        return this.currentColorItemId;
      },
      set(value) {
        this.currentColorItemId = value;
      },
    },
    sizeId: {
      get() {
        return this.currentSizeId;
      },
      set(value) {
        this.currentSizeId = value;
      },
    },
  },

  methods: {
    ...mapActions(["addToCartData"]),
    async loadProduct() {
      try {
        this.productLoading = true;
        const resp = await axios.get(API_BASE_URL + "/api/products/" + this.$route.params.id);
        this.productData = resp.data;
        this.productLoading = false;
        this.currentSizeId = this.productData.sizes[0].id;
        this.currentColorItemId = this.product.colors[0].color.id;
        this.imgSrc = this.product.colors[0].gallery[0].file.url;
      } catch (error) {
        this.$router.push({ name: "PageNotFound" });
      }
    },
    async addToCart() {
      this.productAdd = false;
      this.productLoading = true;
      await this.addToCartData({
        productId: this.product.id,
        colorItemId: this.colorItemId,
        sizeId: this.sizeId,
        quantity: this.count,
      });
      this.productLoading = false;
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
    colorItemId(value) {
      this.colorItemId = value;
      this.imgSrc = this.product.colors.find((item) => item.color.id === value).gallery[0].file.url;
    },
  },
};
</script>
