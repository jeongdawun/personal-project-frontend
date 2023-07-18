<template lang="">
    <div>
        <h2 class="nohaveProduct" v-if="this.nohaveProduct">등록된 상품이 없습니다. 상품을 등록해주세요.</h2>
        <!-- <button @click="goToProductRegister" v-if="this.nohaveProduct">상품 등록하기</button> -->
        <v-btn @click="goToProductRegister" v-if="this.nohaveProduct" class="goToRegister" color=#73916A x-large>상품 등록하러 가기</v-btn>
        <my-product-list-form v-if="product" :product="product"/>
    </div>
</template>

<script>
import MyProductListForm from "@/components/product/MyProductListForm.vue";
import { mapActions } from "vuex";
import router from '@/router';

const productModule = "productModule";

export default {
    data () {
        return {
            product: [],
            nohaveProduct: false,
        }
    },
    components: {
        MyProductListForm,
    },
    methods: {
        ...mapActions(productModule, ['requestMyProductToSpring']),
        goToProductRegister() {
            if(this.product == "") {
                router.push('/register')
            }
        }
    },
    async created() {
        this.product = await this.requestMyProductToSpring();   
        if(this.product == "") {
            this.nohaveProduct = true;
        }
    },
}
</script>
<style scoped>
.nohaveProduct {
    padding-top: 300px;
    margin: auto;
    text-align: center;
    font-family: 'SUIT-Regular';
    font-weight: 600;
    font-size: 28px;
}
.goToRegister {
    margin: auto;
    display: flex;
    width: 280px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 18px;
    font-family: 'SUIT-Regular';
    color: white;
    border-radius: 33px;
}
</style>