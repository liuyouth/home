import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import App from '../App.vue'
import ImageGallery from '../components/ImageGallery.vue'

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/whiteboard',
    component: App
  },
  {
    path: '/gallery',
    component: ImageGallery
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 