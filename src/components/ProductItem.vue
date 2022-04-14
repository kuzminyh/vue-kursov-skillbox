<template>
  <li class="catalog__item">
    <div v-if="product.image">
      <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
        <img :src="imgSrc" alt=" product.image Название товара" />
      </router-link>
    </div>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} {{ product.id }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>
    <ColorItem :colors="colors" @change="changeImg" :currentColor="currentColor" />
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
    imgSrc() {
      return this.product.image;
    },
    currentColor() {
      return this.product.colors[0].color.id;
    },
  },
  methods: {
    changeImg(value) {
      console.log(value);
      console.log(
        "this.imgSrc=",
        this.product
        //.colors.find((item) => item.color.id === value)
      );
      this.imgSrc = this.product.colors.find((item) => item.color.id === value).gallery[0].file.url;
    },
  },
};
</script>
