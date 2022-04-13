import { createRouter, createWebHistory } from 'vue-router'
import CryptoCurrency from '../views/CryptoCurrency.vue'
import Currency from '../views/Currency.vue'

const routes = [
  {
    path: '/',
    name: 'currency',
    component: Currency
  },
  {
    path: '/crypt',
    name: 'crypt',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CryptoCurrency
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
