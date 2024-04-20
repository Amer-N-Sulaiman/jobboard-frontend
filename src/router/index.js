import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Listings from '../views/Listings.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import AddJob from '../views/AddJob.vue'
import Account from '../views/Account.vue'
import Job from '../views/Job.vue'
import Developer from '@/views/Developer.vue'

const routes = [
  {
    path: '/',
    redirect: {name: 'Listings'}
    // name: 'Home',
    // component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/listings',
    name: 'Listings',
    component: Listings
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/addjob',
    name: 'addjob',
    component: AddJob
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/job/:job_id',
    name: 'job',
    component: Job
  },
  {
    path: '/developer',
    name: 'developer',
    component: Developer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
