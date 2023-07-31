<template>
    <div id="app">
        <div class="mapHeader"><a href="/list"><span class="spanHeader">>> 전체 상품 보러가기</span></a></div>
        <!-- 카카오 맵 -->
        <div id="map" style="width:100%; height:540px;"></div>

        <!-- 날짜 선택 -->
        <v-row no-gutters class="checkDate">
            <v-col cols="12" id="selectDate">
                <v-col cols="6">
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="300"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        ref="datePickerMenu"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <div class="selectPeriod" v-bind="attrs" v-on="on">
                            <span><Strong>날짜 선택</Strong></span>
                            <span class="date">체크인</span>{{ dates[0] }}<span class="mdi mdi-menu-right"></span>
                            <span class="date">체크아웃</span>{{ dates[1] }}
                        </div>
                    </template>
                    <v-date-picker
                        v-model="dates"
                        @input="onDateInput"
                        range
                        multiple
                        no-title
                        color="green lighten-1"
                        :readonly="false"
                    ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="auto">
                    <v-btn text @click="() => checkVacancies(checkInDate, checkOutDate, latitude, longitude)" id="checkStockBtn"><span>현재 위치에서 빈자리 조회하기</span></v-btn>
                </v-col>
            </v-col>
        </v-row>
        <div class="bottomLine"></div>
        
        <!-- 하단 실시간 인기 캠핑장 -->
        <div class="productList">
            <v-row no-gutters>
                <v-col cols="2">
                    <h2>실시간 인기 캠핑장</h2>
                </v-col>
                <v-col cols="10">
                    <v-img :src="require('@/assets/happycamper/icon/camping_icon2.png')" width="28" class="topListIcon"></v-img>
                </v-col>
            </v-row>
            <product-list-form :products="products"/>
        </div>
    </div>
</template>
  
<script>
import ProductListForm from '@/components/product/ProductListForm.vue'
import { mapActions, mapState } from 'vuex';

const productModule = 'productModule'

export default {
    components: {
        ProductListForm
    },
    data() {
        const now = new Date();
        const today = new Date(now.getTime() + (9 * 60 * 60 * 1000));
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {
            menu: false,
            checkInDate: '',
            checkOutDate: '',
            campsiteVacancy: [],
            latitude: 37.5620725197713,
            longitude: 126.96441514598358,
            // latitude: 37.63723063991143,
            // longitude: 126.4566282863237,
            dates: [today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0]],
        }
    },
    methods: {
        ...mapActions(productModule, ['requestStockByMapToSpring', 'requestProductTop8ListToSpring']),
        onDateInput() {
            if(this.dates.length === 2) {
                this.menu = false;
            }
        },
        async checkVacancies(checkInDate, checkOutDate, latitude, longitude) {
            this.checkInDate = this.dates[0];
            this.checkOutDate = this.dates[1];
        
            this.campsiteVacancy = 
                await this.requestStockByMapToSpring({ checkInDate: this.checkInDate, checkOutDate: this.checkOutDate })
            console.log("campsiteVacancy: " + JSON.stringify(this.campsiteVacancy))
            await this.drawMarkers(latitude, longitude)
        },
        async drawMarkers(latitude, longitude) {
            const map = this.initializeMap(latitude, longitude);
            const markerImage = this.createMarkerImage();

            this.campsiteVacancy.forEach(campsite => {
                this.createMarkerAndOverlay(map, markerImage, campsite.address, campsite.vacancy, campsite.id);
            });
        },
        initializeMap(latitude, longitude) {
            const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 7
                }
            this.map = new kakao.maps.Map(mapContainer, mapOption);
            kakao.maps.event.addListener(this.map, 'bounds_changed', () => {
                const latlng = this.map.getCenter();
                this.latitude = latlng.getLat();
                this.longitude = latlng.getLng();

                const resultDiv = document.getElementById('result');
                console.log("현재 위치: " + this.latitude + " " + this.longitude)
            });
            return this.map
        },
        createMarkerImage() {
            const imageSrc = require('@/assets/happycamper/icon/map_icon3.png');
            const imageSize = new kakao.maps.Size(50, 50);
            const imageOption = { offset: new kakao.maps.Point(13, 69) };

            return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        },
        async createMarkerAndOverlay(map, markerImage, address, vacancy, id) {
            try {
                const geocoder = new kakao.maps.services.Geocoder();
                const result = await new Promise((resolve, reject) => {
                    geocoder.addressSearch(address, (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            resolve(result);
                        } else {
                            reject(new Error('Failed to geocode address.'));
                        }
                    });
                });

                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 마커 생성
                const marker = new kakao.maps.Marker({
                    position: coords,
                    image: markerImage,
                });
                
                marker.setMap(map);

                // 커스텀 오버레이 생성
                const content = `
                    <div class="customoverlay">
                        <a href="/product/${id}" target="_blank">
                            <span class="title">${vacancy}</span>
                        </a>
                    </div>
                    `;

                const customOverlay = new kakao.maps.CustomOverlay({
                    map,
                    position: coords,
                    content,
                    yAnchor: 1,
                });
            } catch (error) {
                console.error('Failed to load Kakao Maps SDK:', error);
            }
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
    },
    computed: {
        ...mapState(productModule, ['products']),
    },
    created (){
        this.requestProductTop8ListToSpring()
    },
    async mounted () {
        const checkInDate = new Date();
        const formattedCheckInDate = this.formatDate(checkInDate);

        const checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + 1);
        const formattedCheckOutDate = this.formatDate(checkOutDate);

        this.checkInDate = formattedCheckInDate;
        this.checkOutDate = formattedCheckOutDate;
        await this.checkVacancies(this.checkInDate, this.checkOutDate, this.latitude, this.longitude);
    },
}
</script>

