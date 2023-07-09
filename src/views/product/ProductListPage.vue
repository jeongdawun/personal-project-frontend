<template lang="">
    <div>
        <product-list-form :products="products"/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductListForm from '@/components/product/ProductListForm.vue'

const productModule = 'productModule'

export default {
    components: {
        ProductListForm
    },
    computed: {
        ...mapState(productModule, ['products']),
    },
    methods: {
        ...mapActions(productModule, ['requestProductListToSpring']),
    },
    mounted() {
        this.requestProductListToSpring()
    },
}
</script>

<style lang="">
    
</style>