<template>
    <div>
      <div class="carouselDiv">
            <v-carousel
            class="mainbanner"
            :continuous="false"
            hide-delimiters
            show-arrows-on-hover
            :cycle="cycle"
            :interval="interval" 
            :height="height" 
            v-model="carouselModel">
                <v-carousel-item v-for="(picture, idx) in bannerPictures" :key="idx">
                    <v-sheet :height="height" tile>
                        <v-row class="fill-height" align="center" justify="center">
                            <v-img :src="picture.img" :height="height"/>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </div>
        <div>
          <v-icon class="moveTop" @click="move">
            mdi-chevron-up
          </v-icon>
        </div>
        <ProductListPage/>
        <!-- <div class="footer">
          <FooterPage/>
        </div> -->
    </div>
</template>

<script>
import FooterPage from '../views/footer/FooterPage.vue'
import ProductListPage from '../views/product/ProductListPage.vue'
export default {
  name: 'Home',

  components: {
    FooterPage,
    ProductListPage
  },
  data () {
        return {
            carouselModel: false,
            bannerPictures: [
                { img: require("@/assets/happycamper/automain.jpg")},
                { img: require("@/assets/happycamper/kidsmain.jpg")},
                { img: require("@/assets/happycamper/dogsmain.jpg")},
            ],
            cycle: true,
            interval: 10000,
            height: 820,
        }
    },
    methods: {
      move() {
      const $topBtn = document.querySelector(".moveTop");
        
      $topBtn.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: "smooth"});
      });
    }
    }
}
</script>

<style scoped>
@import "../assets/styles/fonts.css";
p {
  font-size: 700px;
}
.carouselDiv {
  width: 100%;
  justify-content: center;
  padding-top: 60px;
}
.moveTop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  background-color: rgb(230, 104, 55);
  border-radius: 60%;
  color: rgb(255, 255, 255)
}
/* .footer {
  padding-top: 160px
} */
</style>