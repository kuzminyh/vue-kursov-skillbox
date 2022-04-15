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
  data() {
    return {
      imgSrc: undefined,
      currentColor: undefined,
    };
  },
  props: ["product"],
  components: { ColorItem },
  computed: {
    colors() {
      return this.product.colors;
    },
    // imgSrc() {
    //   return this.product.image;
    // },
    // currentColor() {
    //   console.log("this.product.colors[0].color.id=", this.product.colors[0].color.id);
    //   return this.product.colors[0].color.id;
    // },
  },
  methods: {
    changeImg(value) {
      this.imgSrc = this.product.colors.find((item) => item.color.id === value).gallery[0].file.url;
    },
  },
  mounted() {
    this.imgSrc = this.product.image;
    this.currentColor = this.product.colors[0].color.id;
    console.log(this.currentColor);
  },
};
</script>
