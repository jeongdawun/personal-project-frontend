<template lang="">
    <v-container class="container">
        <v-expansion-panels
            v-model="panel"
            multiple
            focusable>
        <v-expansion-panel>
        <v-expansion-panel-header>상품 카테고리</v-expansion-panel-header>
        <v-expansion-panel-content>
            <input type="text" :value="product.category" readonly/>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header>상품명</v-expansion-panel-header>
        <v-expansion-panel-content>
            <input type="text" :value="product.productName" readonly/>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header>메인 이미지</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-img :src="product.productMainImage ? getImage(product.productMainImage) : ''"></v-img>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header>상세 이미지</v-expansion-panel-header>
        <v-expansion-panel-content v-for="(image, index) in product.productImageNameList" :key="index">
            <v-img :src="product.productImageNameList ? getImage(image) : ''"></v-img>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header>상세내용</v-expansion-panel-header>
        <v-expansion-panel-content>
            <span>{{ product.productDetails }}</span>
        </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
        <v-expansion-panel-header>옵션</v-expansion-panel-header>
        <v-expansion-panel-content v-for="(productOption, index) in product.productOptionResponseFormList" :key="index">
            <span>{{ productOption.optionName }}</span>
            <span>{{ productOption.optionPrice }}</span>
        </v-expansion-panel-content>
        </v-expansion-panel>

    <v-expansion-panel>
        <v-expansion-panel-header>재고</v-expansion-panel-header>
        <v-expansion-panel-content v-for="(option, index) in product.productOptionWithVacancyResponseFormList" :key="index">
            <span>{{ option.id }}</span>
            <span>{{ option.dateList }}</span>
            <span>{{ option.campsiteVacancyList }}</span>
        </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
    <v-btn @click="deleteProduct">삭제하기</v-btn>
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
    async mounted(){
        await this.getImage()
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.container {
    width: 80%;
    margin-top: 100px;
}
</style>