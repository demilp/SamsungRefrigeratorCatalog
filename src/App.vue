<template>
  <div id="app">
  <!--<div id="app" @click="resetTimeout" @drag="resetTimeout">-->
    <Header v-if="['home', 'wait', 'loading'].indexOf($route.name) == -1"/>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  },
  data: function() {
    return {
      timeout: setTimeout(() => {
        this.logSession();
        this.$router.push({ path: "/wait" });
      }, 30000)
    };
  },
  methods: {
    resetTimeout: function() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.logSession();
        this.$router.push({ path: "/wait" });
      }, 30000);
    },
    logSession: function() {
      let session = JSON.stringify(this.$session);
      this.$session = [];
      try {
        this.$http.post(
          "http://localhost:9501/DexClient/json/metadata?op=AppBusinessEventApi",
          {
            ApplicationId: 2,
            SecretAppKey: "4df216bd-9900-4ed7-aba4-37a84259187a",
            EventData: session
          }
        ); /*.then(res=>{

        }, err=>{

        });*/
        // eslint-disable-next-line
      }catch(err){
        
      }
    }
  },
  watch: {
    "$route.path": function() {
      this.$session.push(this.$route.path);
    }
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
  overflow: hidden;
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
