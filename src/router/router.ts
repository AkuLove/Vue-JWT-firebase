import MainPage from '../pages/MainPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import SignIn from '../pages/SignIn.vue';
import CarsPage from '../pages/CarsPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
    meta: {
      auth: false,
    },
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    meta: {
      auth: false,
    },
  },
  {
    path: '/cars',
    name: 'cars',
    component: CarsPage,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.auth && !authStore.userInfo.token) {
    next('/signin');
  } else if (
    to.meta.auth !== undefined &&
    !to.meta.auth &&
    authStore.userInfo.token
  ) {
    next('/cars');
  } else {
    next();
  }
});

export default router;
