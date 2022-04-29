<template>
  <div>
    <main class="content container">
      <div class="content__top">
        <div class="content__row">
          <a href="">
            <h1 class="content__title">Каталог</h1>
          </a>
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
          <Preloader v-if="productLoading" />
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
import Preloader from "@/components/Preloader.vue";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  components: { ProductList, ProductFilter, BasePagination, Preloader },
  data() {
    return {
      productPerPage: 3,
      totalPages: 0,
      page: 1,
      productsData: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterMaterials: [],
      filterCategory: null,
      filterSeson: [],
      filterColor: [],
      productLoading: true,
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
      return result.filter((el) => el !== undefined);
    },
  },
  methods: {
    loadProducts: async function () {
      try {
        this.productLoading = true;
        const resp = await axios.get(API_BASE_URL + "/api/products", {
          params: {
            page: this.page,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            materialIds: this.filterMaterials,
            categoryId: this.filterCategory,
            seasonIds: this.filterSeson,
            colorIds: this.filterColor,
            limit: this.productPerPage,
          },
        });
        this.productsData = resp.data;
        this.totalPages = resp.data.pagination.pages;
        this.productLoading = false;
      } catch (err) {}
    },
    paginate(value) {
      this.page = value;
      this.loadProducts();
    },
  },
  created() {
    if ("$route.params.categoriaId") {
      this.filterCategory = this.$route.params.categoriaId;
    }
    this.loadProducts();
  },
  watch: {
    filterPriceFrom() {
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
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
  },
};
</script>
