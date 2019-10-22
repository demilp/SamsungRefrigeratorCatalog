<template>
  <div class="product">
    <div class="top">
      <div class="top-left">
        <img v-if="product.fields.descriptionLeft" :src="'./content/'+product.fields.descriptionLeft.fields.file.url" />
      </div>
      <div class="top-center">
        <div class="current-image-container">
          <img class="current-image" :src="'./content/'+currentImage.fields.file.url" />
        </div>
      </div>
      <div class="top-right">
        <router-link :to="'/comparison/'+product.fields.model" tag="div" class="compare">
          <img src="@/assets/product/icono_comparar.png" />
          <span>COMPARAR</span>
          <span>PRODUCTOS</span>
        </router-link>
        <div class="slick-container">
          <div class="slick-arrow" @click="()=>{this.$refs.slick.prev()}">▲</div>
          <slick
            ref="slick"
            :options="{slidesToShow:2, vertical:true, verticalSwiping:true, infinite:false, arrows:false}"
          >
            <div
              v-for="im in product.fields.images"
              :key="im.sys.id"
              class="product-image-container"
            >
              <img
                :src="'./content/'+im.fields.file.url"
                @click="currentImage=im"
                class="product-image"
              />
              <hr />
            </div>
          </slick>
          <div class="slick-arrow" @click="()=>{this.$refs.slick.next()}">▼</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="product-information">
        <div class="product-information-top">
          <div class="product-information-top-model">
            <span class="model-text">{{product.fields.technology}}</span>
            <span class="product-model">{{product.fields.model}}</span>
          </div>
          <div class="product-information-top-size">
            <span>MEDIDAS (WxDxH): </span>&nbsp;
            <span class="bold">{{product.fields.width}} x {{product.fields.depth}} x {{product.fields.height}} mm</span>
          </div>
        </div>

        <hr />
        <!-- <ul>
              <li v-if="this.product.fields.category=='heladera'" class="description"><span>Ancho {{product.fields.width}}mm - Profundidad {{product.fields.depth}}mm - Altura {{product.fields.height}}mm</span></li>
              <li v-for="line in product.fields.description" :key="line" class="description"><span>{{line}}</span></li>
        </ul>-->
        <div class="description-container">
          <!-- <img
            v-for="desc in product.fields.description"
            :key="desc.sys.id"
            :src="'./content/'+product.fields.description"
            class="description"
          />-->
          <img v-if="product.fields.description" :src="'./content/'+product.fields.description.fields.file.url" />
        </div>
      </div>
      <div class="carousel-other-products-container">
        <carousel
          :navigationEnabled="true"
          :perPage="7"
          class="carousel-other-products"
          :paginationEnabled="false"
          v-bind:class="{ centered: products.length < 7 }"
        >
          <slide v-for="p in products" :key="p.sys.id">
            <router-link
              v-if="p.fields.mainImageWithName"
              :to="'/product/'+p.fields.model"
              tag="div"
              class="other-product-container"
            >
              <img :src="'./content/'+p.fields.mainImageWithName.fields.file.url" class="other-product" />
            </router-link>
          </slide>
        </carousel>
      </div>
    </div>
    <div class="popup" v-if="videos.length > 0">
      <div class="popup-content">
        <img
          v-if="techLogo=='twincooling'"
          src="@/assets/product/logos_tecnologias_pop_up_twin_coolong.png"
        />
        <img v-else src="@/assets/product/logos_tecnologias_pop_up_digital_inverter.png" />
        <div class="popup-carousel-container">
          <carousel
            :navigationEnabled="true"
            :perPage="4"
            :paginationEnabled="false"
            class="popup-carousel"
            v-bind:class="{ centered: videos.length < 4 }"
          >
            <slide v-for="(video, index) in videos" :key="video.thumbnail">
              <div v-if="currentVideoIndex==index" class="thumb-selector"></div>
              <img :src="'./content/'+video.thumbnail" @click="playVideo(index)" class="thumb" />
              <img
                src="@/assets/product/thumbnails_video_play.png"
                @click="playVideo(index)"
                class="thumb-videoicon"
              />
            </slide>
          </carousel>
        </div>
        <video
          ref="video"
          :src="'./content/'+videos[currentVideoIndex].video"
          class="popup-video"
          autoplay
        ></video>
        <span class="close-btn" @click="closePopup">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Slick from "vue-slick";
