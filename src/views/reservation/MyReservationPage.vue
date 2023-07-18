<template lang="">
    <!-- <v-container>
        <v-row no-gutters>
            <h2>예약하기</h2>
            <v-col cols="12">
                상품 번호: <input type="text" :value="order.id" readonly/>
            </v-col>
            <v-col cols="12">
                상품명: <input type="text" :value="order.productName" readonly/>
            </v-col>
            <v-col cols="12">
                옵션 번호: <input type="text" :value="order.optionid" readonly/>
            </v-col>
            <v-col cols="12">
                옵션명: <input type="text" :value="order.optionName" readonly/>
            </v-col>
            <v-col cols="12">
                체크인 날짜: <input type="text" :value="order.checkInDate" readonly/>
            </v-col>
            <v-col cols="12">
                체크아웃 날짜: <input type="text" :value="order.checkOutDate" readonly/>
            </v-col>
            <v-col cols="12">
                수량: <input type="number" v-model="amount"/>
            </v-col>
            <v-btn @click="reservation">예약 및 결제하기</v-btn>
        </v-row>
        <v-row no-gutters>
            <h3>예약자 정보</h3>
            <v-col cols="12">
                예약자 성함: <input type="text" v-model="userName"/>
            </v-col>
            <v-col cols="12">
                연락처: <input type="number" v-model="contactNumber"/>
            </v-col>
            <v-col cols="12">
                기타 요청사항: <input type="text" v-model="bookingNotes"/>
            </v-col>
        </v-row>
    </v-container> -->
    <div>  
        <div class="myProfileMenu">
            <h2>예약하기</h2>
            <form>
                <Strong>상품 정보</Strong>
                <div class="infoBox">
                    <!-- <v-text-field :value="order.id"></v-text-field> -->
                    <v-text-field :value="order.productName" label="상품명"></v-text-field>
                    <!-- <v-text-field :value="order.optionid"></v-text-field> -->
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

                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <v-btn class="submitBtn" color="black" elevation="0" @click="reservation">예약 및 결제하기</v-btn>
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
import { mapActions } from 'vuex';
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
                contactNumber: this.contactNumber,
                amount: this.amount,
                bookingNotes: this.bookingNotes
            }
            await this.requestReservationToSpring(reservationRequest)
            await localStorage.removeItem("order")
        }
    }
}
</script>

<style scoped>
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
.withdraw {
    font-family: 'SUIT-Regular';
    font-weight: 200;
    font-size: 14px;
    text-decoration: none;
    color: #535353;
    display: inline-block;
    white-space: nowrap;
}
</style>