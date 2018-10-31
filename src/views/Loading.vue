<template>
  <div>
    Loading
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
      this.$http.get('assets/content/data.json')
      .then(function (res) {
        console.log(res);        
      });
        /*.getEntries()
        .then(res => {
          this.$content.products = res.items.filter(
            i => i.sys.contentType.sys.id == "product"
          );
          this.$content.technologies = res.items.filter(
            i => i.sys.contentType.sys.id == "technology"
          );
          this.$router.push({ path: "wait" });
        })
        .catch(() => {});*/
    }
  },
  mounted: function() {
    if (
      this.$content.technologies !== null &&
      this.$content.products !== null
    ) {
      this.$router.push({ path: "wait" });
    } else {
      this.Load();
    }
  }
};
</script>

<style scoped>
</style>
