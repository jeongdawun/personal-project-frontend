import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberLoginPage from '@/views/member/MemberLoginPage.vue'

Vue.use(VueRouter)

const memberRoutes = [
  {
    path: '/login',
    name: 'MemberLoginPage',
    component: MemberLoginPage
  },
]

export default memberRoutes
