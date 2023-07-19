<template lang="">
    <v-container class="container">
        <v-expansion-panels
            v-model="panel"
            :disabled="disabled"
            multiple
            focusable
            >
        <v-expansion-panel>
        <v-expansion-panel-header><span class="headerMenu">상품 정보</span></v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-text-field :value="product.category" label="카테고리" disabled></v-text-field>
            <v-text-field :value="product.productName" label="상품명" disabled></v-text-field>
            <v-textarea :value="product.productDetails" label="상세내용"></v-textarea>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header><span class="headerMenu">상품 이미지</span></v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row>
                <v-col>
                    메인 이미지<v-img width="400" height="auto" :src="product.productMainImage ? getImage(product.productMainImage) : ''"></v-img>
                </v-col>
                <v-col v-for="(image, index) in product.productImageNameList" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
                    상세 이미지 {{index + 1}}<v-img width="auto" height="200" :src="product.productImageNameList ? getImage(image) : ''"></v-img>
                </v-col>
            </v-row>
            <v-file-input multiple truncate-length="15"></v-file-input>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header><span class="headerMenu">옵션 정보</span></v-expansion-panel-header>
        <v-expansion-panel-content v-for="(productOption, index) in product.productOptionResponseFormList" :key="index">
            <v-text-field v-model="productOption.optionName" label="옵션명"></v-text-field>
            <v-text-field v-model="productOption.optionPrice" label="옵션 가격"></v-text-field>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header><span class="headerMenu">재고</span></v-expansion-panel-header>
            <v-expansion-panel-content v-for="(option, index) in product.productOptionWithVacancyResponseFormList" :key="index">
                <v-row>
                    <v-col cols="2">
                        <v-text-field v-model="option.id" label="옵션번호" readonly></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field v-model="option.dateList" label="날짜"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field v-model="option.campsiteVacancyList" label="빈자리"></v-text-field>
                    </v-col>
                </v-row>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

    <a @click="deleteProduct">
        <span class="delete">상품 삭제하기 ></span>
    </a>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const productModule = 'productModule'

export default {
    name: "MyProductListForm",
        props: {
            product: {
                type: Object,
                required: true,
        },
    },
    data () {
        return {
            id: 0,
            panel: [0],
            disabled: false,
        }
    },
    methods: {
        ...mapActions(productModule, ['requestDeleteProductToSpring']),
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
        async deleteProduct() {
            console.log("삭제할 상품 id: " + this.product.id)
            await this.requestDeleteProductToSpring(this.product.id)
        }
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.container {
    width: 60%;
    margin-top: 100px;
}
.v-expansion-panel-header {
    color: rgb(76, 129, 32);
    height: 20px;
    border-radius: 0;
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
.v-expansion-panel-content {
    font-family: 'SUIT-Regular';
    font-weight: 100;
    padding-top: 14px
}
.delete {
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 14px;
    text-decoration: none;
    color: #535353;
    display: inline-block;
    white-space: nowrap;
    padding: 20px;
}
.headerMenu {
    color: rgb(87, 87, 87);
}
</style>