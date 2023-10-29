import MainPage from '../pages/MainPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
