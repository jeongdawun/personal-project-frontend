<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="cartItems"
            show-select
            class="cartTable"
            v-model="selectedItems"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                <v-toolbar-title>MY CART
                    <span class="mdi mdi-heart"></span>({{ cartItems.length }})</v-toolbar-title>
                <v-spacer></v-spacer>
                <span v-if="$route.path === '/myPage' || $route.path === '/mycart'"><v-btn class="goToCompare" text @click="compareCartItems"># 비교하러 가기</v-btn></span>
                </v-toolbar>
                <hr>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn class="deleteBtn" text @click="deleteItem(item)">삭제하기</v-btn><br>
                <v-btn class="reservationBtn" text @click="reservationItem(item)">바로예약</v-btn>
            </template>
        </v-data-table>
        <v-btn text class="selectedAction" @click="selectedDelete">선택상품삭제</v-btn>
        <v-btn text class="selectedAction" @click="compareProduct" v-if="$route.path === '/compare-products-by-tags'">비교하기</v-btn>
    </v-container>
</template>

<script>
import router from "@/router";
import { mapActions } from 'vuex';

const cartModule = 'cartModule'

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
                // { text: '상품번호', value: 'productId' },
                { text: '상품명', value: 'productName' },
                // { text: '옵션번호', value: 'optionId' },
                { text: '옵션명', value: 'optionName' },
                { text: '체크인', value: 'checkInDate' },
                { text: '체크아웃', value: 'checkOutDate' },
                { text: '상품금액', value: 'payment'},
                { text: '선택', value: 'actions', sortable: false },
            ],
            selectedItems: [],
        }
    },
    beforeUpdate () {
        console.log('selected: ' + JSON.stringify(this.selectedItems))
        const selectedIds = this.selectedItems.map(item => item.id);
        localStorage.setItem("selectedProductIds", JSON.stringify(selectedIds));
    },
    methods: {
        ...mapActions(cartModule, ['setIdList','requestDeleteCartItemListToSpring', 'requestDeleteListCartItemListToSpring', 'requestCartItemListForCompareToSpring']),
        async deleteItem (item){
            console.log("삭제 원하는 상품: " + JSON.stringify(item))
            await this.requestDeleteCartItemListToSpring(item.id);
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
        async selectedDelete (){
            console.log("선택한 장바구니 상품: " + JSON.stringify(this.selectedItems))
            const idList = this.selectedItems.flatMap(selectedItem => selectedItem.id);
            await this.requestDeleteListCartItemListToSpring(idList);
        },
        async compareProduct () {
            const idList = JSON.parse(localStorage.getItem("selectedProductIds"));
            console.log("선택한 장바구니 상품 id: " + idList)
            await this.requestCartItemListForCompareToSpring(idList)
        },
        compareCartItems () {
            router.push({
                name: 'ComparePageWithTags',
            });
        }
    }
}
</script>

<style scoped>
.v-data-table {
    font-family: 'SUIT-Regular';
    text-align: center;
}
.deleteBtn {
    color: rgb(255, 34, 5);
}
.reservationBtn {
    color: #73916A;
}
.selectedAction {
    margin-top: -80px;
    margin-left: 18px;
    font-family: 'SUIT-Regular';
    font-size: 14px;
    background-color: black;
    color: white;
}
</style>