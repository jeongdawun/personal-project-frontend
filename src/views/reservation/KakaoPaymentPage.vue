<template lang="">
    <div>
        <h2>결제가 완료되었습니다.</h2>
    </div>
</template>

<script>
import axiosInst from '@/utility/axiosInst'
export default {
    name: 'KakaoPaymentPage',
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("pg_token");
        const orderId = this.$route.params.orderId;
        const userId = this.$route.params.userId;
        
        this.afterPaymentSuccess(token, orderId, userId);
    },
    methods: {
        afterPaymentSuccess(token, orderId, userId) {
            const params = {pg_token: token};
            axiosInst.get(`/reservation/success/${orderId}/${userId}`, { params })
            .then((res) => {
                if (res.data != null) {
                console.log("결제 완료", res.data);
                } else {
                alert("결제 실패");
                }
            })
            .catch((error) => {
                console.error("결제 실패", error);
            });
        },
    },
}
</script>
<style scoped>
h2 {
    padding-top: 200px;
    font-size: 20px;
}
</style>