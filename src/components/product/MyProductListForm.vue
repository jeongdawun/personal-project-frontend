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
            <v-expansion-panel-header><span class="headerMenu">상품 이미지</span></v-expansion-panel-header>
            <v-expansion-panel-content>
                <p><Strong>메인 이미지</Strong></p>
                <p class="guideImage">* 메인 이미지는 변경이 불가합니다.</p>
                <v-row>
                    <v-col cols="12">
                        <v-img  width="300" height="auto" :src="product.productMainImage ? getImage(product.productMainImage) : ''"></v-img>
                    </v-col>
                </v-row>
                <p><Strong>상세이미지</Strong></p>
                <p class="guideImage">* 상세 이미지는 5개를 필수로 등록해야 합니다.</p>
                <p class="guideImage">* 원하는 이미지를 삭제 후 새로 등록할 수 있습니다.</p>
                <v-row>
                    <v-col v-for="(image, index) in product.productImageNameList" :key="index" cols="4">
                        <v-row>
                            <v-col cols="8">
                                <v-img width="300" height="auto" :src="product.productImageNameList ? getImage(image) : ''"></v-img>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <v-btn @click="deleteAwsS3File(image)" color="primary" text icon>x</v-btn>
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

    <a @click="deleteProduct">
        <span class="delete">상품 삭제하기 ></span>
    </a>
    <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onModify">수정하기</v-btn>
    </v-container>
</template>

<script>
import AWS from 'aws-sdk'
import env from '../../env'
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
            productDetails: '',
            dateList: '',
            campsiteVacancyList: '',
            imageNameList: [],
            optionNameList: [],
            optionPriceList: [],
            optionModifyRequestForm: [],
            optionModifyRequestFormList: [],

            s3: null,
            awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
            awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
            awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,

            file: null,
            fileNames: [],
            detailsFiles: [],
            plainArray: []
        }
    },
    methods: {
        ...mapActions(productModule, ['requestDeleteProductToSpring', 'requestModifyProductToSpring']),
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
        async deleteProduct() {
            await this.requestDeleteProductToSpring(this.product.id)
        },
        awsS3Config () {
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            })

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            })
        },
        deleteAwsS3File(key) {
            this.awsS3Config()
            
            this.s3.deleteObject(
            {
                Key: key,
            },
            (err, data) => {
                if (err) {
                    return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다: ' + err.message)
                }
                alert('AWS 버킷 데이터 삭제가 성공적으로 완료되었습니다');
            });

            const indexToRemove = this.product.productImageNameList.indexOf(key);
            if (indexToRemove !== -1) {
                this.product.productImageNameList.splice(indexToRemove, 1);
            }

            this.imageNameList = this.product.productImageNameList;
        },
        uploadAwsS3 () {    
            this.awsS3Config()
            
            this.detailsFiles.forEach((file) => {
                this.s3.upload({
                    Key: file.name,
                    Body: file,
                    ACL: 'public-read',
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                        return alert("상세 이미지 업로드 중 문제 발생", err.message)
                    }
                    console.log(`파일 ${file.name} 업로드 성공!`)
                });
            });
        },
        handleFileUpload() {
            this.fileNames = this.detailsFiles.map(file => file.name);
            console.log(this.fileNames);
        },
        async onModify () {
            this.uploadAwsS3 ()

            this.imageNameList = this.fileNames.concat(this.product.productImageNameList);
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
}
.v-expansion-panel-header {
    color: rgb(212, 212, 214);
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
Strong {
    font-weight: 600;
}
.guideImage {
    font-size: 14px;
}
.submitBtn {
    width: 100%;
    min-height: 40px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-top: 10px;
    margin-left: 6px;
    margin-right: 6px;
    border-radius: 33px;
}
</style>