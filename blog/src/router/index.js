import { createRouter, createWebHashHistory } from 'vue-router'
import Index from 'pages/index.vue'
import About from 'pages/about.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router