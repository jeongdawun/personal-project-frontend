import Vue from 'vue'
import Vuex from 'vuex'
import memberModule from '@/store/member/MemberModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memberModule: memberModule,
  },
})

export default store