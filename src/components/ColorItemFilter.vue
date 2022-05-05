<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="item.id"
          name="color-item"
          v-model="checkedColor1"
        />
        <span class="colors__value" :style="{ background: item.code }"> </span>
      </label>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      checkedColor1: [],
    };
  },
  props: ["colors"],
  watch: {
    checkedColor1() {
      this.$emit("update:checkedColor1", this.checkedColor1);
    },
  },
};
</script>
