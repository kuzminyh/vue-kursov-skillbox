<template>
  <section class="catalog">
    <ul class="catalog__list" v-if="products.length > 2">
      <ProductItem :product="product"  v-for="product in products"  />
    </ul>
  </section>
</template>

<script>
import ProductItem from "./ProductItem.vue";

export default {
  props: ['products',  ],
  components: { ProductItem },
};

</script>
