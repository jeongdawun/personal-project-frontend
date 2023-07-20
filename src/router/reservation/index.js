import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateReservationPage from '@/views/reservation/CreateReservationPage.vue'
import MyReservationListPage from '@/views/reservation/MyReservationListPage.vue'

Vue.use(VueRouter)

const reservationRoutes = [
  {
    path: '/reservation',
    name: 'CreateReservationPage',
    component: CreateReservationPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/myReservation',
    name: 'MyReservationListPage',
    component: MyReservationListPage,
    meta: { requiresAuth: true }
  },
]

export default reservationRoutes
