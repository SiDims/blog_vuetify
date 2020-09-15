import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/Post.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Dashboard')
  },
  {
    path: '/dashboard/create',
    name: 'new_post',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/NewPost')
  },
  {
    path: '/dashboard/media',
    name: 'media',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Media')
  },
  {
    path: '/dashboard/edit/:id',
    name: 'edit',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/NewPost')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const pages = ['/login', '/registration'];
  const requireAuth = to.matched.some(record => record.meta.auth)
  const isAuth = store.getters.isAuth

  if (requireAuth && !isAuth) {
    return next('/login');
  }

  if (pages.includes(to.path) && isAuth) {
    return next('/dashboard');
  }

  next();
})

export default router