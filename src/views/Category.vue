
<template>
  <div class="category">
    <carousel
      :navigationEnabled="true"
      :paginationEnabled="false"
      :perPage="3"
      class="carousel"
      v-bind:class="{ centered: products.length < 3 }"
    >
      <slide v-for="product in products" :key="product.sys.id" class="product-container">
        <router-link :to="'/product/'+product.fields.model" tag="div" class="product">
          <div class="logo-container">
            <img
              v-if="product.fields.technology=='twincooling'"
              src="@/assets/category/categoria_logo_twin_cooling.png"
            />
          </div>
          <div class="product-image-container">
            <img
              class="product-image"
              v-if="product.fields.mainImage"
              :src="'./content/'+product.fields.mainImage.fields.file.url"
              v-bind:style="{
              height: 'auto',
              width: (refrigeratorStyles.indexOf($route.params.id) > -1)?product.fields.width/3.5+'px':'250px'
              }"
            />
          </div>
          <span class="product-model">{{product.fields.model}}</span>
          <span class="product-capacity">{{product.fields.capacity}} {{refrigeratorStyles.indexOf($route.params.id) !== -1? "Lts.":"Kg."}}</span>
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
      useHeight: true,
      refrigeratorStyles: [
        "topfreezer",
        "bottomfreezer",
        "sidebyside",
        "frenchdoor"
      ],
      wmStyles: ["topload", "frontload", "wdryer", "dryer"]
    };
  },
  beforeMount() {
    if (
      this.$content.technology == null ||
      this.$content.product == null ||
      this.$content.video == null
    ) {
      this.$router.push({ path: "/" });
      return;
    }

    this.products = this.$content.product.filter(
      p => p.fields.style == this.$route.params.id
    );
    
    if (this.refrigeratorStyles.indexOf(this.$route.params.id) > -1) {
      let aspect = 240 / 6;
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
    }

    if (this.products.length == 1) {
      this.$router.push({ path: "/product/" + this.products[0].fields.model });
    }

    this.$root.$emit("setheader", {
      page: "category",
      id: this.$route.params.id,
      type:
        this.refrigeratorStyles.indexOf(this.$route.params.id) != -1
          ? "heladera"
          : "lavarropas"
    });
  }
};
</script>
<style scoped>
.category {
  display: flex;
  justify-content: center;
  background-color: #ecedef;
  margin-top: 650px;
  height: 750px;
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
  justify-content: flex-start;
}
.product {
  width: 250px;
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
  font-size: 30px;
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
