<template lang="">
    <div class="out-container">
    <v-container class="mySellerInfoMenu">
        <h2>SELLER INFO</h2>
        <div class="infoBox">
            <span>이메일<Strong> *</Strong></span>
            <div class="box"><input v-model="email" readonly disabled></input></div>
            <span>사업자번호<Strong> *</Strong></span>
            <div class="box"><input v-model="businessNumber" readonly disabled></input></div>
            <span>사업장명<Strong> *</Strong></span>
            <div class="box"><input v-model="businessName" readonly disabled></input></div>
            <span id="guide"><Strong> * </Strong>항목은 변경이 불가합니다.</span>
        </div>
        
        <div class="infoBox">
            <span>사업장 소재지</span>
            <v-row no-gutters justify="center">  
                <v-col cols="12">
                    <div class="box"><input v-model="address" id="address" readonly></input></div>
                </v-col>
                <v-col cols="12">
                    <div>
                        <v-btn class="serchBtn" small elevation="0" color="#72ADEE" @click="postOpen">주소검색</v-btn>
                    </div>
                </v-col>
            </v-row>
            <span>고객센터 연락처</span>
            <div class="box"><input v-model="contactNumber" ></input></div>
        </div> 
        
        <div class="infoBox">
            <span>은행</span>
            <div class="box"><input v-model="bank" ></input></div>
            <span>계좌번호</span>    
            <div class="box"><input v-model="accountNumber" ></input></div>
        </div>

        <v-row no-gutters align="center" justify="center">
            <v-col cols="auto">
                <v-btn class="submitBtn" color="#282F33" elevation="0" @click="onSubmit">저장하기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import router from '@/router'
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
            businessNumber: '',
            businessName: '',
            contactNumber: '',
            bank: '',
            accountNumber: '',

            address:'',
            city: '',
            street: '',
            addressDetail: '',
            zipcode: '',

            sellerInfo: [],
        }
    },
    methods: {
        ...mapActions(memberModule, ['requestAuthorizeForSellerInfoToSpring']),
        async onSubmit () {
            const { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber } = this
            this.$emit('submit', { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber })
        },
        clear () {
            router.push('/')
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
      }
    },
    async mounted () {
        this.sellerInfo = await this.requestAuthorizeForSellerInfoToSpring()
        console.log("가져온 정보: " + JSON.stringify(this.sellerInfo))

        if(this.sellerInfo.city == null && this.sellerInfo.street == null && this.sellerInfo.addressDetail == null && this.sellerInfo.zipcode == null) {
            this.address = "";
        } else {
            this.address = this.sellerInfo.city + " " + this.sellerInfo.street + " " + this.sellerInfo.addressDetail + " " + this.sellerInfo.zipcode
        }
        this.city = this.sellerInfo.city
        this.street = this.sellerInfo.street
        this.addressDetail = this.sellerInfo.addressDetail
        this.zipcode = this.sellerInfo.zipcode

        this.email = this.sellerInfo.email
        this.businessNumber = this.sellerInfo.businessNumber
        this.businessName = this.sellerInfo.businessName
        this.contactNumber = this.sellerInfo.contactNumber
        this.bank = this.sellerInfo.bank
        this.accountNumber = this.sellerInfo.accountNumber
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.mySellerInfoMenu {
    width: 30%;
    font-family: 'SUIT-Regular';
    background-color: white;
    padding: 1%;
    height: 1060px;
}
.box {
    background-color: rgb(247, 247, 247);
    border-radius: 12px;
    padding: 2%;
    margin-left: 1%;
    margin-bottom: 6px;
}
.out-container {
    background-color: rgb(250, 250, 250);
    height: 1060px;
}
.box input {
    outline: none;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
}
h2{
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    margin-top: 70px;
    font-size: 32px;
    color: #282F33;
}
span {
    font-size: 13px;
    padding-left: 10px;
    font-weight: 600;
    color: #616568;
}
.submitBtn {
    width: 160px;
    min-height: 40px;
    margin-top: 40px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 13px;
    font-weight: 200;
    margin-left: 6px;
    margin-right: 6px;
}
.clearBtn {
    width: 160px;
    min-height: 40px;
    margin-top: 40px;
    font-family: 'SUIT-Regular';
    font-size: 13px;
    font-weight: 200;
    margin-left: 6px;
    margin-right: 6px;
}
.serchBtn {
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    margin-left: 8px;
    color: rgb(255, 255, 255);
    margin-bottom: 8px;
}
Strong {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.infoBox {
    padding-bottom: 20px;
    padding-top: 20px;
}
.infoBox Strong{
    font-size: 14px;
    color: #FF5140;
}
#guide {
    font-size: 12px;
    font-weight: 100;
}
</style>