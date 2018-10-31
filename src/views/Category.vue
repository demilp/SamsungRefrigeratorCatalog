<template>
    <div class="category">
        <carousel :navigationEnabled="true" :paginationEnabled="false" :perPage=3 class="carousel">
            <slide v-for="product in products" :key="product.sys.id">
                <router-link :to="'/product/'+product.fields.model" tag="div" class="product">
                    <span>{{product.fields.technology}}</span>
                    <div class="product-image-container">
                      <img class="product-image" v-if="product.fields.mainImage" :src="'http:'+product.fields.mainImage.fields.file.url">
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
      products: []
    };
  },
  beforeMount() {
    this.products = this.$content.products.filter(
      p => p.fields.style == this.$route.params.id
    );
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
  color: #0179bd;
  font-size: 5em;
  top: 35%;
}
.product{
  width: 240px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.product-image-container{
  height: 700px;
  display: flex;
  align-items: flex-end;
}
.product-image{
  width: 100%;
  height: auto;
}

.product-model{
  font-family: samsung-bold;
  font-size: 38px;
}
.product-capacity{
  font-family: samsung-regular;
  font-size: 30px;
}
</style>
