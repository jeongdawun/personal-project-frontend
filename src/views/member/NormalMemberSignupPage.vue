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
        ...mapActions(memberModule, ['requestLoginMemberToSpring']),
        async onSubmit (payload) {
            const { email, password } = payload
            await this.requestLoginMemberToSpring({ email, password })
        },
    }
}
</script>

<style lang="">
    
</style>