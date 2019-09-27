<template>
  <div class="home">
    <div v-if="category==='heladera'">
      <div class="top">
        <div>
          <h1>
            Elegí la heladera que mejor
            <br />se adapte a tus necesidades
          </h1>
        </div>
        <div>
          <ul>
            <router-link to="/category/frenchdoor" tag="li" class="category">
              <img src="@/assets/home/iconos_heladeras_French_Door.png" alt />
              <span class="category-text">
                French
                <br />Door
              </span>
            </router-link>
            <router-link to="/category/sidebyside" tag="li" class="category">
              <img src="@/assets/home/iconos_heladeras_Side_by_Side.png" alt />
              <span class="category-text">
                Side by
                <br />Side
              </span>
            </router-link>
            <router-link to="/category/bottomfreezer" tag="li" class="category">
              <img src="@/assets/home/iconos_heladeras_freezer_inferior.png" alt />
              <span class="category-text">
                Freezer
                <br />Inferior
              </span>
            </router-link>
            <router-link to="/category/topfreezer" tag="li" class="category">
              <img src="@/assets/home/iconos_heladeras_freezer_superior.png" alt />
              <span class="category-text">
                Freezer
                <br />Superior
              </span>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <h2 class="bottom-text">
          Conoce más sobre nuestras
          <br />principales tecnologías
        </h2>
        <div class="bottom-technologies">
          <router-link to="/technology/twincooling" tag="div" class="bottom-technology">
            <img src="@/assets/home/logos_tecnologias_twin_cooling.png" />
            <hr />
            <span class="technology-text">
              SISTEMA DE REFRIGERECIÓN
              <br />INDEPENDIENTE
            </span>
          </router-link>
          <router-link to="/technology/digitalinverter" tag="div" class="bottom-technology">
            <img src="@/assets/home/logos_tecnologias_digital_inverter.png" />
            <hr />
            <span class="technology-text">MAYOR AHORRO DE ENERGÍA</span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="top">
        <div>
          <h1>
            Elegí el lavarropas que mejor
            <br />se adapte a tus necesidades
          </h1>
        </div>
        <div>
          <ul>
            <router-link to="/category/topload" tag="li" class="category">
              <img src="@/assets/home/topload.png" alt />
              <span class="category-text">
                Carga
                <br />Superior
              </span>
            </router-link>
            <router-link to="/category/frontload" tag="li" class="category">
              <img src="@/assets/home/frontload.png" alt />
              <span class="category-text">
                Carga
                <br />Frontal
              </span>
            </router-link>
            <router-link to="/category/toploaddryer" tag="li" class="category">
              <img src="@/assets/home/toploaddryer.png" alt />
              <span class="category-text">
                Secador
                <br />Carga Superior
              </span>
            </router-link>
            <router-link to="/category/frontloaddryer" tag="li" class="category">
              <img src="@/assets/home/frontloaddryer.png" alt />
              <span class="category-text">
                Secador
                <br />Carga Frontal
              </span>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <h2 class="bottom-text">
          Conoce más sobre nuestras
          <br />principales tecnologías
        </h2>
        <div class="bottom-technologies">
          <router-link to="/technology/twincooling" tag="div" class="bottom-technology">
            <img src="@/assets/home/logos_tecnologias_twin_cooling.png" />
            <hr />
            <span class="technology-text">
              SISTEMA DE REFRIGERECIÓN
              <br />INDEPENDIENTE
            </span>
          </router-link>
          <router-link to="/technology/digitalinverter" tag="div" class="bottom-technology">
            <img src="@/assets/home/logos_tecnologias_digital_inverter.png" />
            <hr />
            <span class="technology-text">MAYOR AHORRO DE ENERGÍA</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      category: ""
    };
  },
  methods: {
    playVideo: function(i) {
      this.currentVideoIndex = i;
    }
  },
  beforeMount: function() {
    if (
      this.$content.technology == null ||
      this.$content.product == null ||
      this.$content.video == null
    ) {
      this.$router.push({ path: "/" });
      return;
    }
  },
  mounted: function() {
    this.category = this.$route.params.category;
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
  font-size: 3.2em;
  margin-bottom: 200px;
}
ul {
  padding: 0 100px 0 100px;
  list-style: none;
  display: flex;
  justify-content: space-around;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.category img {
  width: 109px;
}
.category-text {
  margin-top: 15px;
  color: #1bd4ff;
  font-family: samsung-bold;
  font-size: 2em;
}
.bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e7e7e9;
  height: 918px;
  justify-content: flex-start;
  padding-top: 60px;
  height: 750px;
}
h2 {
  font-size: 3em;
  font-family: samsung-bold;
}
.bottom-technologies {
  display: flex;
  margin-top: 100px;
  flex-direction: row;
  justify-content: space-around;
}
.bottom-technology {
  width: 405px;
}
.bottom-technology > img {
  position: relative;
}
hr {
  width: 100%;
  background-color: black;
  border: none;
  height: 1px;
  margin: 20px 0 20px 0;
}
.technology-text {
  font-size: 1.25em;
}
</style>
