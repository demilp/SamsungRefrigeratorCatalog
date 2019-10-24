<template>
  <div class="technology">
    <div class="top">
      <span v-if="tech=='twincooling'">Conocé nuestro nuevo sistema de refrigeración independiente</span>
      <span v-else>Descubrí los beneficios de nuestra tecnología Digital Inverter</span>
    </div>
    <div class="carousel-container">
      <carousel :navigationEnabled="true" :perPage=4 :paginationEnabled="false" class="carousel" v-bind:class="{ centered: videos.length < 4 }">
        <slide v-for="(video, index) in videos" :key="video.thumbnail">
          <div v-if="currentVideoIndex==index" class="thumb-selector"></div>
          <img :src="'./content/'+video.thumbnail" @click="playVideo(index)" class="thumb">
          <img src="@/assets/product/thumbnails_video_play.png" @click="playVideo(index)" class="thumb-videoicon">
        </slide>
      </carousel>
    </div>
    <div class="video-container">
      <video poster="@/assets/wait/poster.jpg" ref="video" :src="'./content/'+videos[currentVideoIndex].video" class="video" autoplay></video>
    </div>
    <router-link class="close-btn" to="/wait" tag="span">X</router-link>
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
      videos: [],
      techLogo: "",
      currentVideoIndex: 0,
      tech: ""
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

    this.tech = this.$route.params.id;

    let t = this.$content.technology.find(t => t.fields.name === this.tech);

    this.videos = t.fields.videos.map(v => {
      return {
        video: v.fields.video.fields.file.url,
        thumbnail: v.fields.thumb.fields.file.url
      };
    });

    if (this.tech == "twincooling") {
      this.techLogo = "http://placehold.it/620x120";
    } else {
      this.techLogo = "http://placehold.it/620x120";
    }
    this.playVideo(0);
    this.$nextTick(() => {
      this.$refs.video.onended = () => {
        this.$timeout.start(30000);
      };
    });
    this.$root.$emit("setheader", {
      page: "technology",
      id: this.$route.params.id
    });
  },
  methods: {
    playVideo: function(i) {
      this.currentVideoIndex = i;
      this.$nextTick(() => {
        this.$timeout.stop();
        this.$refs.video.play();
      });
    }
  }
};
</script>

<style scoped>
.technology {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;
}
.top {
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: samsung-bold;
  text-align: center;
  font-size: 3.25em;
}
.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
  position: relative;
}
.carousel-container::after {
  content: "";
  background-color: #0378be;
  width: 100%;
  position: absolute;
  top: 7.5%;
  height: 100px;
  z-index: 0;
}
.carousel {
  width: 85%;
  z-index: 1;
}
/deep/ .VueCarousel-slide {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
}
/deep/ .centered .VueCarousel-inner {
  justify-content: center;
}
.thumb {
  width: 90%;
  height: auto;
  z-index: 1;
}
.thumb-selector {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ecedef;
  z-index: 0;
}
.thumb-videoicon {
  position: absolute;
  width: 90%;
  height: auto;
  z-index: 2;
}
.video {
  width: 90%;
}
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecedef;
  width: 100%;
  height: 860px;
}
.close-btn {
  position: absolute;
  right: 30px;
  top: -75px;
  color: #0378bd;
  font-size: 5em;
  font-family: samsung-bold;
}
</style>