export default {
  name: "Product",
  components: {
    Carousel,
    Slide,
    Slick
  },
  data: function() {
    return {
      product: {},
      products: [],
      currentImage: "",
      popupContent: "",
      videos: [],
      techLogo: "",
      currentVideoIndex: 0
    };
  },
  methods: {
    load: function() {
      debugger
      this.product = this.$content.product.find(
        p => p.fields.model == this.$route.params.id
      );
      this.products = this.$content.product.filter(
        p => p.fields.style == this.product.fields.style
      );

      if (this.product.fields.images)
        this.currentImage = this.product.fields.images[0];
      this.$root.$emit("setheader", {
        page: "product",
        id: this.$route.params.id,
        style: this.product.fields.style,
        type: this.product.fields.category
      });
    },
    changeCurrentImage: function(i) {
      this.currentImage = i;
    },
    popup: function(tec) {
      this.$session.events.push({
        path: this.$route.path + "/" + tec,
        dateTime: new Date()
      });
      let t = this.$content.technology.find(t => t.fields.name === tec);
      this.videos = t.fields.videos.map(v => {
        return {
          video: v.fields.video.fields.file.url,
          thumbnail: v.fields.thumb.fields.file.url
        };
      });
      this.techLogo = tec;
      this.playVideo(0);
      this.$nextTick(() => {
        this.$refs.video.onended = () => {
          this.$timeout.start(30000);
        };
      });
    },
    closePopup: function() {
      this.videos = [];
    },
    playVideo: function(i) {
      this.currentVideoIndex = i;
      this.$nextTick(() => {
        this.$timeout.stop();
        this.$refs.video.play();
      });
    }
  },
  beforeMount() {
    if (
      this.$content.technology == null ||
      this.$content.product == null ||
      this.$content.video == null
    ) {
      this.$router.push({ path: "/" });
      return;
    }

    this.load();
    this.$nextTick(() => {
      this.$refs.slick.goTo(0, true);
    });
  },
  watch: {
    "$route.params.id": function() {
      this.load();
      this.$refs.slick.destroy();
      this.$nextTick(() => {
        this.$refs.slick.create();
        this.$refs.slick.goTo(0, true);
      });
    }
  }
};
</script>
    
