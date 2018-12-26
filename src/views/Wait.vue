<template>
  <div class="wait">
    <router-link to="/home" tag="div">
      <video src="@/assets/wait/c2a.webm" autoplay loop muted>
      </video>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Wait",
  data() {
    return {
      video: ""
    };
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
  }
};
</script>

<style scoped>
.wait {
  width: 100%;
  height: 100%;
}
video {
  width: 100%;
  height: 100%;
}
</style>
