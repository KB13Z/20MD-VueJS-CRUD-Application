import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAPostView from '../views/CreateAPostView.vue'
import AboutView from '../views/AboutView.vue'
import OnePostView from '../views/OnePostView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-a-post',
      name: 'create-a-post',
      component: CreateAPostView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/fruit/:id',
      name: 'fruit',
      component: OnePostView
    }
  ]
})

export default router
