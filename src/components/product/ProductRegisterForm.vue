<template lang="">
    <v-container class="registerContainer">
        <h2>REGISTER</h2>

        <!-- 기본 정보 -->
        <div class="infomenu">
            <v-col cols="12" id="menutitle">기본정보
                <v-badge
                bordered
                inline
                dot
                color="red"
                ></v-badge>
            </v-col>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-col cols="2" id="menu">
                    <p>카테고리</p>
                </v-col>
                <v-col cols="10">
                    <v-select
                    :items="categoryName"
                    dense
                    v-model="category"
                    label="카테고리를 선택하세요."
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

        <!-- 상세 정보 -->
        <div class="infomenu">
            <v-col cols="12" id="menutitle">상세정보
                <v-badge
                bordered
                inline
                dot
                color="red"
                ></v-badge>
            </v-col>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-col cols="2" id="menu">
                    <p>상품내용</p>
                </v-col>
                <v-col cols="10">
                    <v-textarea
                    label="상품 내용을 입력하세요."
                    v-model="productDetails"
                    ></v-textarea>
                </v-col>
                <v-col cols="2" id="menu">
                    <p>주소</p>
                </v-col>
                <v-col cols="10">
                    <v-text-field v-model="address" id="address" label="주소를 검색하여 입력하세요." prepend-inner-icon="mdi-map-marker" readonly @click="postOpen"></v-text-field>
                </v-col>
            </v-row>
        </div>

        <div class="infomenu">
            <v-col cols="12" id="menutitle">시설 정보 등록
                <v-badge
                bordered
                inline
                dot
                color="red"
                ></v-badge>
            </v-col>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-col cols="12">
                    <v-select
                        v-model="selectedFacilities"
                        :items="facilities"
                        multiple
                        chips
                        label="시설을 선택하여 추가해주세요."
                        variant="outlined"
                    ></v-select>
                </v-chip>
                </v-col>
            </v-row>
        </div>

        <!-- 이미지-->
        <div class="infomenu">
            <v-col cols="12" id="menutitle">이미지 등록
                <v-badge
                bordered
                inline
                dot
                color="red"
                ></v-badge>
            </v-col>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-col cols="12">
                    <v-file-input
                    chips
                    v-model="mainFile"
                    label="메인 이미지 업로드"
                    accept="image/*"
                    ></v-file-input>
                </v-col>
                <v-col cols="12">
                    <v-file-input
                    chips
                    v-model="detailsFiles"
                    label="상세 이미지 업로드"
                    accept="image/*"
                    multiple
                    @change="handleFileUpload"
                    ></v-file-input>
                </v-col>
            </v-row>
        </div>

        <!-- 옵션 정보 -->
        <div class="infomenu">
            <v-col cols="12" id="menutitle">옵션정보
                <v-badge
                bordered
                inline
                dot
                color="red"
                ></v-badge>
            </v-col>
            <v-btn class="optionstyle" x-small plain @click="addRow">+ 추가</v-btn>
            <v-btn class="optionstyle" x-small plain @click="deleteRow(index)">- 삭제</v-btn>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-row class="optionMenu">
                    <v-col cols="4">옵션명</v-col>
                    <v-col cols="3">옵션가격</v-col>
                    <v-col cols="4">판매 기간</v-col>
                    <v-col cols="1">잔여석</v-col>
                </v-row>
            </v-row>
            <v-row no-gutters justify="center" class="infoDetails">
                <v-row v-for="(option, index) in options" :key="index">
                    <v-col cols="4">
                        <v-text-field v-model="option.optionName" label="옵션명을 입력하세요." @change="handleOptionNameUpload(index)"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="option.optionPrice" label="옵션 가격을 입력하세요." @change="handleOptionPriceUpload(index)"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-menu v-model="option.menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="option.dates"
                                label="기간을 선택하세요."
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="option.dates" range @input="option.menu2 = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="1">
                        <v-text-field type="number" v-model="option.campsiteVacancy" @change="handleCampsiteVacancyUpload(index)"></v-text-field>
                    </v-col>
                </v-row>
            </v-row>
        </div>

        <v-row no-gutters align="center" justify="center">
            <v-col cols="auto">
                <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">등록하기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
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
            dates: [],
            menu2: false,
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
            mainFile: null,
            fileNames: [],
            detailsFiles: [],
            mainImageName: '',
            imageNameList:[],

            selectedFacilities: [],
            facilities: [
                'TOILET',
                'SHOWER_ROOM',
                'WATER_FOUNTAIN',
                'WIFI',
                'CONVENIENCE_STORE',
                'BBQ_AREA',
                'WALKING_TRAIL',
                'PET_FRIENDLY',
                'TRAMPOLINE',
                'SWIMMING_POOL',
                'CAFE',
                'PLAYGROUND',
                'SOCCER_FIELD',
            ],
            facilityType: []
        }
    },
    methods: {
        handleFileUpload() {
            this.fileNames = this.detailsFiles.map(file => file.name);
            console.log(this.fileNames);
        },
        handleOptionNameUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 옵션명:`, this.options[optionIndex].optionName);
        },
        handleOptionPriceUpload(optionIndex) {
            console.log(`옵션${optionIndex + 1} 옵션 가격:`, this.options[optionIndex].optionPrice);
        },
        handleStartDateUpload(optionIndex) {
            const startDate = this.options[optionIndex].dates[0];
            console.log(`옵션${optionIndex + 1} 시작 날짜:`, startDate);
        },
        handleEndDateUpload(optionIndex) {
            const endDate = this.options[optionIndex].dates[1];
            console.log(`옵션${optionIndex + 1} 끝 날짜:`, endDate);
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
                Key: this.mainFile.name,
                Body: this.mainFile,
                ACL: 'public-read',
            }, (err, data) => {
                if (err) {
                    console.log(err)
                    return alert("메인 이미지 업로드 중 문제 발생", err.message)
                }
                console.log('메인 이미지 업로드 성공!')
            })
            
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
        postOpen() {
            const vm = this;
            new daum.Postcode({
                oncomplete: function(data) {
                    vm.address = data.address;
                    document.getElementById("address").value = data.address;
                }
            }).open();
        },
        async onSubmit () {
            this.optionsRegisterRequestFormList = this.options.map(option => {
                const startDate = option.dates[0];
                const endDate = option.dates[1];
                    return {
                        startDate: startDate,
                        endDate: endDate,
                        campsiteVacancy: option.campsiteVacancy
                    };
            });

            console.log("campsiteVacancyList", JSON.stringify(this.optionsRegisterRequestFormList));

            this.optionNameList = this.options.map(option => option.optionName);
            console.log("option name list:" + this.optionNameList);

            this.optionPriceList = this.options.map(option => option.optionPrice);
            console.log("option price list:" + this.optionPriceList);

            this.mainImageName = this.mainFile.name;
            console.log("main image name:", this.mainImageName);
            
            this.imageNameList = this.fileNames
            console.log("details image name list: " + this.imageNameList)

            this.facilityType = this.selectedFacilities

            this.uploadAwsS3 ()
            const { productName, category, productDetails, address, facilityType, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList } = this
            console.log("시설 ", facilityType)
            this.$emit('submit', { productName, category, productDetails, address, facilityType, mainImageName, imageNameList, optionNameList, optionPriceList, optionsRegisterRequestFormList})
        },
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.optionMenu {
    text-align: center;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.registerContainer {
    width: 60%;
    margin-top: 100px;
}
.optionstyle {
    font-size: 12px;
    font-weight: 600;
    font-family: 'SUIT-Regular';
}
.infoDetails {
    background-color: rgb(255, 255, 255);
    padding: 1%;
    font-family: 'SUIT-Regular';
}
.registerContainer h2{
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    font-size: 32px;
}
.submitBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 60px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 18px;
    font-weight: 200;
}
.clearBtn {
    width: 200px;
    min-height: 60px;
    margin-top: 60px;
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
    padding: 1%;
    background-color: rgb(255, 255, 255);
    width: 96%;
    margin: auto;
}
.v-text-field {
    font-weight: 100;
}
#menu {
    margin: auto;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
#menutitle {
    font-family: 'SUIT-Regular';
    font-weight: 600;
    background-color: rgb(240, 240, 240);
}
</style>