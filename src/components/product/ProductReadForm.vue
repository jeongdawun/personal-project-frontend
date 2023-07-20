<template lang="">
    <v-container class="container">
      <v-row no-gutters>
      <v-col cols="6">
        <v-card
        >
        <v-img width="auto" height="500" :src="product.productImageNameList ? getImage(product.productImageNameList[0]) : ''"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
        >
        <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[1]) : ''"></v-img>
        <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[2]) : ''"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
        >
        <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[3]) : ''"></v-img>
        <v-img width="auto" height="250" :src="product.productImageNameList ? getImage(product.productImageNameList[4]) : ''"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="productDetails">
        <v-col cols="8" id="category">
            <input type="text" :value="product.category" readonly/>
        </v-col>
        <v-col cols="6" id="productName">
            <input type="text" :value="product.productName" readonly/>
        </v-col>
    </v-row>
    <v-row no-gutters class="checkDate">
        <v-col cols="8" id="selectDate">
            <p id="date">CHECK IN</p>
            <input type="date" v-model="checkInDate">
            <p id="middleLine"> | </p>
            <p id="date">CHECK OUT</p>
            <input type="date" v-model="checkOutDate">
            <v-btn @click="chkStock()" id="checkStockBtn">빈자리 조회하기</v-btn>
        </v-col>
    </v-row>
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="10">
            <p id="date">숙소 상세 정보</p>
            <span>{{ product.productDetails }}</span>
        </v-col>
    </v-row>
    <v-col v-for="(option, index) in product.productOptionResponseFormList" :key="index" cols="12">
        <v-row no-gutters class="options">
            <v-col cols="6">
                <strong><span>{{ option.optionName }}</span></strong>
                </v-col>
            <v-col cols="3" class="price">
                <span>{{ option.optionPrice }}</span>원
            </v-col>
            <v-col class="reservation-button" cols="3">
                <p class="vacancy-text">빈자리 {{ campsiteVacancy[index] }}</p>
                <v-btn text @click="reservation(index)" class="reservationBtn"><span class="mdi mdi-chevron-double-right">예약하기</span></v-btn>
            </v-col>
        </v-row>
    </v-col>
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

export default {
    name: "ProductReadForm",
        props: {
            product: {
                type: Object,
                required: true,
        },
    },
    data () {
        return {
            campsiteVacancy: [],
            checkInDate: 0,
            checkOutDate: 0,
            id: 0,
            optionid: 0,
            productName: '',
            optionName: '',
        }
    },
    methods: {
        ...mapActions(productModule, ['requestStockToSpring']),
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
        async chkStock() {
            this.id = this.product.id
            const { id, checkInDate, checkOutDate } = this
            const response = await this.requestStockToSpring({ id, checkInDate, checkOutDate })
            this.campsiteVacancy = response.campsiteVacancyList
        },
        async reservation(index) {
            const order = {
                id: this.product.id,
                productName: this.product.productName,
                optionid: this.product.productOptionResponseFormList[index].id,
                optionName: this.product.productOptionResponseFormList[index].optionName,
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                };
            console.log("오더 잘들어가니: " + JSON.stringify(order))
            router.push({
                name: 'CreateReservationPage',
            });
            localStorage.setItem("order", JSON.stringify(order))
        }
    },
    async mounted(){
        await this.getImage()
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
h2 {
    font-size: 300px;
}
.productImg {
    width: 900px
}
.productDetails {
    padding-top: 30px;
    font-family: 'SUIT-Regular';
    text-decoration: none;
}
#selectDate {
    font-family: 'SUIT-Regular';
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: center;
    margin: auto;
}
#selectDate input {
    outline-style: none;
    padding-left: 12px;
}
#category input {
    outline-style: none;
    padding-left: 12px;
}
#productName {
    font-weight: 600;
    font-size: 40px;
    padding-left: 10px;
}
#date {
    margin: auto;
    color: black;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
#middleLine {
    margin: auto;
}
.checkDate {
    background-color: rgb(247, 247, 247);
    border-radius:33px;
    height: 60px;
    width: 99%;
    align-items: center;
    text-align: center;
    display: flex;
    margin: auto;
    margin-top: 20px;
}
.container {
    width: 80%;
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
.options {
    background-color: rgb(247, 247, 247);
    /* padding-left: 60px;
    padding-right: 60px; */
    border-radius:33px;
    height: 80px;
    margin: auto;
    /* margin-top: 10px; */
    /* margin-bottom: 10px; */
    text-align: center;
    align-items: center;
    font-family: 'SUIT-Regular';
    font-size: 20px;
    width: 60%; 
}
#checkStockBtn {
    background-color: #73916A;
    font-family: 'SUIT-Regular';
    font-weight: 200;
    color: white;
    margin-right: 30px;
}
/* .stock {
    display: inline-block;
    font-size: 14px;
    padding: 0px;
    padding-right: 20%;
    text-align: right;
} */
/* .price {
    display: inline-block;
    text-align: center;
} */
.sellerInfo {
    margin: auto;
    margin-top: 60px;
    margin-bottom: 200px;
    text-align: center;
    /* font-size: 80px; */
    background-color: rgb(247, 247, 247);
    border-radius:33px;
    width: 80%;
}
.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 600;
}

.vacancy-text {
    font-size: 16px;
    color: rgb(255, 0, 0);
    font-family: 'SUIT-Regular';
    font-weight: 600;
    margin: auto;
}
.reservationBtn {
    font-size: 16px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
</style>