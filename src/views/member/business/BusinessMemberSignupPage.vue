<template lang="">
    <div>
        <business-member-signup-form @submit="onSubmit"/>
    </div>
</template>

<script>
import BusinessMemberSignupForm from '@/components/member/business/BusinessMemberSignupForm.vue'
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    components: {
        BusinessMemberSignupForm
    },
    methods: {
        ...mapActions(memberModule, ['requestBusinessMemberSignupToSpring']),
        async onSubmit (payload) {
            const { email, password, roleType, businessNumber, businessName } = payload
            await this.requestBusinessMemberSignupToSpring({ email, password, roleType, businessNumber, businessName })
        },
    }
}
</script>

<style lang="">
    
</style>