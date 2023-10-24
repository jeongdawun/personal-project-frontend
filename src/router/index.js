import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import memberRoutes from './member'
import productRoutes from './product'
import reservationRoutes from './reservation'
import cartRoutes from './cart'
import MemberModule from '../store/member/MemberModule'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  ...memberRoutes,
  ...productRoutes,
  ...reservationRoutes,
  ...cartRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true';
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requireBusinessRole = to.matched.some(record => record.meta.requireBusinessRole);
  let checkRoleOfMember;

  if(isAuthenticated) {
    checkRoleOfMember = await MemberModule.actions.requestCheckRoleToSpring();
  }
  const checkRole = checkRoleOfMember === '[BUSINESS]'

  if (requiresAuth && !isAuthenticated) {
    alert("로그인이 필요합니다.")
    next('/login'); // 로그인 페이지로 리디렉션합니다.
  } else if (requireBusinessRole && !checkRole) {
    alert("접근 권한이 없습니다.")
    next('/');
  } else {
    next();
  }
});

export default router
