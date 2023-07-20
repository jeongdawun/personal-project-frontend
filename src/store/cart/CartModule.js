import Vue from 'vue'
import Vuex from 'vuex'

import actions from "@/store/cart/actions.js"
import mutations from "@/store/cart/mutations"
import state from "@/store/cart/states"

Vue.use(Vuex)

const cartModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default cartModule