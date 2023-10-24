<template lang="">
    <div>
        <normal-member-profile-register-form @submit="onSubmit"/>
    </div>
</template>

<script>
import NormalMemberProfileRegisterForm from '@/components/member/normal/NormalMemberProfileRegisterForm.vue'
import { mapActions } from 'vuex';

const memberModule = 'memberModule'

export default {
    components: {
        NormalMemberProfileRegisterForm
    },
    methods: {
        ...mapActions(memberModule, ['requestRegisterProfileToSpring']),
        async onSubmit (payload) {
            const { name, contactNumber, nickName, birthday } = payload
            await this.requestRegisterProfileToSpring({ name, contactNumber, nickName, birthday })
        },
    }
}
</script>

<style lang="">
    
</style>