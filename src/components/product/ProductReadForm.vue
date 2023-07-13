<template lang="">
    <v-container class="container">
      <v-row no-gutters>
      <v-col cols="6">
        <v-card
        >
        <v-img :src="product.productImageNameList ? getImage(product.productImageNameList[0]) : ''"></v-img>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
        >
        <v-img :src="product.productImageNameList ? getImage(product.productImageNameList[1]) : ''"></v-img>
        <v-img :src="product.productImageNameList ? getImage(product.productImageNameList[2]) : ''"></v-img>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
        >
        <v-img :src="product.productImageNameList ? getImage(product.productImageNameList[3]) : ''"></v-img>
        <v-img :src="product.productImageNameList ? getImage(product.productImageNameList[4]) : ''"></v-img>
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
        </v-col>
        <v-col cols="2" id="checkStock">
            <v-btn @click="chkStock" id="checkStockBtn">빈자리 조회하기</v-btn>
        </v-col>
    </v-row>
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="10">
            <p id="date">숙소 상세 정보</p>
            <span>{{ product.productDetails }}</span>
        </v-col>
    </v-row>
    <v-row no-gutters class="options">
        <v-col cols="6">
            <Strong><span>{{ product.productOptionList[0].optionName }}</span></Strong>
        </v-col>
        <v-col cols="6">
            <v-col class="stock">
                <Strong>빈자리 {{ campsiteVacancy1 }}개</Strong>
            </v-col>
            <v-col class="price">
                </Strong><span>{{ product.productOptionList[0].optionPrice }}</span>원
            </v-col>
        </v-col>
    </v-row>
    <v-row no-gutters class="options">
        <v-col cols="6">
            <Strong><span>{{ product.productOptionList[1].optionName }}</span></Strong>
        </v-col>
        <v-col cols="6">
            <v-col class="stock">
                <Strong>빈자리 {{ campsiteVacancy2 }}개</Strong>
            </v-col>
            <v-col class="price">
                <span>{{ product.productOptionList[1].optionPrice }}</span>원
            </v-col>
        </v-col>
    </v-row>
    <v-row no-gutters class="sellerInfo">
        <v-col cols="12">
            <Strong>판매자 정보 들어갈 자리</Strong>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const productModule = 'productModule'

export default {
    name: "ProductReadForm",
        props: {
            product: {
                type: Object,
                required: true,
        },
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
            this.campsiteVacancy = await this.requestStockToSpring({ id, checkInDate, checkOutDate })
            this.campsiteVacancy1 = this.campsiteVacancy.campsiteVacancyList[0]
            this.campsiteVacancy2 = this.campsiteVacancy.campsiteVacancyList[1]
        }
    },
    async mounted(){
        await this.getImage()
    },
    data () {
        return {
            campsiteVacancy: [],
            checkInDate: 0,
            checkOutDate: 0,
            id: 0,
            campsiteVacancy1: 0,
            campsiteVacancy2: 0,
        }
    }
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
.container {
    width: 80%;
    margin-top: 100px
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
textarea {
    outline-style: none;
    padding-top: 20px;
}
.options {
    background-color: rgb(247, 247, 247);
    padding-left: 60px;
    padding-right: 60px;
    border-radius:33px;
    height: 80px;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    align-items: center;
    font-family: 'SUIT-Regular';
    font-size: 20px;
    width: 60%; 
}
.stock Strong {
    color: red;
}
#checkStockBtn {
    background-color: #73916A;
    font-family: 'SUIT-Regular';
    font-weight: 200;
    color: white;
    margin-right: 30px;
}
.stock {
    display: inline-block;
    font-size: 14px;
    padding: 0px;
    padding-right: 20%;
    text-align: right;
}
.price {
    display: inline-block;
    font-weight: 600;
    padding-top: 0px;
    padding-right: 20%;
    text-align: right;
}
.sellerInfo {
    margin: auto;
    margin-bottom: 200px;
    text-align: center;
    font-size: 80px;
    background-color: red;
    width: 100%;
}
</style>