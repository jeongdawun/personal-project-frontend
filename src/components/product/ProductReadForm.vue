<template lang="">
    <v-container class="container">
    <!-- 이미지 출력 -->
    <v-row no-gutters>
        <v-col cols="6">
            <v-card>
                <v-img width="auto" height="500" :src="product.productImageNameList ? getImage(product.productImageNameList[0]) : ''"></v-img>
            </v-card>
        </v-col>
        <v-col cols="3">
            <v-card>
                <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[1]) : ''"></v-img>
                <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[2]) : ''"></v-img>
            </v-card>
        </v-col>
        <v-col cols="3">
            <v-card>
                <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[3]) : ''"></v-img>
                <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[4]) : ''"></v-img>
            </v-card>
        </v-col>
    </v-row>

    <!-- 기본 정보 -->
    <v-row no-gutters class="productDetails">
        <v-col cols="12" id="category">
            <span class="mdi mdi-terrain"></span>
            <span> {{ product.category }}</span>
        </v-col>
        <v-col cols="12" id="productName">
            <span>{{ product.productName }}</span>
        </v-col>
    </v-row>

    <!-- 빈자리 조회 -->
    <v-row no-gutters class="checkDate">
        <v-col cols="12" id="selectDate">
            <v-col cols="6">
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="190"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    ref="datePickerMenu"
                >
                <template v-slot:activator="{ on, attrs }">
                    <div class="selectPeriod" v-bind="attrs" v-on="on">
                        <span><Strong>날짜 선택</Strong></span>
                        <span class="date">체크인</span>{{ dates[0] }}<span class="mdi mdi-menu-right"></span></span>
                        <span class="date">체크아웃</span>{{ dates[1] }}
                    </div>
                </template>
                <v-date-picker
                    v-model="dates"
                    @input="menu2 = false"
                    range
                    multiple
                    no-title
                    color="green lighten-1"
                    :readonly="false"
                ></v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="auto">
                <v-btn text @click="chkStock()" id="checkStockBtn"><span>빈자리 조회하기</span></v-btn>
            </v-col>
        </v-col>
    </v-row>

    <!-- 상세 정보 -->
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="10">
            <p id="date">숙소 상세 정보</p>
            <span>{{ product.productDetails }}</span>
        </v-col>
    </v-row>

    <!-- 옵션 정보 -->
    <v-col v-for="(option, index) in product.productOptionResponseFormList" :key="index" cols="12">
        <v-row no-gutters class="optionInfo">
            <v-col cols="6" class="options">
                <strong><span>{{ option.optionName }}</span></strong>
            </v-col>
            <v-col cols="3" class="price">
                <p class="vacancy-text">빈자리 {{ campsiteVacancy[index] }}</p>
                <p>{{ option.optionPrice }}원/박</p>
            </v-col>
            <v-col class="reservation" cols="3">
                <v-btn text @click="reservation(index)" class="reservationBtn"><span class="mdi mdi-chevron-double-right"> 예약하기</span></v-btn><br>
                <v-btn text @click="addCart(index)" class="cartBtn"><span class="mdi mdi-heart-outline"> 장바구니</span></v-btn>
            </v-col>
        </v-row>
    </v-col>

    <!-- 사업자 정보 -->
    <v-row no-gutters class="sellerInfo">
        <v-col cols="12">
            <!-- <p>판매자 정보</p>
            <p>사업자 번호: </p>
            <p>사업장명: </p>
            <p>사업장 소재지: </p>
            <p>고객센터: </p> -->
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import router from "@/router";

const productModule = 'productModule'
const cartModule = 'cartModule'

