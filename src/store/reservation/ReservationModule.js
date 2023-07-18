import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/reservation/actions.js"

Vue.use(Vuex)

const ReservationModule = {
    namespaced: true,
    actions,
}

export default ReservationModule