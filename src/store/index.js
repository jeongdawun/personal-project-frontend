import Vue from 'vue'
import Vuex from 'vuex'
import memberModule from '@/store/member/MemberModule'
import productModule from '@/store/product/ProductModule'
import reservationModule from '@/store/reservation/ReservationModule'
import cartModule from '@/store/cart/CartModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memberModule: memberModule,
    productModule: productModule,
    reservationModule: reservationModule,
    cartModule: cartModule
  },
})

export default store