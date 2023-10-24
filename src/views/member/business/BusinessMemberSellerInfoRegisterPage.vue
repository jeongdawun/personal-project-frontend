<template lang="">
    <div>
        <business-member-seller-info-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import BusinessMemberSellerInfoRegisterForm from '@/components/member/business/BusinessMemberSellerInfoRegisterForm.vue'
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    components: {
        BusinessMemberSellerInfoRegisterForm
    },
    methods: {
        ...mapActions(memberModule, ['requestRegisterSellerInfoToSpring']),
        async onSubmit (payload) {
            const { city, street, addressDetail, zipcode, contactNumber, bank, accountNumber } = payload
            await this.requestRegisterSellerInfoToSpring({ city, street, addressDetail, zipcode, contactNumber, bank, accountNumber })
        },
    }
}
</script>

<style lang="">
    
</style>