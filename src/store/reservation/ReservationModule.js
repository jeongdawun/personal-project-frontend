import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/reservation/actions.js"
import mutations from "@/store/reservation/mutations"
import state from "@/store/reservation/states"

Vue.use(Vuex)

const ReservationModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default ReservationModule