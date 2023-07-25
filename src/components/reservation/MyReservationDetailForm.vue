<template lang="">
    <div>
        <v-container class="myReservationDetailContainer">
            <h2>MY RESERVATION DETAIL</h2>
            <v-col class="reservationForm" cols="12">
                <p class="titleName">
                    <Strong>주문번호 : </Strong>{{reservation.partner_order_id}}<br>
                    <Strong>주문일자 : </Strong>{{reservation.approved_at}}</p>
                <hr class="menuBar">
                <v-row no-gutters class="reservationTable">
                    <v-col cols="6">
                        <span>상품정보</span>
                    </v-col>
                    <v-col cols="2">
                        <span>상품금액</span>
                    </v-col>
                    <v-col cols="2">
                        <span>체크인</span>
                    </v-col>
                    <v-col cols="2">
                        <span>체크아웃</span>
                    </v-col>
                </v-row>
                <hr class="menuBarMiddle">
                <v-row no-gutters class="reservationDetailTable">
                    <v-col cols="6" class="productDetail">
                        <span>상품번호 : {{ reservation.productId }}</span><br>
                        <span>상품명 : {{ reservation.productName }}</span><br>
                        <span>옵션명 : {{ reservation.optionName }}</span>
                    </v-col>
                    <v-col cols="2">
                        <span>{{ reservation.payment }}</span>
                    </v-col>
                    <v-col cols="2">
                        <span> {{ reservation.checkInDate }}</span>
                    </v-col>
                    <v-col cols="2">
                        <span>{{ reservation.checkOutDate }}</span>
                    </v-col>
                </v-row>
                <hr class="menuBarBottom">
            </v-col>

            <v-col class="paymentForm" cols="12">
                <p class="titleName"><Strong>결제방법</Strong></p>
                <hr class="menuBar">
                <v-row no-gutters class="paymentTable">
                    <v-col cols="4" class="paymentMenu">
                        <span>결제수단</span>
                    </v-col>
                    <v-col cols="8" class="paymentDetail">
                        <span>{{ reservation.payment_method_type }}</span>
                    </v-col>
                </v-row>
                <hr class="menuBarMiddle">
                <v-row no-gutters class="paymentTable">
                    <v-col cols="4" class="paymentMenu">
                        <span>결제금액</span>
                    </v-col>
                    <v-col cols="8" class="paymentDetail">
                        <span>{{ reservation.amount.total }}</span>
                    </v-col>
                </v-row>
                <hr class="menuBarMiddle">
                <v-row no-gutters class="paymentTable">
                    <v-col cols="4" class="paymentMenu">
                        <span>승인시간</span>
                    </v-col>
                    <v-col cols="8" class="paymentDetail">
                        <span>{{ reservation.approved_at }}</span>
                    </v-col>
                </v-row>
                <hr class="menuBarBottom">
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn class="goToList" color="#282F33" elevation="0" @click="goToList">목록으로 돌아가기</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-container>
    </div>
</template>

<script>
import router from "@/router";

export default {
    name: "MyReservationDetailForm",
        props: {
            reservation: {
                type: Object,
                required: true,
        },
    },
    methods: { 
        goToList() {
            router.push('/myReservation')
        }
    }
}
</script>

<style scoped>
.myReservationDetailContainer {
    width: 66%;
    padding-top: 140px;
    font-family: 'SUIT-Regular';
} 
.reservationForm {
    padding-bottom: 40px;
}
.paymentForm {
    padding-top: 40px;
}
.menuBar {
    border: none;
    height: 2px;
    background-color: black;
}
.menuBarBottom {
    border: none;
    height: 1px;
    background-color: black;
}
.menuBarMiddle {
    border: none;
    height: 1px;
    background-color: rgb(201, 201, 201);
}
.paymentMenu {
    background-color: rgb(245, 245, 245);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.titleName {
    font-size: 18px;
    margin-bottom: 18px;
}
h2 {
    text-align: center;
    margin-bottom: 40px;
}
span {
    padding: 1%;
}
.reservationTable {
    height: 60px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
}
.reservationDetailTable {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
}
.paymentDetail {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
.paymentTable {
    height: 60px;
}
.goToList {
    width: 40%;
    min-height: 40px;
    color: white;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    font-weight: 200;
    margin-top: 40px;
    border-radius: 33px;
}
.productDetail {
    text-align: left;
}
.productDetail span{
    padding-left: 30%;
}
</style>