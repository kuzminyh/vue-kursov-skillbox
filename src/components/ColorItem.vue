<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          name="color-item"
          :value="item"
          v-model="colorImg"
        />
        <span class="colors__value" :style="{ background: item.color.code }"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["colors", "currentColor"],
  computed: {
    colorImg: {
      get() {
        return this.currentColor;
      },
      set(value) {
        console.log("item=", value);
        this.$emit("change", value);
      },
    },
  },
};
</script>
