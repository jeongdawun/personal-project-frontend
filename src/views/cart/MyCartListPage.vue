<template lang="">
    <div class="reservationList">
        <my-cart-list-form :cartItems="cartItems"/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MyCartListForm from '@/components/cart/MyCartListForm.vue'

const cartModule = 'cartModule'

export default {
    components: {
        MyCartListForm
    },
    computed: {
        ...mapState(cartModule, ['cartItems']),
    },
    methods: {
        ...mapActions(cartModule, ['requestCartItemListToSpring']),
    },
    mounted() {
        this.requestCartItemListToSpring()
    },
}
</script>

<style scoped>
.reservationList {
    padding-top: 120px;
    width: 80%;
    margin: auto;
}
</style>