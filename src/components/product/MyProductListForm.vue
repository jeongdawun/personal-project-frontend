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
            <v-row>
                <v-col cols="12">
                    메인 이미지<v-img width="auto" height="auto" :src="product.productMainImage ? getImage(product.productMainImage) : ''"></v-img>
                </v-col>
                <v-col v-for="(image, index) in product.productImageNameList" :key="index" cols="12">
                    상세 이미지 {{index + 1}}<v-img width="auto" height="600" :src="product.productImageNameList ? getImage(image) : ''"></v-img>
                    <v-btn @click="deleteAwsS3File(image)" color="primary" text icon>x</v-btn>
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
    <v-btn @click="onModify">수정하기</v-btn>
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
            dateList: [],
            campsiteVacancyList: [],
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
            console.log("삭제할 상품 id: " + this.product.id)
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
                return alert(
                    'AWS 버킷 데이터 삭제에 문제가 발생했습니다: ' + err.message
                );
                }
                alert('AWS 버킷 데이터 삭제가 성공적으로 완료되었습니다');
            });

            const indexToRemove = this.product.productImageNameList.indexOf(key);
            if (indexToRemove !== -1) {
                this.product.productImageNameList.splice(indexToRemove, 1);
            }

            this.imageNameList = this.product.productImageNameList;
            console.log("궁금해 값: " + this.imageNameList)
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
            console.log("연결됬나?", this.imageNameList)
            if(this.imageNameList.length != 5) {
                alert("상세 이미지는 5개를 필수로 등록해야 합니다.")
                return
            }
            this.id = this.product.id
            this.productDetails = this.product.productDetails;
            this.optionNameList = this.product.productOptionResponseFormList.map((option) => option.optionName);
            this.optionPriceList = this.product.productOptionResponseFormList.map((option) => option.optionPrice);
            this.optionModifyRequestFormList = this.transformData(this.product.productOptionWithVacancyResponseFormList)
            console.log("궁금: " + JSON.stringify(this.imageNameList))
            console.log("궁금: " + typeof(this.imageNameList))
            const {id, productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList } = this
            await this.requestModifyProductToSpring({ id, productDetails, imageNameList, optionNameList, optionPriceList, optionModifyRequestFormList })
        },
        transformData(data) {
            const groupedData = data.reduce((acc, cur) => {
            const { id, dateList, campsiteVacancyList } = cur;
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push({ id, dateList, campsiteVacancyList });
            return acc;
            }, {});

            const result = Object.values(groupedData);

            console.log(result);
            return result;
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