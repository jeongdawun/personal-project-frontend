<template lang="">
    <div class="reservationList">
        <my-reservation-list-form :reservations="reservations"/>
    </div>

</template>
<script>
import { mapActions, mapState } from 'vuex';
import MyReservationListForm from '@/components/reservation/MyReservationListForm.vue'

const reservationModule = 'reservationModule'

export default {
    components: {
        MyReservationListForm
    },
    computed: {
        ...mapState(reservationModule, ['reservations']),
    },
    methods: {
        ...mapActions(reservationModule, ['requestReservationListToSpring']),
    },
    mounted() {
        this.requestReservationListToSpring()
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