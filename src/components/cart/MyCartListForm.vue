<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="cartItems"
            show-select
            class="elevation-1"
            v-model="selectedItems"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                <v-toolbar-title>My Cart()</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn class="deleteBtn" text @click="deleteItem(item)">삭제하기</v-btn><br>
                <v-btn class="reservationBtn" text @click="reservationItem(item)">예약하기</v-btn>
            </template>
        </v-data-table>
        <v-btn class="selectedAction" @click="selectedDelete">선택상품삭제</v-btn>
    </v-container>
</template>

<script>
import router from "@/router";

export default {
    name: "MyCartListForm",
        props: {
            cartItems: {
                type: Array,
                required: true,
        },
    },
    data () {
        return {
            headers: [
                {
                    text: '순서',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: '상품번호', value: 'productId' },
                { text: '상품명', value: 'productName' },
                { text: '옵션번호', value: 'optionId' },
                { text: '옵션명', value: 'optionName' },
                { text: '체크인', value: 'checkInDate' },
                { text: '체크아웃', value: 'checkOutDate' },
                { text: '총 금액', value: 'payment'},
                { text: '선택', value: 'actions', sortable: false },
            ],
            selectedItems: [],
        }
    },
    beforeUpdate () {
        console.log('selected: ' + JSON.stringify(this.selectedItems))
    },
    methods: {
        deleteItem (item){
            console.log("삭제 원하는 상품: " + JSON.stringify(item))
        },
        reservationItem (item) {
            console.log("예약 원하는 상품: " + JSON.stringify(item))
            const order = {
                id: item.productId,
                productName: item.productName,
                optionid: item.optionId,
                optionName: item.optionName,
                checkInDate: item.checkInDate,
                checkOutDate: item.checkOutDate,
                };
            console.log("오더 잘들어가니: " + JSON.stringify(order))
            router.push({
                name: 'CreateReservationPage',
            });
            localStorage.setItem("order", JSON.stringify(order))
        },
        selectedDelete (){
            console.log("선택한 장바구니 상품: " + JSON.stringify(this.selectedItems))
        }
    }
}
</script>

<style scoped>
.v-data-table {
    font-family: 'SUIT-Regular';
}
.deleteBtn {
    color: rgb(255, 105, 5);
}
.reservationBtn {
    color: #73916A;
}
</style>