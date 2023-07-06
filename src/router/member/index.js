import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberLoginPage from '@/views/member/MemberLoginPage.vue'
import NormalMemberSignupPage from '@/views/member/NormalMemberSignupPage.vue'
import BusinessMemberSignupPage from '@/views/member/BusinessMemberSignupPage.vue'
import MemberMyPage from '@/views/member/MemberMyPage.vue'

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
  {
    path: '/signup-business',
    name: 'BusinessMemberSignupPage',
    component: BusinessMemberSignupPage
  },
  {
    path: '/myPage',
    name: 'MemberMyPage',
    component: MemberMyPage
  },
]

export default memberRoutes