<style scoped>
#app {
    font-family: 'SUIT-Regular';
}
::v-deep .customoverlay {
    position: relative;
    bottom: 15px;
    padding-left: 23px;
    padding-bottom: 19px;
    border-radius: 6px;
}
::v-deep .customoverlay a {
    text-decoration: none;
}
.topListIcon {
    margin-left: -58px;
    margin-top: 3px;
    margin-bottom: -160px
}
::v-deep .customoverlay .title {
    text-align: center;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px !important;
}
#map {
    padding-top: 200px;
}
#selectDate {
    font-size: 16px;
    display: flex;
    justify-content: center;
}
.date {
    color: rgb(128, 128, 128);
    padding-left: 10px;
    padding-right: 20px;
}
.selectPeriod {
    padding: 1%;
    height: 40px;
    border-radius: 6px;
}
.selectPeriod Strong {
    padding-right: 20px;
}
.mdi-menu-right {
    padding-left: 40px;
    padding-right: 30px;
}
.bottomLine {
    background-color: #f3f3f3;
    height: 70px;
    align-items: center;
    text-align: center;
    display: flex;
    position: relative;
    top: -80px;
}
.checkDate {
    background-color: rgb(250, 250, 250);
    border-radius: 33px;
    height: 70px;
    width: 70%;
    align-items: center;
    text-align: center;
    display: flex;
    position: relative;
    top: -40px;
    left: 280px;
    z-index: 1;
    box-shadow: 0px 2px 1px 1px rgb(240, 240, 240);
}
#checkStockBtn {
    background-color: #282F33;
    font-size: 14px;
    color: white;
    height: 40px;
    border-radius: 22px;
}
.productList {
    padding-top: -10px !important;
    width: 80%;
    margin: auto;
}
.product[data-v-6d8b1e1e] {
    padding-top: 40px;
}
.productList h2{
    padding-left: 10px;
    margin-bottom: -120px;
    color: #282F33;
}
.mapHeader {
    background-color: #749eb6;
    height: 90px;
    padding-top: 90px;
    justify-content: center;
    padding-right: 40px;
    display: flex;
}
.mapHeader a {
    color: #ffffff !important;
}
.spanHeader {
    padding-top: 1px !important;
    position: fixed;
    top: 124px;
    font-size: 13px;
    text-align: center;
    align-items: center;
    margin: auto;
}
</style>