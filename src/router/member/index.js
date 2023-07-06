import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberLoginPage from '@/views/member/MemberLoginPage.vue'
import NormalMemberSignupPage from '@/views/member/NormalMemberSignupPage.vue'

Vue.use(VueRouter)

const memberRoutes = [
  {
    path: '/login',
    name: 'MemberLoginPage',
    component: MemberLoginPage
  },
  {
    path: '/signup',
    name: 'NormalMemberSignupPage',
    component: NormalMemberSignupPage
  },
]

export default memberRoutes
