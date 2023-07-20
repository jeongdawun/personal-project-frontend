import Vue from 'vue'
import VueRouter from 'vue-router'

import MyCartListPage from '@/views/cart/MyCartListPage.vue'

Vue.use(VueRouter)

const cartRoutes = [
  {
    path: '/myCart',
    name: 'MyCartListPage',
    component: MyCartListPage,
    meta: { requiresAuth: true }
  },
]

export default cartRoutes
