<template lang="">
    <div>
        <h2 class="nohaveProduct" v-if="this.nohaveProduct">등록된 상품이 없습니다. 상품 등록을 진행해주세요.</h2>
        <button @click="goToProductRegister" v-if="this.nohaveProduct">상품 등록하기</button>
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
    padding-top: 200px;
    margin: auto;
    text-align: center;
}
</style>