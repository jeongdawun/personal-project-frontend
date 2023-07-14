<template>
    <div id="app">
        <div id="map" style="width:100%; height:640px;"></div>
        <input type="date" v-model="checkInDate">체크인 날짜
        <input type="date" v-model="checkOutDate">체크아웃 날짜
        <v-btn @click="checkVacancies">빈자리 찾기</v-btn>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import env from '@/env'

const productModule = 'productModule'

export default {
    head() {
        return {
            script: [
                { type: 'text/javascript', 
                  src: `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.api.MAIN_KAKAO_MAP_API_KEY}&libraries=services`},
            ]}
    },
    data() {
        return {
            // 일단 오늘(2023-07-14) 날짜로 그리고 조회
            // 추후 변경 필요 -> 실제 조회하는 당일날 기준으로 그려지도록
            checkInDate: '2023-07-14',
            checkOutDate: '2023-07-15',
            campsiteVacancy: [],
        }
    },
    methods: {
        ...mapActions(productModule, ['requestStockByMapToSpring']),
        async checkVacancies() {
            const { checkInDate, checkOutDate } = this
            this.campsiteVacancy = await this.requestStockByMapToSpring({ checkInDate, checkOutDate })
            console.log("campsiteVacancy: " + JSON.stringify(this.campsiteVacancy))
            await this.drawMarkers()
        },
        async drawMarkers() {
            const map = this.initializeMap();
            const markerImage = this.createMarkerImage();

            this.campsiteVacancy.forEach(campsite => {
                this.createMarkerAndOverlay(map, markerImage, campsite.address, campsite.vacancy, campsite.id);
            });
        },
        initializeMap() {
            const mapContainer = document.getElementById('map');
                const mapOption = {
                center: new kakao.maps.LatLng(37.54699, 127.09598),
                level: 4
            }
            return new kakao.maps.Map(mapContainer, mapOption);
        },
        createMarkerImage() {
            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
            const imageSize = new kakao.maps.Size(25, 25);
            const imageOption = { offset: new kakao.maps.Point(27, 69) };
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
                                <span class="title">${vacancy} vacancies</span>
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
    },
    async mounted() {
        await this.checkVacancies();
    }
}
</script>

<style>
.customoverlay {
    position: relative;
    bottom: 85px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;
}

.customoverlay:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.customoverlay a {
    display: block;
    text-decoration: none;
    color: #000;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    background: #d95050;
    background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}

.customoverlay .title {
    display: block;
    text-align: center;
    background: #fff;
    margin-right: 35px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
}

.customoverlay:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -12px;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}
#map {
    padding-top: 200px;
}
</style>