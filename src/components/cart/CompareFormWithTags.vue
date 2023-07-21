<template lang="">
    <v-container class="container">
      <v-row no-gutters>
    </v-row>
    <v-row no-gutters class="productMainInfo">
        <v-col cols="8" id="category">
            <span>{{ product.category }}</span>
        </v-col>
        <v-col cols="6" id="productName">
            <span>{{ product.productName }}</span>
        </v-col>
    </v-row>
    <v-row no-gutters class="productDetailsInfo">
        <v-col cols="10">
            <span><Strong>위치 : </Strong>{{ product.address }}</span><br>
            <span><Strong>선택 기간 : </Strong>{{ product.checkInDate }} ~ </span>
            <span>{{ product.checkOutDate }}</span>
        </v-col>
        <v-col cols="10">
            <span><Strong>선택 옵션 : </Strong>{{ product.optionName }}</span><br>
            <span><Strong>총 금액 : </Strong>{{ product.payment }}</span>
        </v-col>
    </v-row>
    <v-row no-gutters class="inputHashtag">
        <v-col cols="10">
            <span>나만의 <Strong>해시태그</Strong> 추가하기</span><br>
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
    padding-left: 12px;
}
#productName span{
    font-weight: 600;
    font-size: 40px;
    padding-left: 10px;
}
#datails {
    margin: auto;
    color: black;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.container {
    width: 60%;
    margin-top: 20px;
}
.v-application .pa-2 {
    padding: 0px !important
}
.productDetailsInfo {
    margin-top: 60px;
    padding-left: 20px;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    margin-bottom: 120px;
}
.inputHashtag {
    margin-top: 80px;
    padding-left: 20px;
    font-family: 'SUIT-Regular';
    font-size: 16px;
    margin-bottom: 120px;
}
#hashtag {
    width: auto;
    outline-style: none;
}
#mytag {
    background-color: rgb(248, 248, 248);
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