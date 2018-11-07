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
        .get("content/data.json")
        .then(function(res) {
          this.$content = res.body;
          this.$router.push({ path: "/wait" });
        })
        .catch(() => {});
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
      this.Load();
    }
  }
};
</script>

<style scoped>
div {
  font-size: 5em;
}
</style>
