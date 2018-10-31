<template>
  <div class="comparison">
    <div class="container">
      <div class="product-image-container">
        <img class="product-image" v-if="product.fields.mainImage" :src="'http:'+product.fields.mainImage.fields.file.url">
      </div>
      <span class="product-model">{{product.fields.model}}</span>
      <div>
        <div class="information">
          <span>Ancho Neto</span>
          <span>{{product.fields.width}} mm</span>
        </div>
        <div class="information">
          <span>Altura con bisagra</span>
          <span>{{product.fields.height}} mm</span>
        </div>
        <div class="information">
          <span>Profundidad neta con manija</span>
          <span>{{product.fields.depth}} mm</span>
        </div>
        <div class="information">
          <span>Neto Total</span>
          <span>{{product.fields.capacity}} L</span>
        </div>
      </div>
    </div>
    <!--<div class="container">
      <div>
        <carousel class="carousel" :navigationEnabled="true" :perPage=1 :paginationEnabled="false">
            <slide v-for="p in products" :key="p.sys.id">
              <div>
                <img v-if="p.fields.mainImage" :src="p.fields.mainImage.fields.file.url">
                <span>{{p.fields.model}}</span>
                <div class="information">
                  <div>
                    <span>Ancho Neto</span>
                    <span>{{p.fields.width}} mm</span>
                  </div>
                  <div class="information">
                    <span>Altura con bisagra</span>
                    <span>{{p.fields.height}} mm</span>
                  </div>
                  <div class="information">
                    <span>Profundidad neta con manija</span>
                    <span>{{p.fields.depth}} mm</span>
                  </div>
                  <div class="information">
                    <span>Neto Total</span>
                    <span>{{p.fields.capacity}} L</span>
                  </div>
                </div>
              </div>
            </slide>
        </carousel>
      </div> 
    </div>-->
    <router-link :to="'/product/'+product.fields.model" tag="div">X</router-link>
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
    this.product = this.$content.products.find(
      p => p.fields.model == this.$route.params.id
    );
    this.products = this.$content.products.filter(
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
.comparison{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 250px;
}
.container{
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ecedef;
  width: 40%;
  height: 1000px;
}
.product-image-container{
  height: 700px;
  width: 250px;
  display: flex;
  align-items: flex-end;
  
}
.product-image{
  width: 100%;
  height: auto;
  margin-bottom: 25px;
}
.product-model{
  font-family: samsung-bold;
  font-size: 30px;
  margin-bottom: 25px;
}
.carousel{
  
}
.information{
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 15px;
}
.information::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: gray;
    top: -50%;
    left: 0;
}
</style>
