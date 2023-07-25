<template lang="">
    <div class="reservationDetail">
        <my-reservation-detail-form :reservation="reservation"/>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MyReservationDetailForm from '@/components/reservation/MyReservationDetailForm.vue'

const reservationModule = 'reservationModule'

export default {
    name: "MyReservationDetailPage",
        props: {
            id: {
                type: Number,
                required: true,
        },
    },
    components: {
        MyReservationDetailForm
    },
    computed: {
        ...mapState(reservationModule, ['reservation']),
    },
    methods: {
        ...mapActions(reservationModule, ['requestReservationDatailToSpring']),
    },
    mounted() {
        this.requestReservationDatailToSpring(this.id)
    },
}
</script>

<style scoped>
.reservationList {
    padding-top: 120px;
    width: 80%;
    margin: auto;
}
</style>