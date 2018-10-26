<template>
  <div id="app">
    <Header v-if="['home', 'wait', 'loading'].indexOf($route.name) == -1"/>
    <router-view :kek="$router.fillPath"/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components:{
    Header,
  }
}
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>