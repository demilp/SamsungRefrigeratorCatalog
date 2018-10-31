<template>
    <div>
        <carousel :navigationEnabled="true" :perPage=1 :paginationEnabled="false">
            <slide v-for="v in technology.videos" :key="v.sys.id">

            </slide>
        </carousel>
        <video src=""></video>
    </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  name: "Technology",
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      technology: this.$content.technology.find(
        t => t.fields.name == this.$route.params.id
      )
    };
  }
};
</script>

<style scoped>
</style>
