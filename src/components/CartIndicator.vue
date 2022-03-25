<template>
  <router-link
    class="header__cart"
    href="cart.html"
    :to="{ name: 'cart' }"
    aria-label="Корзина с товарами"
  >
    <svg width="19" height="24">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">3</span>
  </router-link>
</template>
