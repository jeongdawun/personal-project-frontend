<template lang="">
    <v-container class="container">
        <!-- <div class="myProfileMenu"> -->
            <h2>예약하기</h2>
            <v-form>
                <Strong>상품 정보</Strong>
                <div class="infoBox">
                    <v-text-field :value="order.productName" label="상품명"></v-text-field>
                    <v-text-field :value="order.optionName" label="옵션명"></v-text-field>
                    <v-text-field :value="order.checkInDate" label="체크인"></v-text-field>
                    <v-text-field :value="order.checkOutDate" label="체크아웃"></v-text-field>
                </div>

                <Strong>예약 정보</Strong>
                <div class="infoBox">
                    <v-text-field v-model="amount" label="수량을 입력하세요."></v-text-field>
                    <v-text-field v-model="userName" label="예약자 성함을 입력하세요."></v-text-field>
                    <v-text-field v-model="contactNumber" label="연락처를 입력하세요."></v-text-field>
                    <v-text-field v-model="bookingNotes" label="기타 요청사항을 입력하세요."></v-text-field>
                </div>      

                <v-row no-gutters align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="reservation">예약 및 결제하기</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="clearBtn" elevation="0" @click="clear">취소</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        <!-- </div> -->
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import router from "@/router";
const reservationModule = 'reservationModule'

export default {
    name: "MyReservationPage",
    data () {
        return {
            order: null,

            productId: 0,
            productOptionId: 0,
            userName: '',
            contactNumber: '',
            checkInDate: '',
            checkOutDate: '',
            amount: '',
            bookingNotes: '',
            kakaoReponse: Object,
        }
    },
    mounted() {
        this.order = JSON.parse(localStorage.getItem("order"))
    },
    methods: {
        ...mapActions(reservationModule, ['requestReservationToSpring']),
        async reservation () {
            const reservationRequest = {
                productId: this.order.id,
                productOptionId: this.order.optionid,
                checkInDate: this.order.checkInDate,
                checkOutDate: this.order.checkOutDate,
                userName: this.userName,
                contactNumber: this.contactNumber.replace(/-/g, ""),
                amount: this.amount,
                bookingNotes: this.bookingNotes
            }
            this.kakaoReponse = await this.requestReservationToSpring(reservationRequest)
            console.log("카카오 응답: " + JSON.stringify(this.kakaoReponse))
            if (this.kakaoReponse && this.kakaoReponse.next_redirect_pc_url) {
                window.open(this.kakaoReponse.next_redirect_pc_url, '_blank');
            }
            await localStorage.removeItem("order")
        },
        clear () {
            router.push('/')
        },
    }
}
</script>

<style scoped>
.container {
    width: 80%;
    margin-top: 100px;
    margin-bottom: 300px;
}
.myProfileMenu {
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
.profileFormTopLine {
    width: 40%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.profileFormBottomLine {
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
span {
    padding-left: 10px;
    font-size: 14px;
    color: red;
}
.checkValue {
    border-radius: 10px;
    font-size: 14px;
    padding: 2px 10px 1px 10px;
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
.checkNickNameInfo {
    margin-top: 10px;
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
.infoBox {
    padding-bottom: 40px;
    padding-top: 10px;
}
.withdrawal {
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 14px;
    text-decoration: none;
    color: #535353;
    display: inline-block;
    white-space: nowrap;
}
</style>