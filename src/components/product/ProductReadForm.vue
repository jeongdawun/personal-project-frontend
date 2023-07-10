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
            <input type="date">
            <p id="middleLine"> | </p>
            <p id="date">CHECK OUT</p>
            <input type="date">
        </v-col>
    </v-row>
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="8">
            <p id="date">숙소 상세 정보</p>
            <textarea cols="170" rows="10" :value="product.productDetails" readonly/>
        </v-col>
    </v-row>
    <v-row no-gutters class="options">
        <v-col cols="6">
            <input type="text" :value="product.productOptionList[0].optionName" readonly/>
        </v-col>
        <v-col cols="6">
            <input type="text" :value="product.productOptionList[0].optionPrice" readonly/>
        </v-col>
    </v-row>
    <v-row no-gutters class="options">
        <v-col cols="6">
            <input type="text" :value="product.productOptionList[1].optionName" readonly/>
        </v-col>
        <v-col cols="6">
            <input type="text" :value="product.productOptionList[1].optionPrice" readonly/>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ProductReadForm",
        props: {
            product: {
                type: Object,
                required: true,
        },
    },
    methods: {
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
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
    padding-right: 120px;
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
}
textarea {
    outline-style: none;
    padding-top: 20px;
}
.options {
    background-color: rgb(247, 247, 247);
    padding-left: 60px;
    border-radius:33px;
    height: 80px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    align-items: center;
    font-family: 'SUIT-Regular';
    font-size: 20px;
}
</style>