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
    name: "ProductListByKeywordPage",
        props: {
            keyword: {
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
        ...mapActions(productModule, ['requestProductListByKeywordToSpring']),
    },
    created() {
        this.requestProductListByKeywordToSpring(this.keyword);
    },
}
</script>

<style lang="">
    
</style>