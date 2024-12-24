import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';  // Sua página home
import LoginView from '../views/LoginView.vue'; // Sua página de login
import SignupForm from '@/views/SignupForm.vue';

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/signup',
    name: 'SignuoForm',
    component: SignupForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
