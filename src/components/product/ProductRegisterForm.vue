<template lang="">
    <div>  
        <div class="mySellerInfoMenu">
            <h2>상품 등록</h2>
            <form>

                <Strong>기본정보</Strong>
                <div class="infomenu">
                    <v-row justify="center">
                        <v-col cols="2" id="menu">
                            <p>카테고리</p>
                        </v-col>
                        <v-col cols="10 ">
                            <v-select
                            :items="categoryName"
                            color="pink"
                            v-model="category"
                            ></v-select>
                        </v-col>
                        <v-col cols="2" id="menu">
                            <p>상품명</p>
                        </v-col>
                        <v-col cols="10">
                            <v-text-field v-model="productName" label="상품명을 입력하세요."></v-text-field>
                        </v-col>
                    </v-row>
                </div>

                <Strong>상세정보</Strong>
                <div class="infomenu">
                    <v-row justify="center">
                        <v-col cols="2" id="menu">
                            <p>상품내용</p>
                        </v-col>
                        <v-col cols="10">
                            <v-textarea
                            label="상품 내용을 입력하세요."
                            v-model="productDetails"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </div>

                <Strong>주소입력</Strong>
                <div class="infomenu">
                    <v-row justify="center">
                        <v-col cols="2" id="menu">
                            <p>주소<v-btn class="serchBtn" @click="postOpen">주소검색</v-btn></p>
                        </v-col>
                        <v-col cols="10">
                            <v-text-field v-model="address" id="address" label="주소를 검색하여 입력하세요." prepend-inner-icon="mdi-map-marker" readonly></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                
                <Strong>이미지 등록</Strong>
                <div class="infomenu">
                    <v-row justify="center">
                        <v-col cols="2" id="menu">
                            <p>메인 이미지</p>
                        </v-col>
                        <v-col cols="10">
                            <input id="file-selector" ref="mainfile" type="file" @change="handleMainFileUpload()">
                        </v-col>
                        <v-col cols="2" id="menu">
                            <p>상세 이미지</p>
                        </v-col>
                        <v-col cols="10">
                            <input id="file-selector" ref="detailsfile" type="file" multiple @change="handleFileUpload()">
                            ></v-file-input>
                        </v-col>
                    </v-row>
                </div>

                <Strong>옵션 정보</Strong>
                <div class="infomenu">
                    <v-btn @click="addRow">옵션 추가</v-btn>
                    <v-btn @click="deleteRow(index)">옵션 삭제</v-btn>
                    <v-row justify="center">
                        <v-col v-for="(option, index) in options" :key="index" cols="12" id="menu">
                            <p>옵션{{ index + 1 }}</p>
                            <v-text-field v-model="option.optionName" label="옵션명을 입력하세요." @change="handleOptionNameUpload(index)"></v-text-field>
                            <v-text-field v-model="option.optionPrice" label="옵션 가격을 입력하세요." @change="handleOptionPriceUpload(index)"></v-text-field>
                            <input type="date" v-model="option.startDate" @change="handleStartDateUpload(index)">Start Date<br>
                            <input type="date" v-model="option.endDate" @change="handleEndDateUpload(index)">End Date<br>
                            <input type="number" v-model="option.campsiteVacancy" @change="handleCampsiteVacancyUpload(index)">Campsite Vacancy
                        </v-col>
                    </v-row>
                </div>

                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">등록하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
        </div>
    </div>
</template>

<script>
import AWS from 'aws-sdk'
import env from '../../env'

