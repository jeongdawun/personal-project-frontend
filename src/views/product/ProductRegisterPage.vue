<template lang="">
    <div>
        <product-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import ProductRegisterForm from '@/components/product/ProductRegisterForm.vue';
import { mapActions } from 'vuex';

const productModule = 'productModule'

export default {
    components: {
        ProductRegisterForm
    },
    methods: {
        ...mapActions(
            productModule, ['requestRegisterProductToSpring']
        ),
        async onSubmit (payload) {
            await this.requestRegisterProductToSpring(payload)
        }
    }
}
</script>

<style lang="">
    
</style>