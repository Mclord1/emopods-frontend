import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Admin/Auth/Login.vue'
import MasterLayout from '@/views/Layout/MasterLayout.vue'
import NoBgLayout from '@/views/Layout/NoBgLayout.vue'
import AuthLayout from '@/views/Layout/AuthLayout.vue'
import { useLoadingStore } from '@/store/loading';
import { useAuthStore } from '@/store/authStore';
import Dashboard from '@/views/Admin/Dashboard/Home.vue'
import ListUsers from '@/views/Admin/Users/ListUsers.vue'
import ShowUser from '@/views/Admin/Users/ShowUser.vue'
import ListCustomers from '@/views/Admin/Customers/ListCustomers.vue'
import PendingVerification from '@/views/Admin/Customers/PendingVerification.vue'

const routes = [
  {
    path: '/',
    name: 'NoBgLayout',
    component: NoBgLayout,
    children: [
      {
        path: '',
        name: 'MasterLayout',
        component: MasterLayout,
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
          },
          {
            path: 'admin-users',
            name: 'ListUsers',
            component: ListUsers,
          },
          {
            path: 'admin-users/:id',
            name: 'ShowUser',
            component: ShowUser,
          },
          {
            path: 'customers',
            name: 'ListCustomers',
            component: ListCustomers,
          },
          {
            path: 'pending-verification',
            name: 'PendingVerification',
            component: PendingVerification,
          }
        ]
      },
      {
        path: 'auth',
        name: 'AuthLayout',
        component: AuthLayout,
        meta: { requiresGuest: true },
        children: [
          {
            path: 'login',
            name: 'Login',
            component: Login,
          }
        ]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const loadingStore = useLoadingStore();
  const authStore = useAuthStore();

  // Start the loading indicator
  loadingStore.setLoading(true);

  try {
    // Check authentication status
    await authStore.checkAuthentication();

    // Get the token from cookie or localStorage
    const token = document.cookie.split(';').find(c => c.trim().startsWith('accessToken='))

    // Check if route requires authentication
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    // Check if route requires guest access (non-authenticated)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

    // If we have a token but auth state says not authenticated, try to restore session
    if (token && !authStore.isAuthenticated) {
      const tokenValue = token.split('=')[1];
      authStore.setAccessToken(tokenValue);
      await authStore.checkAuthentication();
    }

    if (requiresAuth && !authStore.isAuthenticated) {
      // If route requires auth and user is not authenticated, redirect to login
      next('/auth/login')
      return
    }

    if (requiresGuest && authStore.isAuthenticated) {
      // If route is for guests only and user is authenticated, redirect to dashboard
      next('/')
      return
    }

    // If none of the above conditions are met, proceed normally
    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    next('/auth/login')
  } finally {
    loadingStore.setLoading(false)
  }
});

router.afterEach(() => {
  const loadingStore = useLoadingStore()
  loadingStore.setLoading(false);
});

export default router
