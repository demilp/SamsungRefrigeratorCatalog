<template>
  <div class="home">
    <div class="top">
      <div>
        <h1>Elegí la heladera que mejor<br>se adapte a tus necesidades</h1>
      </div>
      <div>
        <ul>
          <li> <router-link to="/category/topfreezer" tag="div" class="category"><img src="" alt="">Freezer<br>Superior</router-link></li>
          <li> <router-link to="/category/bottomfreezer" tag="div" class="category"><img src="" alt="">Freezer<br>Inferior</router-link></li>
          <li> <router-link to="/category/sidebyside" tag="div" class="category"><img src="" alt="">Side by<br>Side</router-link></li>
          <li> <router-link to="/category/frenchdoor" tag="div" class="category"><img src="" alt="">French<br>Door</router-link></li>
        </ul>
      </div>
    </div>
    <div class="bottom">  
      <span class="bottom-text">Conoce más sobre nustras<br>principales tecnologías</span>
      <div class="bottom-technologies">
        <router-link to="/technology/tweencooling" tag="div" class="bottom-technology"><img src=""><hr><span>SISTEMA DE REFRIGERECIÓN INDEPENDIENTE</span></router-link>
        <router-link to="/technology/digitalinverter" tag="div" class="bottom-technology"><img src=""><hr><span>MAYOR AHORRO DE ENERGÍA</span></router-link>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.top {
  height: 868px;
}
h1 {
  margin-top: 155px;
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
.category {
  color: #1bd4ff;
  font-family: samsung-bold;
}

.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e7e7e9;
  height: 918px;
}
.bottom-technologies {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bottom-technology {
  width: 445px;
}
.bottom-text {
  font-family: samsung-bold;
}
</style>
