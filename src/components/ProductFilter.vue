<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            v-model.number="currentPriceFrom"
            @input="showBtnReset"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            v-model.number="currentPriceTo"
            @input="showBtnReset"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model="currentSelectedCategory"
          >
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                :value="material.id"
                v-model="currentCheckedMaterials"
                @input="showBtnReset"
              />
              <span class="check-list__desc">
                {{ material.title }}
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="seson in sesons" :key="seson.id">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                :value="seson.id"
                v-model="currentСheckedSeson"
                @input="showBtnReset"
              />
              <span class="check-list__desc">
                {{ seson.title }}
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <ColorItemFilter :colors="colors" :checkedColor1.sync="checkedColor" />
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">Применить</button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
        v-if="resetAvailable"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>
import numberFormat from "@/helpers/numberFormat";
import ColorItemFilter from "@/components/ColorItemFilter.vue";
import axios from "axios";
import { API_BASE_URL } from "../config";
export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentSelectedCategory: 0,
      categoriesData: null,
      materialsData: null,
      sesonsData: null,
      currentCheckedMaterials: [],
      currentСheckedSeson: [],
      colorsData: null,
      checkedColor: [],
      resetAvailable: false,
    };
  },
  props: ["priceFrom", "priceTo", "checkedMaterials", "сheckedSeson", "selectedCategory"],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    sesons() {
      return this.sesonsData ? this.sesonsData.items : [];
    },
  },
  components: { ColorItemFilter },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:checkedMaterials", this.currentCheckedMaterials);
      this.$emit("update:checkedSeson", this.currentСheckedSeson);
      this.$emit("update:selectedCategory", this.currentSelectedCategory);
      this.$emit("update:checkedColor", this.checkedColor);
      this.resetAvailable = true;
    },
    loadCategories: async function () {
      try {
        const res = await axios.get(API_BASE_URL + "/api/productCategories");
        this.categoriesData = res.data;
      } catch (error) {}
    },
    loadMaterials: async function () {
      try {
        const res = await axios.get(API_BASE_URL + "/api/materials");
        this.materialsData = res.data;
      } catch (error) {}
    },
    loadColors: async function () {
      try {
        const res = await axios.get(API_BASE_URL + "/api/colors");
        this.colorsData = res.data;
      } catch (error) {}
    },
    loadSesons: async function () {
      try {
        const res = await axios.get(API_BASE_URL + "/api/seasons");
        this.sesonsData = res.data;
      } catch (error) {}
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:checkedMaterials", []);
      this.$emit("update:сheckedSeson", []);
      this.$emit("update:selectedCategory", 0);
      this.$emit("update:checkedColor", []);
      this.resetAvailable = false;
    },
    showBtnReset(value) {
      if (value.target.value) {
        console.log("value=", value);
        this.resetAvailable = true;
      } else {
        this.resetAvailable = true;
      }
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    checkedMaterials(value) {
      this.currentCheckedMaterials = value;
    },
    сheckedSeson(value) {
      this.currentСheckedSeson = value;
    },
    selectedCategory(value) {
      this.currentSelectedCategory = value;
    },
  },
  created() {
    this.loadCategories();
    this.loadMaterials();
    this.loadColors();
    this.loadSesons();
  },
};
</script>
