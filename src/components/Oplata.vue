<template>
  <div>
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
</template>
<script>
export default {
  props: ["paymentTypes"],
};
</script>
