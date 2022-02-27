<template>
  <div>
    <ProductList :products="products"/>
    <ul class="catalog__list">
      <li class="catalog__item">
        <a class="catalog__pic" href="#">
          <img
            src="img/product-1.jpg"
            srcset="img/product-1@2x.jpg 2x"
            alt="Название товара"
          />
        </a>

        <h3 class="catalog__title">
          <a href="#"> Кружевной бюстгалтер без косточек </a>
        </h3>

        <span class="catalog__price"> 3 690 ₽ </span>

        <ul class="colors colors--black">
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#73B6EA"
                checked=""
              />
              <span class="colors__value" style="background-color: #73b6ea">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#8BE000"
              />
              <span class="colors__value" style="background-color: #8be000">
              </span>
            </label>
          </li>
          <li class="colors__item">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color-1"
                value="#222"
              />
              <span class="colors__value" style="background-color: #222">
              </span>
            </label>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import  ProductList from "@/components/ProductList.vue";
import axios from "axios"

export default {
   components: { ProductList, },
  data() {
    return {
      productsData: null,
    }

  },
  computed: {
    products() {
      return this.productsData
    }
  },
   methods: {
     loadProducts: async function() {
        console.log(5)
         try {
        console.log(5)
          const resp = await axios.get('https://vue-moire.skillbox.cc/api/products')
          .then((response) => {
            console.log('response.data.items.gallery.url=',response.data.items)
            const itms = response.data.items;
            itms.map((p) => {
             return { ...p,
              image: p.gallery.file.url
            }
            })

            this.productsData = itms
            console.log('itms=', itms)
            // {
            //   ...response.data.items,
            //   url: response.data.items.gallery.url
            //   }
            })
        }
        catch(err){
        }
    }
  },
  created() {
    this.loadProducts()
  }
};

</script>