export default {
    head() {
      return {
        script: [
          {type: 'text/javascript', src: "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"},
        ]
      }
    },
    data () {
        return {
            productName: '',
            categoryName: ['오토캠핑', '글램핑', '카라반'],
            category: '',
            productDetails: '',

            address:'',

            optionNameList: [],
            optionPriceList: [],
            startDate: '',
            endDate: '',
            campsiteVacancy: 0,
            optionsRegisterRequestFormList: [],
            options: [{ optionName: '', optionPrice: '', startDate: null, endDate: null, campsiteVacancy: 0 }],

            s3: null,
            awsBucketName: env.api.MAIN_AWS_BUCKET_NAME,
            awsBucketRegion: env.api.MAIN_AWS_BUCKET_REGION,
            awsIdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,

            file: null,
            fileList: [],
            fileNames: [],
            mainImageName: '',
            imageNameList:[],
        }
    },
    methods: {
        handleMainFileUpload() {
            this.file = this.$refs.mainfile.files[0]
            console.log("main Image upload: " + this.file.name)
        },
        handleFileUpload() {
            const selectedFiles = Array.from(this.$refs.detailsfile.files);

            selectedFiles.forEach(file => {
            this.fileList.push(file);
            });

            selectedFiles.forEach(file => {
            console.log("details Image: " + file.name);
            });

            this.fileNames = this.fileList.map(file => file.name);
            console.log(this.fileNames);
        },
        handleOptionNameUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 옵션명:`, this.options[optionIndex].optionName);
        },
        handleOptionPriceUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 옵션 가격:`, this.options[optionIndex].optionPrice);
        },
        handleStartDateUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 시작 날짜:`, this.options[optionIndex].startDate);
        },
        handleEndDateUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 끝 날짜:`, this.options[optionIndex].endDate);
        },
        handleCampsiteVacancyUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 빈 자리:`, this.options[optionIndex].campsiteVacancy);
        },
        addRow() {
            this.options.push({ optionName: '', optionPrice: '', startDate: null, endDate: null, campsiteVacancy: 0 });
        },
        deleteRow(index) {
            this.options.splice(index, 1);
        },
        clear () {
            router.push('/')
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
        uploadAwsS3 () {    
            this.awsS3Config()

            this.s3.upload({
                Key: this.file.name,
                Body: this.file,
                ACL: 'public-read',
            }, (err, data) => {
                if (err) {
                    console.log(err)
                    return alert("메인 이미지 업로드 중 문제 발생", err.message)
                }
                console.log('this.file.name 업로드 성공!')
            })
            
            this.imageNameList.forEach((fileName) => {
                this.s3.upload({
                    Key: fileName,
                    Body: this.file,
                    ACL: 'public-read',
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                        return alert("상세 이미지 업로드 중 문제 발생", err.message)
                    }
                    console.log(`파일 ${fileName} 업로드 성공!`)
                });
            });
        },
        async onSubmit () {
            this.optionsRegisterRequestFormList = this.options.map(option => {
                return {
                    startDate: option.startDate,
                    endDate: option.endDate,
                    campsiteVacancy: option.campsiteVacancy
                };
            });

            console.log('전달받은 재고 내역 데이터:', this.optionsRegisterRequestFormList);
            console.log('재고 데이터의 형태', JSON.stringify(this.optionsRegisterRequestFormList));

            this.optionNameList = this.options.map(option => option.optionName);
            console.log("option name list:" + this.optionNameList);

            this.optionPriceList = this.options.map(option => option.optionPrice);
            console.log("option price list:" + this.optionPriceList);

            this.mainImageName = this.file.name
            console.log("main image name:", this.mainImageName);
            
            this.imageNameList = this.fileNames
            console.log("details image name list: " + this.imageNameList)

            this.uploadAwsS3 ()
            const { productName, category, productDetails, address, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList } = this
            this.$emit('submit', { productName, category, productDetails, address, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList})
        },
        postOpen() {
            const vm = this;
            new daum.Postcode({
                oncomplete: function(data) {
                    vm.address = data.address;
                    document.getElementById("address").value = data.address;
                }
            }).open();
        },
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.mySellerInfoMenu {
    padding-top: 100px;
}
h2{
    text-align: center;
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 38px;
    padding-top: 20px;
    padding-bottom: 20px;
}
form {
    width: 60%;
    height: 400px;
    margin: auto;
    padding-top: 40px;
    padding-bottom: 40px;
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
.submitBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 40px;
    margin-bottom: 80px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
.clearBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 40px;
    margin-bottom: 80px;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
Strong {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.infomenu {
    padding-bottom: 80px;
}
#menu {
    margin: auto;
}
</style>