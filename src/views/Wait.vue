<template>
  <div class="wait">
    <video poster="@/assets/wait/poster.jpg" src="@/assets/wait/wait.mp4" autoplay loop muted></video>
    <div class="buttons">
      <router-link to="/home/lavarropas" tag="div" />
      <router-link to="/home/heladera" tag="div" />
    </div>
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
.buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.buttons div {
  width: 50%;
}
</style>
