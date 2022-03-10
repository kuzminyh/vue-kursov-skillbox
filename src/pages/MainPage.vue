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
        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" />
        <ProductList :products="products" />
      </div>
    </main>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import { API_BASE_URL } from '../config';

export default {
  components: { ProductList, ProductFilter },
  data() {
    return {
      productsData: null,
      filterPriceFrom: 0,
      filterPriceTo: 0,
    };
  },
  computed: {
    products() {
      const result = this.productsData
        ? this.productsData.items.map((p) => {
            console.log("p.id=", p.id);
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
    //   loadProducts() {
    //       axios
    //       .get("https://vue-moire.skillbox.cc/api/products")
    //       .then((response) => {
    //        this.productsData = response.data;
    //          console.log(3)
    //   }
    loadProducts: async function () {
      try {
        const resp = await axios
          .get(API_BASE_URL + '/api/products', {
            params: {
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            }
          })
          .then((response) => {
            this.productsData = response.data;

            console.log(3);
          });
      } catch (err) {
        console.log("error 5=", err);
      }
      console.log("this.productsData=", this.productsData);
    },
  },
  created() {
    console.log(1);
    this.loadProducts();
    console.log(2);
  },
  watch: {
    filterPriceFrom() {
      alert(5)
      console.log('this.filterPriceFrom=', this.filterPriceFrom)
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
  }
};
</script>

