<template>
    <div>
      <div class="carouselDiv">
            <v-carousel
            class="mainbanner"
            :continuous="false"
            :show-arrows="false"
            hide-delimiter-background
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
      <FooterPage/>
    </div>
</template>

<script>
import FooterPage from '../views/footer/FooterPage.vue'
export default {
  name: 'Home',

  components: {
    FooterPage,
  },
  data () {
        return {
            carouselModel: false,
            bannerPictures: [
                { img: require("@/assets/happycamper/img4.jpg")},
                { img: require("@/assets/happycamper/img1.jpg")},
                { img: require("@/assets/happycamper/img2.jpg")},
                { img: require("@/assets/happycamper/img3.jpg")},
            ],
            cycle: true,
            interval: 100000000,
            height: 320,
        }
    }
}
</script>

<style scoped>
@import "../assets/styles/fonts.css";
p {
  font-size: 700px;
}
.searchKeyWord {
  width: 100%;
  height: 40px;
  background-color: #f8f8f8;
  padding: 8px 20px;
  margin-left: 30px;
  font-size: 16px;
  border: none;
  outline: none;

}
.searchBtn {
  height: 40px;
  width: 12%;
  background-color: #73916A;
  border-radius: 33px;

}
.searchDiv {
  border-radius: 33px;
  height: 40px;
  background-color: #f8f8f8;
  width: 30%;
  margin-left: 700px;
  justify-content: center;
  font-family: 'GmarketSans';
  font-weight: 200;
}
.carouselDiv {
  width: 100%;
  justify-content: center;
  padding-top: 20px;
}
.container {
  width: 60%;
}
</style>