<style scoped>
.product {
}
/deep/ .centered .VueCarousel-inner {
  justify-content: center;
}
.popup {
  position: absolute;
  display: flex;
  padding-top: 350px;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #0009;
}
.popup-content {
  width: 100%;
  height: 800px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0;
  position: relative;
}
.popup-carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 25px 0;
  position: relative;
}
.popup-carousel-container::after {
  content: "";
  background-color: #0378be;
  width: 100%;
  position: absolute;
  top: 7.5%;
  height: 100px;
  z-index: 0;
}
.popup-carousel {
  width: 85%;
  z-index: 1;
}
/deep/ .VueCarousel-slide {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
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
.popup-video {
  max-width: 85%;
  max-height: 85%;
}
.close-btn {
  position: absolute;
  right: 25px;
  top: 25px;
  color: #0378bd;
  font-size: 5em;
  font-family: samsung-bold;
}
.top {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 600px;
  width: 100%;
  background-color: #e7e7e9;
  margin-top: 300px;
}
.top::after,
.top::before {
  position: absolute;
  content: "";
  background-color: #babbc0;
  width: 100%;
  z-index: 0;
}
.top::before {
  height: 20px;
  top: 0;
}
.top::after {
  height: 60px;
  bottom: 0;
}
.top-left {
  z-index: 1;
  width: 30%;
  padding: 20px 103px 60px 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  box-sizing: border-box;
}
/* .top-left-part {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  margin: 20px 0;
  position: relative;
}
.top-left-part > hr {
  position: absolute;
  background-color: black;
  width: 150px;
  height: 1px;
  border: 0;
  top: -25px;
  align-self: flex-start;
}

.top-left-part:nth-child(3) {
  align-items: center;
  justify-content: space-around;
} */
.top-center {
  z-index: 1;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: -175px;
}
.current-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.current-image {
  width: auto;
  max-width: 100%;
  max-height: auto;
  margin-bottom: 20px;
}
.top-right {
  z-index: 1;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -25px;
}
.compare {
  position: absolute;
  top: -200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.compare > span {
  text-align: center;
}
.compare > span:first-of-type {
  color: #0086ca;
}
.slick-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.slick-arrow {
  color: #0378be;
  font-size: 3em;
}
.product-image-container {
  height: 175px;
  width: auto;
  display: flex;
  justify-content: center;
}
.product-image {
  height: 100%;
  width: auto;
}
.product-image + hr {
  width: 100%;
  height: 1px;
  background-color: #babbc0;
  bottom: 0;
}

.bottom {
  display: flex;
  flex-direction: column;
}
.product-information {
  padding: 40px;
  display: flex;
  flex-direction: column;
}
.product-information-top{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-information-top-model{
  display: flex;
  flex-direction: column;
}
.product-information-top-size{
  display: flex;
  flex-direction: row;
  font-size: 2em;
  align-self: center;
}
.model-text {
  font-size: 2em;
  font-family: samsung-bold;
  color: #1b98ff;
}
.product-model {
  color: #0184ca;
  font-family: samsung-bold;
  font-size: 2em;
}
hr {
  margin: 10px 0 10px 0;
  border-color: black;
}
ul {
  padding: 0;
}
.description-container {
  background-color: #e7e7e9;
  margin: 0 -40px;
  padding: 40px;
  height: 260px;
}
.description {
  max-height: 125px;
  margin: 15px;
}
/* .description::before {
  color: #0184ca;
  content: "\2022";
  font-size: 2.5em;
  padding-right: 0.2em;
  padding-left: 0.2em;
}
.description:nth-child(odd) {
  background: #ccc;
}
.description:nth-child(even) {
  background: #fff;
} */
.carousel-other-products-container {
  height: 150px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 55px;
}
.carousel-other-products-container::after {
  content: "";
  background-color: #0378be;
  width: 100%;
  position: absolute;
  top: 25%;
  height: 100px;
  z-index: 0;
}
.carousel-other-products {
  display: flex;
  justify-content: center;
  align-self: center;
  width: 85%;
  z-index: 1;
}
.bold{font-family: "samsung-bold"}
/deep/ .carousel-other-products .VueCarousel-navigation-button {
  color: white !important;
  font-size: 4em !important;
  top: 55% !important;
}
/deep/ .popup-carousel .VueCarousel-navigation-button {
  color: white !important;
  font-size: 4em !important;
  top: 50% !important;
}
.other-product-container {
  height: 200px;
}

.other-product {
  height: 100%;
}

/deep/ .slick-slider {
  position: relative;

  display: block;
  box-sizing: border-box;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

/deep/ .slick-list {
  position: relative;

  display: block;
  overflow: hidden;

  margin: 0;
  padding: 0;
}
/deep/ .slick-list:focus {
  outline: none;
}
/deep/ .slick-list.dragging {
  cursor: pointer;
  cursor: hand;
}

/deep/ .slick-slider .slick-track,
.slick-slider .slick-list {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

/deep/ .slick-track {
  position: relative;
  top: 0;
  left: 0;

  display: block;
  margin-left: auto;
  margin-right: auto;
}
/deep/ .slick-track:before,
.slick-track:after {
  display: table;

  content: "";
}
/deep/ .slick-track:after {
  clear: both;
}
/deep/ .slick-loading .slick-track {
  visibility: hidden;
}

/deep/ .slick-slide {
  display: none;
  float: left;

  height: 100%;
  min-height: 1px;
}
/deep/ [dir="rtl"] .slick-slide {
  float: right;
}
/deep/ .slick-slide img {
  display: block;
}
/deep/ .slick-slide.slick-loading img {
  display: none;
}
/deep/ .slick-slide.dragging img {
  pointer-events: none;
}
/deep/ .slick-initialized .slick-slide {
  display: block;
}
/deep/ .slick-loading .slick-slide {
  visibility: hidden;
}
/deep/ .slick-vertical .slick-slide {
  display: flex;

  height: auto;

  border: 1px solid transparent;
  justify-content: center;
}
/deep/ .slick-arrow.slick-hidden {
  display: none;
}
</style>
