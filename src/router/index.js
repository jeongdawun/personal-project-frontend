import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import memberRoutes from './member'
import productRoutes from './product'
import reservationRoutes from './reservation'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...memberRoutes,
  ...productRoutes,
  ...reservationRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true';
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // 로그인 페이지로 리디렉션합니다.
  } else {
    next();
  }
});

export default router
