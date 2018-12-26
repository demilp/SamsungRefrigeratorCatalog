<template>
  <div>
    Cargando...
  </div>
</template>

<script>
export default {
  name: "Loading",
  data: function() {
    return {};
  },
  methods: {
    Load() {
      this.$http
        .get("/content/data.json")
        .then(function(res) {
          this.$content = res.body;
          this.$router.push({ path: "/wait" });
        })
        .catch(() => {});
    },
    readTextFile: function(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            this.$content = JSON.parse(allText);
            this.$router.push({ path: "/wait" });
          }
        }
      };
      rawFile.send(null);
    }
  },
  mounted: function() {
    if (
      this.$content.technology !== null &&
      this.$content.product !== null &&
      this.$content.video !== null
    ) {
      this.$router.push({ path: "/wait" });
    } else {
      //this.Load();
      this.readTextFile("/content/data.json");
    }
  }
};
</script>

<style scoped>
div {
  font-size: 5em;
}
</style>
