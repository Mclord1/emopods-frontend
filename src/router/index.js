import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Admin/Auth/Login.vue'
import MasterLayout from '@/views/MasterLayout.vue'
import HomeView from '@/views/Admin/Dashboard/HomeView'

const routes = [
  {
    path: '/',
    name: 'MasterLayout',
    component: MasterLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: '',
        name: 'HomeView',
        component: HomeView,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
