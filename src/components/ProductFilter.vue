<template>
    <aside class="filter">
        <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" v-model.number="currentPriceFrom">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text" v-model.number="currentPriceTo">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text" name="category" v-model="selectedCategory">
                <option value="0" >Все категории</option>
                <option :value="category.id" v-for="category in categories" :key="category.id" >{{category.title}}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Материал</legend>
            <ul class="check-list">
              <li class="check-list__item" v-for="material in materials" :key="material.id">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="material" :value="material.id" v-model="checkedMaterials">
                  <span class="check-list__desc">
                    {{ material.title }}
                    <span>(3)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Коллекция</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="collection" value="лето" checked="" v-model="checkedSeson">
                  <span class="check-list__desc">
                    лето
                    <span>(2)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="collection" value="зима">
                  <span class="check-list__desc">
                    зима
                    <span>(53)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="collection" value="весна">
                  <span class="check-list__desc">
                    весна
                    <span>(24)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="collection" value="осень">
                  <span class="check-list__desc">
                    осень
                    <span>(30)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit" >
            Применить
          </button>
          <button class="filter__reset button button--second" type="button">
            Сбросить
          </button>
        </form>
      </aside>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import axios from 'axios';
import { API_BASE_URL } from '../config';
export default {
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      selectedCategory: 0,
      categoriesData: null,
      materialsData: null,
      checkedMaterials: [],
      checkedSeson: [],
    }
  },
  props: ['priceFrom' , 'priceTo'],
  computed: {
     categories() {
       return this.categoriesData ? this.categoriesData.items : []
     },
     materials() {
       return this.materialsData ? this.materialsData.items : []
     }
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:checkedMaterials', this.checkedMaterials)
      this.$emit('update:checkedSeson', this.checkedSeson)
      this.$emit('update:selectedCategory', this.selectedCategory)
    },
    loadCategories: async function() {
      try {
        const res = await axios.get(API_BASE_URL + '/api/productCategories')
        .then(response => this.categoriesData = response.data)
      } catch (error) {

      }
    },
    loadMaterials: async function() {
      try {
         const res = await axios.get(API_BASE_URL + '/api/materials')
        .then(response => this.materialsData = response.data)
      } catch (error) {

      }
    }

  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value
    },
    priceTo(value) {
      this.currentPriceTo = value
    },
  },
  created(){
    this.loadCategories()
    this.loadMaterials()
  }

}
</script>
