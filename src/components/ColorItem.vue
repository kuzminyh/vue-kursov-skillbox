<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="item in colors" :key="item.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="item.id" />
        <span class="colors__value" :style="{ background: item.color.code }"> </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["colors"],
  created() {
    // alert(7);
    // console.log("colors=", colors);
  },
};
</script>
