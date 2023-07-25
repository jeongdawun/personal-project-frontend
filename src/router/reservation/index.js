import Vue from 'vue'
import VueRouter from 'vue-router'

import CreateReservationPage from '@/views/reservation/CreateReservationPage.vue'
import MyReservationListPage from '@/views/reservation/MyReservationListPage.vue'
import MyReservationDetailPage from '@/views/reservation/MyReservationDetailPage.vue'

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
  {
    path: '/myReservationDetail/:id',
    name: 'MyReservationDetailPage',
    components: {
      default: MyReservationDetailPage,
    },
    props: {
      default: true,
    },
    meta: { requiresAuth: true }
  },
]

export default reservationRoutes
