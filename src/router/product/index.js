import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductListPage from '@/views/product/ProductListPage.vue'
import ProductReadPage from '@/views/product/ProductReadPage.vue'

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
]

export default productRoutes
