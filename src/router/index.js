import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/loginPage.vue'
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import WishlistPage from '../views/WishlistPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistPage,
      beforeEnter: (to,from) => {
        if(!localStorage.access_token){
          return {name: 'login'}
        }
      }
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    localStorage.access_token && (to.name == 'login' || to.name == 'register')
  ) {
    // redirect the user to the login page
    return { name: 'home' }
  }
})

export default router
