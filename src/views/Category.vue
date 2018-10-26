<template>
    <div class="containter">
        <carousel :navigationEnabled="true">
            <slide v-for="product in products" :key="product.sys.id">
                <router-link :to="'/product/'+product.fields.model" tag="div" class="continue">
                    <span>{{product.fields.technology}}</span>
                    <!--<img :src="'http:'+product.fields.mainImage.fields.file.url">-->
                    <span>{{product.fields.model}}</span>
                    <span>{{product.fields.capacity}} Lts.</span> 
                </router-link>                
            </slide>
        </carousel>
    </div>
</template>

<script>
import {Carousel, Slide} from 'vue-carousel';
export default {
    name: 'Category',
    components:{
        Carousel,
        Slide
    },
    data:function() {
        return{
            products:[]
        }
    },
    beforeMount(){
        this.products = this.$content.products.filter(p => p.fields.style==this.$route.params.id);
        this.$root.$emit('setheader', this.$route.params.id);
    },
};
</script>
<style scoped>
</style>
