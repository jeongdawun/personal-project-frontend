<template lang="">
    <div>
        <div class="myComparePageHeader">
            <h2>MY TAG</h2>
            <h4>원하는 상품을 비교해보세요!</h4>
        </div>
        <div class="reservationList">
            <my-cart-list-form :cartItems="cartItems"/>
        </div>
        <hr>
        <v-row>
            <v-col cols="6" v-for="item in cartItemsForCompare" :key="item.id">
                <compare-form-with-tags v-if="item" :product="item"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import CompareFormWithTags from '@/components/cart/CompareFormWithTags.vue'
import MyCartListForm from '@/components/cart/MyCartListForm.vue'
import { mapActions, mapState } from "vuex";

const cartModule = 'cartModule'

export default {
    components: {
        CompareFormWithTags,
        MyCartListForm
    },
    computed: {
        ...mapState(cartModule, ['cartItems','cartItemsForCompare']),
    },
    methods: {
        ...mapActions(cartModule, ['requestCartItemListToSpring']),
    },
    async created() {
        await this.requestCartItemListToSpring()
    },
}
</script>

<style scoped>
.reservationList {
    padding-top: 60px;
    width: 70%;
    margin: auto;
}
.myComparePageHeader h2 {
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: bold;
    padding-block: 20px;
    margin-top: 100px;
    font-size: 32px;
}
.myComparePageHeader h4 {
    font-family: 'SUIT-Regular';
    text-align: center;
    font-weight: lighter;
    padding-block: 10px;
    font-size: 16px;
}
</style>