<template>
  <div class="comparison">
    <div class="container">
      <div class="content">
        <div class="product-image-container">
          <img class="product-image" v-if="product.fields.mainImage" :src="'/content/'+product.fields.mainImage.fields.file.url"
          v-bind:style="{
            height: product.fields.height/3+'px'/*!wider?(900*(product.fields.height/biggest.fields.height))+'px':'auto'*/, 
            width: 'auto'/*wider?(250*(product.fields.width/biggest.fields.width))+'px':'auto'*/
          }">
        </div>
        <span class="product-model">{{product.fields.model}}</span>
        <div class="information-container">
          <div class="information">
            <span>Ancho Neto</span>
            <span class="product-data">{{product.fields.width}} mm</span>
          </div>
          <div class="information">
            <span>Altura con bisagra</span>
            <span class="product-data">{{product.fields.height}} mm</span>
          </div>
          <div class="information">
            <span>Profundidad neta con manija</span>
            <span class="product-data">{{product.fields.depth}} mm</span>
          </div>
          <div class="information">
            <span>Neto Total</span>
            <span class="product-data">{{product.fields.capacity}} L</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="content">
      <carousel class="carousel" :navigationEnabled="true" :perPage=1 :paginationEnabled="false">
        <slide class="" v-for="p in products" :key="p.sys.id">
          <div class="content2">
            <div class="product-image-container">
              <img class="product-image" v-if="p.fields.mainImage" :src="'/content/'+p.fields.mainImage.fields.file.url"
              v-bind:style="{
                height: p.fields.height/3+'px'/*!wider?(900*(product.fields.height/biggest.fields.height))+'px':'auto'*/, 
                width: 'auto'/*wider?(250*(product.fields.width/biggest.fields.width))+'px':'auto'*/
              }">
            </div>
            <span class="product-model">{{p.fields.model}}</span>
            <div class="information-container">
              <div class="information">
                <span>Ancho Neto</span>
                <span class="product-data">{{p.fields.width}} mm</span>
              </div>
              <div class="information">
                <span>Altura con bisagra</span>
                <span class="product-data">{{p.fields.height}} mm</span>
              </div>
              <div class="information">
                <span>Profundidad neta con manija</span>
                <span class="product-data">{{p.fields.depth}} mm</span>
              </div>
              <div class="information">
                <span>Neto Total</span>
                <span class="product-data">{{p.fields.capacity}} L</span>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
      </div>
    </div>
    <router-link class="close-btn" :to="'/product/'+product.fields.model" tag="div">X</router-link>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Comparison",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      product: {},
      products: []
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

    this.product = this.$content.product.find(
      p => p.fields.model == this.$route.params.id
    );
    this.products = this.$content.product.filter(
      p => p.fields.style == this.product.fields.style
    );

    this.$root.$emit("setheader", {
      page: "comparison",
      id: this.$route.params.id,
      style: this.product.fields.style
    });
  }
};
</script>

<style scoped>
.comparison {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 500px;
}
.container {
  background-color: #ecedef;
  width: 40%;
  height: 1000px;
}
.content {
  width: 100%;
  margin-top: -400px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.product-image-container {
  height: 900px;
  width: 250px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.product-image {
  /*width: 100%;*/
  /*height: auto;*/
  margin-bottom: 25px;
}
.product-model {
  font-family: samsung-bold;
  font-size: 30px;
  margin-bottom: 25px;
}
.carousel-container {
  width: 100%;
}
.carousel {
  width: 100%;
}
.content2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/deep/ .VueCarousel-navigation-button {
  color: #0179bd !important;
  font-size: 5em !important;
  top: 35% !important;
}
/deep/ .VueCarousel-navigation-next {
  right: 40px !important;
}
/deep/ .VueCarousel-navigation-prev {
  left: 40px !important;
}
.information-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
}
.information {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 30px 0 30px 0;
  width: 100%;
  font-size: 0.8em;
}
.information::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: gray;
  top: -120%;
  left: 0;
}
.product-data {
  font-size: 2em;
}
.close-btn {
  position: absolute;
  right: 75px;
  top: -500px;
  color: #0378bd;
  font-size: 5em;
  font-family: samsung-bold;
}
</style>
