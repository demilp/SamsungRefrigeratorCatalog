<template>
  <div class="wait">
    <router-link to="/home" tag="div">
      <video src="@/assets/c2a.mp4" autoplay loop muted>

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
