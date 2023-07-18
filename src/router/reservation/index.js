import Vue from 'vue'
import VueRouter from 'vue-router'

import MyReservationPage from '@/views/reservation/MyReservationPage.vue'

Vue.use(VueRouter)

const reservationRoutes = [
  {
    path: '/reservation',
    name: 'MyReservationPage',
    component: MyReservationPage,
    meta: { requiresAuth: true }
  },
]

export default reservationRoutes
