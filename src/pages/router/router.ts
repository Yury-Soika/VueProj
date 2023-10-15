import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: defineAsyncComponent(() => import('@/pages/MainPage.vue'))
  },
  {
    path: '/posts',
    name: 'PostsPage',
    component: defineAsyncComponent(() => import('@/pages/PostsPage.vue'))
  },
  {
    path: '/posts/:id',
    name: 'PostPage',
    component: defineAsyncComponent(() => import('@/pages/PostPage.vue'))
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
