<template lang="">
    <div>
        <div class="myPageheader">
            <h2>MY PAGE</h2>
            <h4><strong>{{ this.email }}</strong> 님 안녕하세요.</h4>
        </div>
        <div class="myPageMenu">
            <v-row no-gutters class="info" v-if="this.roleType === 'NORMAL'">
                <v-col cols="6" id="menu">
                    <a href="/myProfilePage"><Strong>나의 정보 관리</Strong></a>
                </v-col>
                <v-col cols="6" id="menu">
                    <a href="/myReservation"><Strong>나의 주문 내역</Strong></a>
                </v-col>
            </v-row>
            <v-row no-gutters class="uesrInfo" v-if="this.roleType === 'NORMAL'">
                <v-col cols="2" id="bookingTitle">
                    <Strong>나의 예약 현황</Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>예약 신청</Strong><br>
                    <Strong id="value"><a @click="showReservation">{{ REQUESTED }}</a></Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>이용 완료</Strong><br>
                    <Strong id="value"><a @click="showReservation">{{ COMPLETED }}</a></Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>취소 요청</Strong><br>
                    <Strong id="value"><a @click="showReservation">{{ CANCEL_REQUESTED }}</a></Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>취소 완료</Strong><br>
                    <Strong id="value"><a @click="showReservation">{{ CANCELLED }}</a></Strong>
                </v-col>
            </v-row>
            <v-row no-gutters class="info" v-if="this.roleType === 'BUSINESS'">
                <v-col cols="6" id="menu">
                    <a href="/sellerInfoPage"><Strong>파트너 정보 관리</Strong></a>
                </v-col>
                <v-col cols="6" id="menu">
                    <a href="/MyList"><Strong>나의 상품 목록</Strong></a>
                </v-col>
            </v-row>
            <v-row no-gutters class="uesrInfo" v-if="this.roleType === 'BUSINESS'">
                <v-col cols="2" id="bookingTitle">
                    <Strong>예약 리스트</Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>예약 신청</Strong><br>
                    <Strong id="value">{{ REQUESTED }}</Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>이용 완료</Strong><br>
                    <Strong id="value">{{ COMPLETED }}</Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>취소 요청</Strong><br>
                    <Strong id="value">{{ CANCEL_REQUESTED }}</Strong>
                </v-col>
                <v-col cols="2" id="status">
                    <Strong>취소 완료</Strong><br>
                    <Strong id="value">{{ CANCELLED }}</Strong>
                </v-col>
            </v-row>
        </div>
        <div class="reservationList" v-if="this.roleType === 'NORMAL'">
            <my-cart-list-form :cartItems="cartItems"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MyCartListForm from '@/components/cart/MyCartListForm.vue'

const cartModule = 'cartModule'
const reservationModule = 'reservationModule'

export default {
    components: {
        MyCartListForm
    },
    data () {
        return {
            email: '',
            roleType: '',
            accessToken: '',
            REQUESTED: 0,
            COMPLETED: 0,
            CANCEL_REQUESTED: 0,
            CANCELLED: 0
        }
    },
    computed: {
        ...mapState(cartModule, ['cartItems']),
    },
    methods: {
        ...mapActions(reservationModule, ['requestMemberInfoWithReservationStatusToSpring']),
        ...mapActions(cartModule, ['requestCartItemListToSpring']),
        showReservation() {
            this.$router.push('/myReservation')
            .catch(() => {})
        },
    },
    async mounted() {
        this.response = await this.requestMemberInfoWithReservationStatusToSpring()

        if(this.response != '') {
            console.log("reponse: " + JSON.stringify(this.response))
            this.email = this.response.authResponse.email
            this.roleType = this.response.authResponse.role
            this.REQUESTED = this.response.amountList[0]
            this.COMPLETED = this.response.amountList[1]
            this.CANCEL_REQUESTED = this.response.amountList[2]
            this.CANCELLED = this.response.amountList[3]
            if(this.roleType === 'NORMAL') {
                await this.requestCartItemListToSpring()
            }
        } else {
            alert("문제 발생")
        }
    },
}
</script>

<style scoped>
.myPageheader h2 {
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    margin-top: 100px;
    font-size: 32px;
}
.myPageheader h4 {
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: lighter;
    padding-block: 20px;
}
.info {
    padding: 1%;
    padding-top: 40px;
    padding-bottom: 60px;
    text-align: center;
    justify-content: center !important;
}
.uesrInfo {
    text-align: center;
    justify-content: center !important;
    padding-bottom: 20px;
}
#menu {
    background-color: rgb(248, 248, 248);
    padding: 1%;
    border-radius: 20px;
    margin: auto;
}
#menu Strong{
    color: #000000;
}
a {
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
    color: #000000;
    font-weight: 200;
    font-family: 'SUIT-Regular';
}
#status {
    border: solid rgb(236, 236, 236) 2px;
    margin: 1%;
    padding: 1.2%;
    border-radius: 20px;
    text-align: center;
    font-family: 'SUIT-Regular';
}
#status a{
    color: red;
    font-weight: 600;
}
#bookingTitle {
    padding-bottom: 2%;
    padding-top: 2%;
    font-size: 20px;
    font-weight: bold;
    font-family: 'SUIT-Regular';
    text-align: center;
    margin: auto;
}
#value {
    color: red; 
}
.v-application .info {
    background-color: #ffffff !important;
    border-color: #ffffff !important;
}
.row {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
    align-items: flex-end;
    justify-content: flex-end;
}
.row[data-v-3185fbe0] {
    display: flex;
    flex-wrap: wrap;    
    align-content: flex-end;
    align-items: flex-end;
    justify-content: center;
}
.reservationList {
    padding-top: 20px;
    padding-bottom: 100px;
    width: 70%;
    margin: auto;
}
.myPageMenu {
    width: 70%;
    margin: auto;
}
</style>