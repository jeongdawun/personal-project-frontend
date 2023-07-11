<template lang="">
    <div>  
        <div class="mySellerInfoMenu">
            <h2>파트너 정보 수정</h2>
            <!-- <hr class="sellerInfoFormTopLine"> -->
            <form>
                <Strong>기본정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="email" label="이메일" filled readonly disabled></v-text-field>
                    <v-text-field v-model="businessNumber" label="사업자 번호" filled readonly disabled></v-text-field>
                    <v-text-field v-model="businessName" label="사업장명" filled readonly disabled></v-text-field>
                </div>
                
                <Strong>추가정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="address" id="address" label="사업장 소재지" readonly></v-text-field>

                    <v-btn class="serchBtn" @click="postOpen">주소검색</v-btn>

                    <v-text-field v-model="city" id="city" label="도시" readonly></v-text-field>
                    <v-text-field v-model="street" id="street" label="도로명" readonly></v-text-field>
                    <v-text-field v-model="addressDetail" id="addressDetail" label="상세주소" color="red"></v-text-field>
                    <v-text-field v-model="zipcode" id="zipcode" label="우편번호"></v-text-field>

                    <v-text-field v-model="contactNumber" label="고객센터 연락처" color="red"></v-text-field>      
                </div> 
                
                <Strong>정산정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="bank" label="은행" color="red"></v-text-field>       
                    <v-text-field v-model="accountNumber" label="계좌번호" color="red"></v-text-field>     
                </div>

                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="onSubmit">수정하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
            <!-- <hr class="sellerInfoFormBottomLine"> -->
        </div>
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
                document.getElementById("city").value = data.sido + data.sigungu;
                document.getElementById("street").value = data.roadname;
                document.getElementById("addressDetail").value = data.buildingName;
                document.getElementById("zipcode").value = data.zonecode;
        }
        }).open();
      }
    },
    async mounted () {
        this.sellerInfo = await this.requestAuthorizeForSellerInfoToSpring()
        console.log("가져온 정보: " + JSON.stringify(this.sellerInfo))

        this.address = this.sellerInfo.city + " " + this.sellerInfo.street + " " + this.sellerInfo.addressDetail + " " + this.sellerInfo.zipcode
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
.sellerInfoFormTopLine {
    width: 40%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.sellerInfoFormBottomLine {
    width: 40%;
    margin: auto;
    margin-top: 160px;
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
.serchBtn {
    margin-bottom: 10px;
}
Strong {
    font-size: 24px;
    font-family: 'SUIT-Regular';
    font-weight: 600;
}
.infoBox {
    padding-bottom: 40px;
    padding-top: 10px;
}
</style>