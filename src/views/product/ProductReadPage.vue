<template lang="">
    <div>
        <product-read-form v-if="product" :product="product"/>
    </div>
</template>

<script>
import ProductReadForm from "@/components/product/ProductReadForm.vue";
import router from "@/router";
import { mapActions, mapState } from "vuex";

const productModule = "productModule";

export default {
    name: "ProductReadPage",
        props: {
            id: {
                type: Number,
                required: true,
        },
    },
    components: {
        ProductReadForm,
    },
    computed: {
        ...mapState(productModule, ["product"]),
    },
    methods: {
    ...mapActions(productModule, ['requestProductToSpring']),
    },
    created() {
        this.requestProductToSpring(this.id);
    },
}
</script>

<style lang="">
    
</style>