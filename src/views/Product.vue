<template>
    <div class="container">
        <div class="top">
            <div class="top-left">
                <div>
                    <img v-if="product.fields.technology=='twincooling'" src="">
                </div>
                <div>
                    <img src="">
                </div>
                <div>
                    <img src="">
                    <span>{{product.fields.capacity}} Litros</span>
                </div>
            </div>
            <div class="top-center">
                <!--<img :src="currentImage.fields.file.url">-->
            </div>
            <div class="top-right">
                <router-link :to="'/comparison/'+product.fields.model" tag="div">
                    <img src="">
                </router-link>
                <carousel :navigationEnabled="true">
                    <slide v-for="im in product.fields.images" :key="im">
                        <!--<img :src="im.fields.file.url" @click="changeImage(im)">-->
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
                    <router-link :to="'/product/'+p.fields.model" tag="div">
                        <!--<img :src="p.fields.images[0].fields.file.url">-->
                        {{p.fields.model}}
                    </router-link>
                </slide>
            </carousel>
        </div>
    </div>
</template>

<script>
    import {Carousel, Slide} from 'vue-carousel';
    export default {
        name:'Product',
        components:{
            Carousel,
            Slide
        },
        data:function() {
            return{
                product:{}
                ,products:[]
                ,currentImage:''
            }
        },
        methods:{
            load: function(){
                this.$root.$emit('setheader', this.$route.params.id);
                this.product = this.$content.products.find(p => p.fields.model==this.$route.params.id);
                this.products = this.$content.products.filter(p => p.fields.style==this.product.fields.style);
                if(this.product.fields.images)
                    this.currentImage = this.product.fields.images[0];
            },
            changeCurrentImage:function(i){
                this.currentImage = i;
            }
        },
        beforeMount(){
            this.load();
        },
        watch:{
            '$route.params.id':function(){
                this.load();
            }
        }
};
</script>
    
<style scoped>
.description:nth-child(odd) {
  background: #ccc;
}
.description:nth-child(even) {
  background: #fff;
}
</style>
