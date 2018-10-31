<template>
  <div id="app">
    <Header v-if="['home', 'wait', 'loading'].indexOf($route.name) == -1"/>
    <router-view :kek="$router.fillPath"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 1080px;
  height: 1920px;
  font-family: samsung-medium;
}
@font-face {
  font-family: "samsung-bold";
  src: url("./assets/fonts/SAMSUNGSHARPSANS-BOLD_0.TTF") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "samsung-regular";
  src: url("./assets/fonts/SAMSUNGSHARPSANS-REGULAR.TTF") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "samsung-medium";
  src: url("./assets/fonts/SAMSUNGSHARPSANS-MEDIUM.TTF") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
