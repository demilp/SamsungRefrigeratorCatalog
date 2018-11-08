<template>
  <!--<div id="app">-->
  <div id="app" class="unselectable" @touchstart="resetTimeout">
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
    return {};
  },
  beforeMount: function() {
    this.$session = { events: [], id: this.guid(), dateTime: new Date() };
    this.$timeout.callback = () => {
      this.logSession();
      this.$router.push({ path: "/wait" });
    };
    this.$timeout.start(30000);
  },
  methods: {
    resetTimeout: function() {
      this.$timeout.stop();
      this.$timeout.start(30000);
    },
    logSession: function() {
      let session = JSON.stringify(this.$session);
      this.$session = { events: [], id: this.guid(), dateTime: new Date() };
      this.$http
        .post(
          "http://localhost:9501/DexClient/BusinessEvent",
          {
            ApplicationId: 2,
            SecretAppKey: "4df216bd-9900-4ed7-aba4-37a84259187a",
            EventData: session
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(
          res => {
            // eslint-disable-next-line
          console.log('res', res);
          },
          err => {
            // eslint-disable-next-line
          console.log('err', err);
          }
        );
      // eslint-disable-next-line
    },
    guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    }
  },
  watch: {
    "$route.path": function() {
      this.$session.events.push({
        path: this.$route.path,
        dataTime: new Date()
      });
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
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
