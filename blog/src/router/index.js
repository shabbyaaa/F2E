import { createRouter, createWebHashHistory } from 'vue-router'
import Index from 'pages/index.vue'
import Login from 'pages/login.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router