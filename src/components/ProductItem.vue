<template>
  <li class="catalog__item">
    <div v-if="product.image">
      <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
        <img :src="product.image" alt="Название товара" />
      </router-link>
    </div>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} {{ product.id }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>
    <ColorItem :colors="colors" />

    <!-- <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color-1"
            value="#73B6EA"
            checked=""
          />
          <span class="colors__value" style="background-color: #73b6ea"> </span>
        </label>
      </li>
    </ul> -->
  </li>
</template>
<script>
import ColorItem from "./ColorItem.vue";
// import  from '@vue/composition-api'
export default {
  props: ["product"],
  components: { ColorItem },
  computed: {
    colors() {
      console.log("this.product.colors=", this.product.colors);
      return this.product.colors;
    },
  },
};
</script>

ColorItemFilter
