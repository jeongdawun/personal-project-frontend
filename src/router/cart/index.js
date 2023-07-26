import Vue from 'vue'
import VueRouter from 'vue-router'

import MyCartListPage from '@/views/cart/MyCartListPage.vue'
import ComparePageWithTags from '@/views/cart/ComparePageWithTags.vue'

Vue.use(VueRouter)

const cartRoutes = [
  {
    path: '/mycart',
    name: 'MyCartListPage',
    component: MyCartListPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/compare-products-by-tags',
    name: 'ComparePageWithTags',
    component: ComparePageWithTags,
    meta: { requiresAuth: true }
  },
]

export default cartRoutes
