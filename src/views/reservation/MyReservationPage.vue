<template lang="">
    <v-container>
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
    </v-container>
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
            contactNumber: 0,
            checkInDate: '',
            checkOutDate: '',
            amount: 0,
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
   h2 {
    font-size: 200px
   } 
</style>