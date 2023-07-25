<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="reservations"
            @click:row="readDetail" show-select
            class="reservationTable"
            v-model="selectedItems"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                <v-toolbar-title>MY RESERVATION
                    <span class="mdi mdi-heart"></span>({{ reservations.length }})</v-toolbar-title>
                </v-toolbar>
                <hr>
            </template>
            <template v-slot:item.status="{ item }">
            <v-chip
                :color="getColor(item.status)"
                dark
            >
                {{ item.status }}
            </v-chip>
            </template>
            <template v-slot:item.actions="{ item }" class="review">
                <v-btn class="reviewBtn" text @click="reviewRegister(item)">리뷰작성</v-btn><br>
                <span>{{ formatDate(item.checkOutDate) }} 까지</span>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import router from "@/router";
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
            headers: [
                {
                    text: '예약번호',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: '상품명', value: 'productName' },
                { text: '옵션명', value: 'optionName' },
                { text: '결제금액', value: 'payment' },
                { text: '체크인', value: 'checkInDate' },
                { text: '체크아웃', value: 'checkOutDate' },
                { text: '예약상태', value: 'status' },
                { text: '리뷰', value: 'actions', sortable: false },
            ],
            selectedItems: [],
        }
    },
    methods: {
        getColor (status) {
            if (status == "REQUESTED") return 'orange'
            else if (status == "COMPLETED") return 'green'
            else if (status == "CANCEL_REQUESTED") return 'yellow'
            else if (status == "CANCELLED") return 'red'
        },
        async reviewRegister (item){
            if(item.status != "COMPLETED") {
                return alert("사용이 완료된 예약건에 대해서만 작성이 가능합니다.")
            }
            console.log("리뷰 작성 원하는 상품: " + JSON.stringify(item))
        },
        formatDate(checkOutDate) {
            const date = new Date(checkOutDate);
            date.setDate(date.getDate() + 14);
            
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}`;
        },
        readDetail (readValue) {
            router.push({
                name: 'MyReservationDetailPage',
                params: { id: readValue.id.toString()}
            })
        }
    }
}
</script>

<style scoped>
.v-data-table {
    font-family: 'SUIT-Regular';
    text-align: center;
}
.reviewBtn {
    color: rgb(61, 61, 61);
}
</style>