export default {
    name: "ProductReadForm",
        props: {
            product: {
                type: Object,
                required: true,
        },
    },
    data () {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {
            menu: false,
            campsiteVacancy: [],
            checkInDate: 0,
            checkOutDate: 0,
            id: 0,
            optionid: 0,
            productName: '',
            optionName: '',
            dates: [today.toISOString().split("T")[0], tomorrow.toISOString().split("T")[0]],
        }
    },
    methods: {
        ...mapActions(productModule, ['requestStockToSpring']),
        ...mapActions(cartModule, ['addCartToSpring']),
        getImage(imageName) {
            //return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
        async chkStock() {
            this.id = this.product.id
            this.checkInDate = this.dates[0]
            this.checkOutDate = this.dates[1]

            const { id, checkInDate, checkOutDate } = this
            const response = await this.requestStockToSpring({ id, checkInDate, checkOutDate })
            this.campsiteVacancy = response.campsiteVacancyList
        },
        async reservation(index) {
            if(this.checkInDate == '' || this.checkOutDate == '') {
                return alert("날짜를 선택해주세요.")
            }
            const order = {
                id: this.product.id,
                productName: this.product.productName,
                optionid: this.product.productOptionResponseFormList[index].id,
                optionName: this.product.productOptionResponseFormList[index].optionName,
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                };
            router.push({
                name: 'CreateReservationPage',
            });
            localStorage.setItem("order", JSON.stringify(order))
        },
        async addCart(index) {
            if(this.checkInDate == '' || this.checkOutDate == '') {
                return alert("날짜를 선택해주세요.")
            }
            const cart = {
                productId: this.product.id,
                productOptionId: this.product.productOptionResponseFormList[index].id,
                checkInDate: this.dates[0],
                checkOutDate: this.dates[1],
                amount: 1
                };
            await this.addCartToSpring(cart)
        }
    },
    computed: {
        dateRangeText () {
            return this.dates.join(' ~ ')
        },
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.selectPeriod {
    padding: 1%;
    height: 40px;
    border-radius: 6px;
}
.selectPeriod Strong {
    padding-right: 20px;
}
.date {
    color: rgb(128, 128, 128);
    padding-left: 10px;
    padding-right: 20px;
}
.mdi-menu-right {
    padding-left: 40px;
    padding-right: 30px;
}
h2 {
    font-size: 300px;
}
.productDetails {
    padding-top: 30px;
    font-family: 'SUIT-Regular';
}
#selectDate {
    font-family: 'SUIT-Regular';
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: center;
    margin: auto;
    background-color: rgb(248, 248, 248);
}
#productName {
    font-weight: 600;
    font-size: 40px;
}
.checkDate {
    background-color: rgb(255, 255, 255);
    border-radius:33px;
    height: 60px;
    align-items: center;
    text-align: center;
    display: flex;
    margin: auto;
    margin-top: 20px;
}
.container {
    width: 60%;
    margin-top: 100px;
}
.v-application .pa-2 {
    padding: 0px !important
}
.productDetailsInfo {
    margin-top: 80px;
    padding-left: 60px;
    font-family: 'SUIT-Regular';
    font-size: 20px;
    margin-bottom: 120px;
}
.optionInfo {
    background-color:  rgb(248, 248, 248);
    height: 120px;
    margin: auto;
    text-align: center;
    align-items: center;
    font-family: 'SUIT-Regular';
    font-size: 20px;
}
.options {
    text-align: left;
    padding-left: 60px !important;
}
.price {
    font-weight: 600;
    text-align: right;
}
#checkStockBtn {
    background-color: #000000;
    font-family: 'SUIT-Regular';
    font-weight: 100;
    font-size: 14px;
    color: white;
    height: 40px;
    margin-left: 0;
}
/* .sellerInfo {
    margin: auto;
    margin-top: 60px;
    margin-bottom: 200px;
    text-align: center;
    background-color: rgb(247, 247, 247);
    border-radius:33px;
    width: 80%;
} */
.vacancy-text {
    font-size: 16px;
    color: rgb(0, 102, 255);
    font-family: 'SUIT-Regular';
    font-weight: 500;
    text-align: right;
    margin: auto;
}
.reservationBtn {
    background-color: #000000;
    color: white;
    font-size: 16px;
    font-family: 'SUIT-Regular';
    font-weight: 100;
    font-size: 14px;
    margin-bottom: 4px;
}
.cartBtn {
    background-color: #ff1e00;
    color: #ffffff;
}
</style>