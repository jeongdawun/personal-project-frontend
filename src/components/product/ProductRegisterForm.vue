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
                            <input id="file-selector" ref="file" type="file" @change="handleFileUpload()">
                        </v-col>
                        <v-col cols="2" id="menu">
                            <p>상세 이미지</p>
                        </v-col>
                        <v-col cols="10">
                            <input id="file-selector" ref="file" type="file" multiple @change="handleFileUpload()">
                        </v-col>
                    </v-row>
                </div>

                
                <Strong>옵션 정보</Strong>
                <div class="infomenu">
                    <v-btn @click="addRow">행 추가</v-btn>
                    <v-btn @click="deleteRow(index)">행 삭제</v-btn>
                    <v-row justify="center">
                        <v-col v-for="(option, index) in options" :key="index" cols="12" id="menu">
                            <p>옵션{{ index + 1 }}</p>
                            <v-text-field v-model="option.optionName" label="옵션명을 입력하세요."></v-text-field>
                            <v-text-field v-model="option.optionPriceList" label="옵션 가격을 입력하세요."></v-text-field>
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
import { mapActions } from 'vuex'

const memberModule = 'memberModule'

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
            email: '',
            address:'',
            city: '',
            street: '',
            addressDetail: '',
            zipcode: '',
            name: '',
            price: '',

            categoryName: ['오토캠핑', '글램핑', '카라반'],
            category: '',
            options: [{ name: '', price: '' }],
            file: null,
            awsBucketName: 'vue-s3-test-3737',
            awsBucketRegion: 'ap-northeast-2',
            awsIdentityPoolId: 'ap-northeast-2:88f54e9d-6025-4bd4-8285-058401d99eb5',
            s3: null,
            awsFileList: [],
            startAfterAwsS3Bucket: null,
            awsS3NextToken: null,
            imageUrl: '',
            productName: '',
            productDetails: ''
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestAuthorizeForSellerInfoToSpring']),
        handleFileUpload () {
            this.file = this.$refs.file.files[0]
            // console.log("file: " + this.file.name)
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
                    return alert("업로드 중 문제 발생", err.message)
                }
                alert("업로드 성공!")
                // this.getAwsS3Files()
            })
        },
        async onSubmit () {
            this.uploadAwsS3 ()
            const { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber } = this
            console.log("궁금해: " + email + " " + city + " " + street + " " + addressDetail + " " + zipcode + " " + contactNumber + " " + bank + " " + accountNumber)
            // this.$emit('submit', { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber })
        },
        postOpen() {
            const vm = this;
            new daum.Postcode({
            oncomplete: function(data) {
                vm.address = data.address;
                vm.city = data.sido + data.sigungu;
                vm.street = data.roadname;
                vm.addressDetail = data.buildingName;
                vm.zipcode = data.zonecode;
                document.getElementById("address").value = data.address;
            }
            }).open();
        },
        addRow() {
                this.options.push({
                name: '',
                price: ''
            });
        },
        deleteRow(index) {
            this.options.splice(index, 1);
        }
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