import { createRouter, createWebHashHistory } from 'vue-router'
import WelcomeView from '../components/WelcomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    redirect: '/welcome',
    },
    {
    path: '/welcome',
    component: WelcomeView,
    }
  ],
})

export default router