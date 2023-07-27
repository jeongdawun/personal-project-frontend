import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberLoginPage from '@/views/member/MemberLoginPage.vue'
import MemberMyPage from '@/views/member/MemberMyPage.vue'
import MemberWithdrawalPage from '@/views/member/MemberWithdrawalPage.vue'

import NormalMemberSignupPage from '@/views/member/normal/NormalMemberSignupPage.vue'
import NormalMemberProfileRegisterPage from '@/views/member/normal/NormalMemberProfileRegisterPage.vue'

import BusinessMemberSignupPage from '@/views/member/business/BusinessMemberSignupPage.vue'
import BusinessMemberSellerInfoRegisterPage from '@/views/member/business/BusinessMemberSellerInfoRegisterPage.vue'

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
    component: MemberMyPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/myProfilePage',
    name: 'NormalMemberProfileRegisterPage',
    component: NormalMemberProfileRegisterPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/sellerInfoPage',
    name: 'BusinessMemberSellerInfoRegisterPage',
    component: BusinessMemberSellerInfoRegisterPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/withdrawal',
    name: 'MemberWithdrawalPage',
    component: MemberWithdrawalPage,
    meta: { requiresAuth: true }
  },
]

export default memberRoutes
