import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/pages/LoginPage.vue')
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: () => import('@/pages/PostsPage.vue')
  },
  {
    path: '/posts/:id',
    name: 'PostPage',
    component: () => import('@/pages/PostPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
