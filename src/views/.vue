<template>
  <div class="wait">
    <router-link to="/home" tag="div">
      <div>
        <span>Descubrí nuestras</span>
        <span> HELADERAS</span>
        
      </div>
      <hr>
      <div>
        <img src="" alt="">
        Top Freezer
      </div>
      <div>
        Conoce más sobre nuestras principales tecnologías
      </div>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Wait",
  data(){
    return {
      video:''
    };
  }
};
</script>

<style scoped>
  .wait{
    width: 100%;
    height: 100%;
  }
  .continue{
    width: 100%;
    height: 100%;
  }
</style>

