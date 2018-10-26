<template>
  <div class="home">
    <div>
      <div>
        <span>¿Que clase de heladera estas buscando?</span>        
      </div>
      <div>
        <ul>
          <li> <router-link to="/category/topfreezer" tag="div" class="continue"><img src="" alt="">Top Freezer</router-link></li>
          <li> <router-link to="/category/bottomfreezer" tag="div" class="continue"><img src="" alt="">Bottom Freezer</router-link></li>
          <li> <router-link to="/category/sidebyside" tag="div" class="continue"><img src="" alt="">Side by Side</router-link></li>
          <li> <router-link to="/category/frenchdoor" tag="div" class="continue"><img src="" alt="">FrenchDoor</router-link></li>
        </ul>
      </div>
      <div>
        <span>DESCUBRÍ NUESTRO AMPLIO LINE UP</span>        
      </div>
    </div>
    <div>
      <span>Conoce más sobre nustras principales tecnologías</span>
      <router-link to="/technology/tweencooling" tag="div"><img src="" alt=""><span>SISTEMA DE REFRIGERECIÓN INDEPENDIENTE</span></router-link>
      <router-link to="/technology/digitalinverter" tag="div"><img src="" alt=""><span>MAYOR AHORRO DE ENERGÍA</span></router-link>      
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return {
    };
  }
};
</script>

<style scoped>
  .home{
    width: 100%;
    height: 100%;
  }
  .continue{
    width: 100%;
    height: 100%;
  }
</style>

