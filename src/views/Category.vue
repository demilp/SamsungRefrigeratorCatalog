<template>
  <div class="category">
    <carousel :navigationEnabled="true" :paginationEnabled="false" :perPage=3 class="carousel" v-bind:class="{ centered: products.length < 3 }">
      <slide v-for="product in products" :key="product.sys.id" class="product-container">
        <router-link :to="'/product/'+product.fields.model" tag="div" class="product">
          <div class="logo-container">
            <img v-if="product.fields.technology=='twincooling'" src="@/assets/category/categoria_logo_twin_cooling.png">
          </div>
          <div class="product-image-container">
            <img class="product-image" v-if="product.fields.mainImage" :src="'content/'+product.fields.mainImage.fields.file.url"
            v-bind:style="{
              height: 'auto'/*useHeight?(600*(product.fields.height/maxHeight))+'px':'auto'*/,
              width: product.fields.width/3.5+'px'/*!useHeight?(240*(product.fields.width/maxWidth))+'px':'auto'*/
              }">
          </div>
          <span class="product-model">{{product.fields.model}}</span>
          <span class="product-capacity">{{product.fields.capacity}} Lts.</span> 
        </router-link>                
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Category",
  components: {
    Carousel,
    Slide
  },
  data: function() {
    return {
      products: [],
      maxWidth: 0,
      maxHeight: 0,
      useHeight: true
    };
  },
  beforeMount() {
    this.products = this.$content.product.filter(
      p => p.fields.style == this.$route.params.id
    );
    let aspect = 240 / 600;
    let maxAspect = Math.max.apply(
      Math,
      this.products.map(function(o) {
        return o.fields.width / o.fields.height;
      })
    );
    if (maxAspect > aspect) {
      this.useHeight = false;
    } else {
      this.useHeight = true;
    }
    this.maxWidth = Math.max.apply(
      Math,
      this.products.map(function(o) {
        return o.fields.width;
      })
    );
    this.maxHeight = Math.max.apply(
      Math,
      this.products.map(function(o) {
        return o.fields.height;
      })
    );

    if (this.products.length == 1) {
      this.$router.push({ path: "/product/" + this.products[0].fields.model });
    }
    this.$root.$emit("setheader", {
      page: "category",
      id: this.$route.params.id
    });
  }
};
</script>
<style scoped>
.category {
  display: flex;
  justify-content: center;
  background-color: #ecedef;
  margin-top: 788px;
  height: 918px;
}
.carousel {
  width: 80%;
  margin-top: -400px;
}
/deep/ .VueCarousel-navigation-button {
  color: #0179bd !important;
  font-size: 5em !important;
  top: 35% !important;
}
/deep/ .centered .VueCarousel-inner {
  justify-content: center;
}
.product-container {
  display: flex;
  justify-content: center;
}
.product {
  width: 240px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.product-image-container {
  height: 600px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.product-image {
  /*width: 100%;*/
  /*height: auto;*/
  width: auto;
}
.product-model {
  font-family: samsung-bold;
  font-size: 38px;
}
.product-capacity {
  font-family: samsung-regular;
  font-size: 30px;
}
.logo-container {
  display: flex;
  justify-content: center;
  height: 32px;
}
</style>
