<template lang="">
    <div>
        <my-product-list-form v-if="product" :product="product"/>
    </div>
</template>

<script>
import MyProductListForm from "@/components/product/MyProductListForm.vue";
import { mapActions, mapState } from "vuex";

const productModule = "productModule";

export default {
    data () {
        return {
            product: []
        }
    },
    components: {
        MyProductListForm,
    },
    methods: {
        ...mapActions(productModule, ['requestMyProductToSpring']),
    },
    async created() {
        this.product = await this.requestMyProductToSpring();
    },
}
</script>
<style lang="">
    
</style>