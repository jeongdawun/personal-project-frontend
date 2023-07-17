import Vue from 'vue'
import VueRouter from 'vue-router'

import MemberLoginPage from '@/views/member/MemberLoginPage.vue'
import NormalMemberSignupPage from '@/views/member/NormalMemberSignupPage.vue'
import BusinessMemberSignupPage from '@/views/member/BusinessMemberSignupPage.vue'
import MemberMyPage from '@/views/member/MemberMyPage.vue'
import NormalMemberProfileRegisterPage from '@/views/member/NormalMemberProfileRegisterPage.vue'
import BusinessMemberSellerInfoRegisterPage from '@/views/member/BusinessMemberSellerInfoRegisterPage.vue'
import MyReservationPage from '@/views/reservation/MyReservationPage.vue'

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
    path: '/order',
    name: 'MyReservationPage',
    component: MyReservationPage,
  },
]

export default memberRoutes
