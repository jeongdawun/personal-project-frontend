<template lang="">
    <v-container class="productContainer">
    <v-row no-gutters class="productMainInfo">
        <v-col cols="8" id="category">
            <span>{{ product.category }}</span>
        </v-col>
        <v-col cols="6" id="productName">
            <span>{{ product.productName }}</span>
        </v-col>
    </v-row>
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="7">
            <span><Strong><span class="mdi mdi-map-marker-outline"></span> 위치 : </Strong>{{ product.address }}</span><br>
            <span><Strong><span class="mdi mdi-calendar-check"></span> 선택 기간 : </Strong>{{ product.checkInDate }} ~ </span>
            <span>{{ product.checkOutDate }}</span><br>
            <span><Strong><span class="mdi mdi-check"></span> 선택 옵션 : </Strong>{{ product.optionName }}</span><br>
            <span><Strong><span class="mdi mdi-credit-card-multiple"></span> 상품 금액 : </Strong>{{ product.payment }}원</span>
        </v-col>
        <v-col cols="5">
            <v-img :src="require('@/assets/happycamper/banner/automain.jpg')" aspect-ratio="1"></v-img>
        </v-col>
    </v-row>
    <v-row no-gutters class="inputHashtag">
        <v-col cols="10">
            <span class="hashtagMenu">나만의 <Strong>해시태그</Strong> 추가하기</span><br>
            <span><Strong># </Strong>
                <input type="text" id="hashtag" v-model="newHashtag" @keyup.enter="addHashtag" placeholder="원하는 해시태그를 입력하세요">
            </span><br>
            <span v-for="(tag, index) in hashtag" :key="index" id="mytag">
                <Strong id="tagStyle"># </Strong>{{ tag }}
            </span>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>

export default {
    name: "CompareFormWithTags",
        props: {
            product: {
                type: Object,
                required: true,
        },
    },
    data () {
        return {
            newHashtag: "",
            hashtag: [],
        }
    },
    methods: {
        addHashtag() {
            if (this.newHashtag) {
                this.hashtag.push(this.newHashtag);
                this.newHashtag = "";
            }
        },
    }
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.productMainInfo {
    padding-top: 30px;
    font-family: 'SUIT-Regular';
}
#category span {
    margin-left: 12px;
    padding: 3px 12px 3px 12px;
    background-color: #73916A;
    color: white;
    border-radius: 33px;
    font-size: 13px;
}
#productName span{
    font-weight: 600;
    font-size: 32px;
    padding-left: 10px;
}
#datails {
    margin: auto;
    color: black;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.productContainer {
    width: 100%;
    margin: 0px;
    align-items: center;
    margin: auto;
    background-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 0.15rem;
    border-color: rgb(240, 240, 240);
    border-radius: 22px;
}
.v-application .pa-2 {
    padding: 0px !important
}
.productDetailsInfo {
    margin-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
    font-family: 'SUIT-Regular';
    font-size: 16px;
    margin-bottom: 40px;
}
.inputHashtag {
    margin-left: 12px;
    margin-right: 12px;
    font-family: 'SUIT-Regular';
    font-size: 16px;
    margin-bottom: 20px;
    height: 180px;
    border-radius: 22px;
    padding: 2% 2% 1% 2%;
    background-color: rgb(248, 248, 248);
}
#hashtag {
    width: auto;
    outline-style: none;
}
#mytag {
    background-color: rgb(255, 255, 255);
    border-radius: 33px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 10px;
    margin-right: 10px;
}
#tagStyle {
    color: rgb(255, 60, 0);
}
</style>