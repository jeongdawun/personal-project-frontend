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
                <v-textarea v-model="product.productDetails" label="상세내용"></v-textarea>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header><span class="headerMenu">시설 정보</span></v-expansion-panel-header>
            <v-expansion-panel-content>
                <div class="chipContainer">
                <v-chip v-for="(facility, index) in product.facilities" :key="index" class="horizontalChip">
                    <span>{{ facility }}</span>
                </v-chip>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
            <v-expansion-panel-header><span class="headerMenu">상품 이미지</span></v-expansion-panel-header>
            <v-expansion-panel-content>
                <p class="imgMenu"><Strong>메인 이미지</Strong></p>
                <p class="guideImage">* 메인 이미지는 변경이 불가합니다.</p>
                <v-row>
                    <v-col cols="12">
                        <v-img  width="300" height="auto" :src="product.productMainImage ? getImage(product.productMainImage) : ''"></v-img>
                    </v-col>
                </v-row>
                <p class="imgMenu"><Strong>상세이미지</Strong></p>
                <p class="guideImage">* 상세 이미지는 5개를 필수로 등록해야 합니다.</p>
                <p class="guideImage">* 원하는 이미지를 삭제 후 새로 등록할 수 있습니다.</p>
                <v-row>
                    <v-col v-for="(image, index) in product.productImageNameList" :key="index" cols="4" class="detailImg">
                        <v-row>
                            <v-col cols="10">
                                <v-img width="300" height="auto" :src="product.productImageNameList ? getImage(image) : ''"></v-img>
                            </v-col>
                            <v-col cols="2" class="text-right">
                                <v-btn @click="deleteS3File(image)" color="primary" text icon>x</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-file-input
                        chips
                        v-model="detailsFiles"
                        label="상세 이미지 업로드"
                        accept="image/*"
                        multiple
                        @change="handleFileUpload"
                        ></v-file-input>
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

        <v-row justify="start" class="deleteMenu">
            <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="deleteBtn"
                color="#535353"
                plain
                dark
                v-bind="attrs"
                v-on="on"
                >
                상품 삭제하기 >
                </v-btn>
            </template>
            <v-card>
                <v-card-text><span class="deleteGuide">정말 삭제하시겠습니까 ?</span></v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" plain @click="deleteProduct" class="deleteMenuBtn">
                    삭제
                </v-btn>
                <v-btn color="black" plain @click="closeDialog" class="deleteMenuBtn">
                    취소
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
        <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onModify">수정하기</v-btn>
    </v-container>
</template>

<script>
import { deleteAwsS3File, uploadDetailImgAwsS3 } from '../../utility/awsS3';
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
            delete: false,
            dialog: false,
            imageUrls: {},
            id: 0,
            panel: [0],
            disabled: false,
            productDetails: '',
            dateList: '',
            campsiteVacancyList: '',
            imageNameList: [],
            optionNameList: [],
            optionPriceList: [],
            optionModifyRequestForm: [],
            optionModifyRequestFormList: [],
            facility: [],

            file: null,
            fileNames: [],
            detailsFiles: [],
            plainArray: []
        }
    },
    methods: {
        ...mapActions(productModule, ['requestDeleteProductToSpring', 'requestModifyProductToSpring']),
        getImage(imageName) {
            if (this.imageUrls[imageName]) {
                return this.imageUrls[imageName]
            }

            const imageUrl = `https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`
            this.imageUrls[imageName] = imageUrl

            return imageUrl
        },
        openDialog() {
            this.dialog = true
        },
        closeDialog() {
            this.dialog = false
            this.delete = false
        },
        async deleteProduct() {
            this.delete = true
            
            if(this.delete) {
                await this.requestDeleteProductToSpring(this.product.id)
                this.dialog = false;
            }
        },
        deleteS3File(key) {
            deleteAwsS3File(key)
            
            const indexToRemove = this.product.productImageNameList.indexOf(key);
            if (indexToRemove !== -1) {
                this.product.productImageNameList.splice(indexToRemove, 1);
            }

            this.imageNameList = this.product.productImageNameList;
        },
        handleFileUpload() {
            this.fileNames = this.detailsFiles.map(file => file.name);
            console.log(this.fileNames);
        },
        uploadImg() {
            uploadDetailImgAwsS3(this.detailsFiles)
        },
        async onModify () {
            await this.uploadImg ()

            this.imageNameList = await this.fileNames.concat(this.product.productImageNameList);
            if(this.imageNameList.length != 5) {
                alert("상세 이미지는 5개를 필수로 등록해야 합니다.")
                return
            }
            this.id = this.product.id
            this.productDetails = this.product.productDetails;
            this.optionNameList = this.product.productOptionResponseFormList.map((option) => option.optionName);
            this.optionPriceList = this.product.productOptionResponseFormList.map((option) => option.optionPrice);
            this.optionModifyRequestFormList = this.product.productOptionWithVacancyResponseFormList
            const {id, productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList } = this
            await this.requestModifyProductToSpring({ id, productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList })
        },
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.container {
    width: 60%;
    margin-top: 100px;
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
.v-expansion-panel-header {
    color: rgb(212, 212, 214);
    height: 20px;
    border-radius: 0;
}
.v-expansion-panel-content {
    padding-top: 14px
}
.deleteBtn {
    font-weight: 200;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 14px;
}
.detailImg {
    margin-top: 10px;
}
.v-dialog > .v-card > .v-card__text {
    padding-top: 20px !important;
    font-size: 15px;
}
.deleteMenuBtn {
    font-size: 15px;
    font-weight: 600;
}
.headerMenu {
    color: rgb(87, 87, 87);
}
Strong {
    font-weight: 600;
}
.imgMenu {
    margin-top: 20px;
}
.guideImage {
    font-size: 14px;
    margin-bottom: 6px;
}
.submitBtn {
    width: 100%;
    min-height: 40px;
    color: white;
    font-size: 14px;
    font-weight: 200;
    margin-top: 10px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
.chipContainer {
    display: flex;
    flex-wrap: wrap;
}
.horizontalChip {
    display: inline;
    margin-right: 5px;
}
</style>