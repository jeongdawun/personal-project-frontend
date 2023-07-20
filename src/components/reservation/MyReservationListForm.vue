<template>
    <v-container>
        <span>나의 예약 현황</span>
        <v-data-table :headers="headerTitle" :items="reservations" 
                :items-per-page="7" class="elevation-1"
                item-key="id"/>
    </v-container>
</template>

<script>
export default {
    name: "MyReservationListForm",
        props: {
            reservations: {
                type: Array,
                required: true,
        },
    },
    data () {
        return {
            headerTitle: [
                { text: '예약번호', value: 'id', width: "70px" },
                { text: '상품번호', value: 'productId', width: "70px" },
                { text: '상품명', value: 'productName', width: "200px" },
                { text: '옵션명', value: 'optionName', width: "100px" },
                { text: '결제내역', value: 'payment', width: "100px" },
                { text: '체크인', value: 'checkInDate', width: "100px" },
                { text: '체크아웃', value: 'checkOutDate', width: "100px" },
                { text: '예약상태', value: 'status', width: "100px" },
            ]
        }
    }
}
</script>

<style lang="">
    
</style>