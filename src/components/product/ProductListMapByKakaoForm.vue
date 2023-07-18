<template>
    <div id="app">
        <div id="map" style="width:100%; height:640px;"></div>
        <v-row no-gutters class="checkDate">
            <v-col cols="auto" id="selectDate">
                <p id="date">CHECK IN</p>
                <input type="date" v-model="checkInDate">
                <p id="middleLine"> | </p>
                <p id="date">CHECK OUT</p>
                <input type="date" v-model="checkOutDate">
                <v-btn @click="() => checkVacancies(checkInDate, checkOutDate)" id="checkStockBtn">빈자리 찾기</v-btn>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';

const productModule = 'productModule'

export default {
    data() {
        return {
            checkInDate: '',
            checkOutDate: '',
            campsiteVacancy: [],
            // 우선 학원을 시작점으로 설정해둠
            currentLatitude: 37.498993,
            currentLongitude: 127.032909,
        }
    },
    methods: {
        ...mapActions(productModule, ['requestStockByMapToSpring']),
        async checkVacancies(checkInDate, checkOutDate) {
            this.checkInDate = checkInDate;
            this.checkOutDate = checkOutDate;
            this.campsiteVacancy = 
                await this.requestStockByMapToSpring({ checkInDate: this.checkInDate, checkOutDate: this.checkOutDate })
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
                center: new kakao.maps.LatLng(this.currentLatitude, this.currentLongitude),
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
                                <span class="title">${vacancy} vacancy</span>
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
    async mounted () {
        const checkInDate = new Date();
        const formattedCheckInDate = this.formatDate(checkInDate);

        const checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + 1);
        const formattedCheckOutDate = this.formatDate(checkOutDate);

        this.checkInDate = formattedCheckInDate;
        this.checkOutDate = formattedCheckOutDate;
        await this.checkVacancies(this.checkInDate, this.checkOutDate);
    },
    // 인스턴스에서 사용하려면 설정이 필요하므로 일단 보류
    // async created() {
    //     await navigator.geolocation.getCurrentPosition((position) => {
    //         console.log("Latitude: " + position.coords.latitude)
    //         console.log("Longitude: " + position.coords.longitude)
    //         this.currentLatitude = position.coords.latitude
    //         this.currentLongitude = position.coords.longitude
    //         console.log("this.currentLatitude: " + this.currentLatitude)
    //         console.log("this.currentLongitude: " + this.currentLongitude)
    //     }, (error) => {
    //         console.error(error)
    //     })
    // }
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
#selectDate {
    margin: auto;
    font-family: 'SUIT-Regular';
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: center;
}
#selectDate input {
    outline-style: none;
    padding-left: 12px;
}
#date {
    margin: auto;
    color: black;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
#middleLine {
    margin: auto;
    padding-left: 100px;
    padding-right: 100px;
}
.checkDate {
    background-color: rgb(247, 247, 247);
    border-radius: 33px;
    height: 60px;
    width: 100%;
    align-items: center;
    text-align: center;
    display: flex;
}
#checkStockBtn {
    background-color: #73916A;
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 16px;
    color: white;
    margin-left: 100px;
}
</style>