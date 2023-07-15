<template lang="">
    <div>
        <product-list-form :products="products"/>
    </div>
</template>

<script>
import ProductListForm from "@/components/product/ProductListForm.vue";
import { mapActions, mapState } from "vuex";

const productModule = "productModule";

export default {
    name: "ProductListByCategoryPage",
        props: {
            category: {
                type: String,
                required: true,
        },
    },
    components: {
        ProductListForm,
    },
    computed: {
        ...mapState(productModule, ["products"]),
    },
    methods: {
        ...mapActions(productModule, ['requestProductListByCategoryToSpring']),
    },
    created() {
        this.requestProductListByCategoryToSpring(this.category);
    },
}
</script>

<style lang="">
    
</style>