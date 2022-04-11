<template>
  <div>
    <main class="content container">
      <div class="content__top">
        <div class="content__row">
          <h1 class="content__title">Каталог</h1>
          <span class="content__info"> 152 товара </span>
        </div>
      </div>
      <div class="content__catalog">
        <ProductFilter
          :priceFrom.sync="filterPriceFrom"
          :priceTo.sync="filterPriceTo"
          :checkedMaterials.sync="filterMaterials"
          :selectedCategory.sync="filterCategory"
          :checkedSeson.sync="filterSeson"
          :checkedColor.sync="filterColor"
        />
        <section class="catalog">
          <ProductList :products="products" />
          <BasePagination :totalPages="totalPages" :page="page" v-on:paginate="paginate" />
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import BasePagination from "@/components/BasePagination.vue";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  components: { ProductList, ProductFilter, BasePagination },
  data() {
    return {
      totalPages: 0,
      page: 1,
      productsData: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterMaterials: [],
      filterCategory: null,
      filterSeson: [],
      filterColor: [],
    };
  },
  computed: {
    products() {
      const result = this.productsData
        ? this.productsData.items.map((p) => {
            if (p.colors[0].gallery !== null) {
              return {
                ...p,
                image: p.colors[0].gallery[0].file.url,
              };
            }
          })
        : [];
      console.log("result=", result);
      return result.filter((el) => el !== undefined);
    },
  },
  methods: {
    loadProducts: async function () {
      try {
        const resp = await axios
          .get(API_BASE_URL + "/api/products", {
            params: {
              page: this.page,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              materialIds: this.filterMaterials,
              categoryId: this.filterCategory,
              seasonIds: this.filterSeson,
              colorIds: this.filterColor,
            },
          })
          .then((response) => {
            this.productsData = response.data;
            this.totalPages = response.data.pagination.total;
            console.log(3);
          });
      } catch (err) {
        console.log("error 5=", err);
      }
      console.log("this.productsData=", this.productsData);
    },
    paginate(value) {
      this.page = value;
      this.loadProducts();
    },
  },
  created() {
    console.log(1);
    this.loadProducts();
    console.log(2);
  },
  watch: {
    filterPriceFrom() {
      console.log("this.filterPriceFrom=", this.filterPriceFrom);
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterMaterials() {
      this.loadProducts();
    },
    filterCategory() {
      this.loadProducts();
    },
    filterSeson() {
      console.log("this.filterSeson=", this.filterSeson);
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
};
</script>
