<template>
  <div>
    <ProductList :products="products" />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import axios from "axios";

export default {
  components: { ProductList },
  data() {
    return {
      productsData: null,
    };
  },
  computed: {
    products() {
     const result =  this.productsData
        ? this.productsData.items.map((p) => {
            console.log('p.id=', p.id)
            if (p.colors[0].gallery != null) {
              return {
                ...p,
                image: p.colors[0].gallery[0].file.url,
              };
            }
          })
        :  [ ]
        console.log('result.length=', result.length)
       return result 
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
          .get("https://vue-moire.skillbox.cc/api/products")
          .then((response) => {
            this.productsData = response.data;
             console.log(3)
          });
      } catch (err) {
        console.log("error 5=", err);
      }
      console.log("this.productsData=", this.productsData);
    },
  },
  created() {
    console.log(1)  
    this.loadProducts();
    console.log(2)
  },
};
</script>

