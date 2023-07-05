<template lang="">
    <div>
        <member-login-form @submit="onSubmit"/>
    </div>
</template>

<script>
import MemberLoginForm from '@/components/member/MemberLoginForm.vue'
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    components: {
        MemberLoginForm
    },
    methods: {
        ...mapActions(memberModule, ['requestLoginMemberToSpring']),
        async onSubmit (payload) {
            const { email, password } = payload
            await this.requestLoginAccountToSpring({ email, password })
        },
    }
}
</script>

<style lang="">
    
</style>