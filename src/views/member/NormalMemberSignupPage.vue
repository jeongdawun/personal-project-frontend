<template lang="">
    <div>
        <normal-member-signup-form @submit="onSubmit"/>
    </div>
</template>

<script>
import NormalMemberSignupForm from '@/components/member/NormalMemberSignupForm.vue'
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    components: {
        NormalMemberSignupForm
    },
    methods: {
        ...mapActions(memberModule, ['requestNormalMemberSignupToSpring']),
        async onSubmit (payload) {
            const { email, password, roleType } = payload
            await this.requestNormalMemberSignupToSpring({ email, password, roleType })
        },
    }
}
</script>

<style lang="">
    
</style>