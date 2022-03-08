<template>
  <li class="catalog__item">
    <div v-if="product.image">
      <router-link
        class="catalog__pic"
        :to="{ name: 'product', params: { id: product.id } }">
        <img :src="product.image" alt="Название товара" />
      </router-link>
    </div>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} {{ product.id }} </a>
    </h3>

    <span class="catalog__price"> 3 690 ₽ </span>

    <ul class="colors colors--black">
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
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color-1"
            value="#8BE000"
          />
          <span class="colors__value" style="background-color: #8be000"> </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            name="color-1"
            value="#222"
          />
          <span class="colors__value" style="background-color: #222"> </span>
        </label>
      </li>
    </ul>
  </li>
</template>
<script>
// import  from '@vue/composition-api'
export default {
  props: ["product"],
};
</script>

