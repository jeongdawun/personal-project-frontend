import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductListPage from '@/views/product/ProductListPage.vue'
import ProductReadPage from '@/views/product/ProductReadPage.vue'
import ProductListByCategoryPage from '@/views/product/ProductListByCategoryPage.vue'
import ProductRegisterPage from '@/views/product/ProductRegisterPage.vue'

Vue.use(VueRouter)

const productRoutes = [
  {
    path: '/list',
    name: 'ProductListPage',
    component: ProductListPage
  },
  {
    path: '/product/:id',
    name: 'ProductReadPage',
    components: {
      default: ProductReadPage,
    },
    props: {
      default: true,
    },
  },
  {
    path: '/register',
    name: 'ProductRegisterPage',
    component: ProductRegisterPage
  },
  {
    path: '/list/:category',
    name: 'ProductListByCategoryPage',
    component: ProductListByCategoryPage,
    props: true,
  },
]

export default productRoutes
