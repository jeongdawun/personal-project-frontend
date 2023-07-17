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
            <v-btn @click="reservation">결제하기</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "MyReservationPage",
    data () {
        return {
            order: null,
        }
    },
    mounted() {
        this.order = JSON.parse(localStorage.getItem("order"))
    },
    methods: {
        reservation () {
            this.requestReservationToSpring(this.order)
        }
    }
}
</script>

<style scoped>
   h2 {
    font-size: 200px
   } 
</style>