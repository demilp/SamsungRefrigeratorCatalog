<template>
  <div>
    <div>
      <!--<img :src="product.fields.images[0].fields.file.url">-->
      <span>{{product.fields.model}}</span>
      <div>
        <div>
          <span>Ancho Neto</span>
          <span>{{product.fields.width}} mm</span>
        </div>
        <div>
          <span>Altura con bisagra</span>
          <span>{{product.fields.height}} mm</span>
        </div>
        <div>
          <span>Profundidad neta con manija</span>
          <span>{{product.fields.depth}} mm</span>
        </div>
        <div>
          <span>Neto Total</span>
          <span>{{product.fields.capacity}} L</span>
        </div>
      </div>
    </div>
    <div>
      <carousel :navigationEnabled="true" :perPage=1 :paginationEnabled="false">
          <slide v-for="p in products" :key="p.sys.id">
            <div>
              <!--<img :src="p.fields.images[0].fields.file.url">-->
              <span>{{p.fields.model}}</span>
              <div>
                <div>
                  <span>Ancho Neto</span>
                  <span>{{p.fields.width}} mm</span>
                </div>
                <div>
                  <span>Altura con bisagra</span>
                  <span>{{p.fields.height}} mm</span>
                </div>
                <div>
                  <span>Profundidad neta con manija</span>
                  <span>{{p.fields.depth}} mm</span>
                </div>
                <div>
                  <span>Neto Total</span>
                  <span>{{p.fields.capacity}} L</span>
                </div>
              </div>
            </div>
          </slide>
      </carousel>      
    </div>
    <router-link :to="'/product/'+product.fields.model" tag="div">X</router-link>
  </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
export default {
  name: "Comparison",
  components:{
    Carousel,
    Slide
  },
  data(){
    return {
      product:{},
      products:[]
    };
  },
  beforeMount(){
    this.product = this.$content.products.find(p => p.fields.model==this.$route.params.id);
    this.products = this.$content.products.filter(p => p.fields.style==this.product.fields.style);
  }
};
</script>

<style scoped>
</style>

