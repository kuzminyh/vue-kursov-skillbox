<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color-1"
          :value="item.code"
          v-model="checkedColor"
        />
        <span class="colors__value" :style="{ background: item.code }"> </span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["colors", "currentColor"],
  computed: {
    checkedColor: {
      get() {},
      set(value) {
        this.$emit("update:currentColor", value);
      },
    },
  },
};
</script>
