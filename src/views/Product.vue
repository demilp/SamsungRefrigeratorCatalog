<template>
    <div class="product">
        <div class="top">
            <div class="top-left">
                <div>
                    <img v-if="product.fields.technology=='twincooling'"  src=""  @click="popup='digitalinverter'"> 
                </div>
                <div>
                    <img src="" @click="popup='digitalinverter'">
                </div>
                <div>
                    <img src="">
                    <span>{{product.fields.capacity}} Litros</span>
                </div>
            </div>
            <div class="top-center">
                <img :src="currentImage.fields.file.url">
            </div>
            <div class="top-right">
                <router-link :to="'/comparison/'+product.fields.model" tag="div">
                    <img src="">
                    Compare
                </router-link>
                <!--<Slider direction="vertical" :pagination-visible="false">
                    <div v-for="im in product.fields.images" :key="im.sys.id">
                        <img :src="im.fields.file.url" @click="currentImage = im">
                    </div>
                </Slider>-->
                <carousel :navigationEnabled="true" class="images-carousel">
                    <slide v-for="im in product.fields.images" :key="im.sys.id">
                        <img :src="im.fields.file.url" @click="currentImage = im">
                    </slide>
                </carousel>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li class="description">Ancho {{product.fields.width}}mm - Profundidad {{product.fields.depth}}mm - Altura {{product.fields.height}}mm</li>
                <li v-for="line in product.fields.description" :key="line" class="description">{{line}}</li>
            </ul>
           <carousel :navigationEnabled="true" :perPage=7>
                <slide v-for="p in products" :key="p.sys.id">
                    <router-link v-if="p.fields.mainImage" :to="'/product/'+p.fields.model" tag="div" class="other-product">
                        <img :src="p.fields.mainImage.fields.file.url">
                    </router-link>
                </slide>
            </carousel>
        </div>
        <div class="popup" v-if="popupContent != ''">
            <carousel>
                <slide>
                    
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Slider from 'vue-plain-slider'
export default {
  name: "Product",
  components: {
    Carousel,
    Slide,
    Slider
  },
  data: function() {
    return {
      product: {},
      products: [],
      currentImage: "",
      popupContent: ""
    };
  },
  methods: {
    load: function() {
      this.product = this.$content.products.find(
        p => p.fields.model == this.$route.params.id
      );
      this.products = this.$content.products.filter(
        p => p.fields.style == this.product.fields.style
      );
      if (this.product.fields.images)
        this.currentImage = this.product.fields.images[0];
      this.$root.$emit("setheader", {
        page: "product",
        id: this.$route.params.id,
        style: this.product.fields.style
      });
    },
    changeCurrentImage: function(i) {
      this.currentImage = i;
    }
  },
  beforeMount() {
    this.load();
  },
  watch: {
    "$route.params.id": function() {
      this.load();
    }
  }
};
</script>
    
<style scoped>
.product{
    width: 90%;
}
.top{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.top-left{
    width: 33.33%;
}
.top-center{
    width: 33.33%;
}
.top-right{
    width: 33.33%;
}
.images-carousel{
    width: 100%;

}
.description:nth-child(odd) {
  background: #ccc;
}
.description:nth-child(even) {
  background: #fff;
}

.other-product{
    height: 25px;
}
</style>
