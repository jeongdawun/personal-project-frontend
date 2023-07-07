<template lang="">
    <div>  
        <div class="mySellerInfoMenu">
            <h2>파트너 정보수정</h2>
            <hr class="sellerInfoFormTopLine">
            <form>
                <v-text-field v-model="email" label="이메일" readonly disabled></v-text-field>
                <v-text-field v-model="businessNumber" label="사업자 번호" readonly disabled></v-text-field>
                <v-text-field v-model="businessName" label="사업장명" readonly disabled></v-text-field>
                <v-text-field v-model="address" label="주소"></v-text-field>
                <v-btn class="button primary-button" @click="postOpen">주소검색</v-btn>
                <input type="text" id="address" placeholder="전체 주소"><br>
                <!-- <v-text-field v-model="city" label="도시" color="red"></v-text-field>
                <v-text-field v-model="street" label="도로명" color="red"></v-text-field>
                <v-text-field v-model="addressDetail" label="상세주소" color="red"></v-text-field>
                <v-text-field v-model="zipcode" label="우편번호" color="red"></v-text-field> -->
                <v-text-field v-model="contactNumber" label="고객센터 연락처" color="red"></v-text-field>       
                <v-text-field v-model="bank" label="은행" color="red"></v-text-field>       
                <v-text-field v-model="accountNumber" label="계좌번호" color="red"></v-text-field>                         
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="#73916A" elevation="0" @click="onSubmit">수정하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </form>
            <hr class="sellerInfoFormBottomLine">
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
        ...mapActions(memberModule, ['requestRegisterSellerInfoToSpring', 'requestAuthorizeToSpring', 'requestAuthorizeForSellerInfoToSpring']),
        async onSubmit () {
            const { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber } = this
            console.log("궁금해 들어갈 땐 어떄? " + email + city)
            this.$emit('submit', { email, city, street, addressDetail, zipcode, contactNumber, bank, accountNumber })
        },
        clear () {
            router.push('/')
        },
        postOpen() {
            const vm = this;
            new daum.Postcode({
            oncomplete: function(data) {
                console.log(data)
                console.log(data.sido)
                console.log(data.sigungu)
                console.log(data.roadname)
                console.log(data.query)
                this.address = data.address
                this.city = data.sido + data.sigungu
                this.street = data.roadname
                this.addressDetail = data.buildingName
                this.zipcode = data.zonecode
                console.log("궁금해: " + this.address)
                console.log("궁금해: " + this.city)
                console.log("궁금해: " + this.street)
                console.log("궁금해: " + this.addressDetail)
                console.log("궁금해: " + this.zipcode)
                document.getElementById("address").value = data.address
        }
        }).open();
      }
    },
    async mounted () {
        this.userToken = sessionStorage.getItem("accessToken")
        this.sellerInfo = await this.requestAuthorizeForSellerInfoToSpring({authorizationHeader: this.userToken})
        console.log("가져온 정보: " + JSON.stringify(this.sellerInfo))

        this.address = this.sellerInfo.city + this.sellerInfo.street + this.sellerInfo.addressDetail + this.sellerInfo.zipcode

        this.email = this.sellerInfo.email
        this.contactNumber = this.sellerInfo.contactNumber
        this.bank = this.sellerInfo.bank
        this.accountNumber = this.sellerInfo.accountNumber
    },
}
</script>

<style scoped>

.mySellerInfoMenu {
    padding-top: 100px;
}
.mySellerInfoMenu ul {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    background-color: rgb(255, 0, 0);
    height: 46px;
    margin-top: 20px;
    width: 60%;
}
.mySellerInfoMenu li {
    display: block;
    width: 100%;
    text-align:center;
    font-weight: lighter;
    font-size: 14px;
    color: rgb(0, 255, 34);
    padding-top: 12px;
}
h2{
    text-align: center;
    font-family: 'GmarketSans';
    font-weight: 200;
    font-size: 40px;
    padding-top: 20px;
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
    width: 30%;
    height: 400px;
    margin: auto;
    padding-top: 40px;
    padding-bottom: 40px;
    font-family: 'GmarketSans';
    font-weight: 100;
}
.submitBtn {
    width: 140px;
    margin-top: 40px;
    color: white;
    font-family: 'GmarketSans';
    font-size: 15px;
    font-weight: 200;
}
.clearBtn {
    width: 140px;
    margin-top: 40px;
    font-family: 'GmarketSans';
    font-size: 15px;
    font-weight: 200;
}
</style>