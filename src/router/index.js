import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Counter from '../components/Counter.vue'
import Default from '../layouts/Default.vue'

const requestValidated = true
const isCategory = false

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'home',
          redirect: {name: 'home'}
        },
      ],
      meta: {
        layout: Default
      }
    },
    {
      path: '/about',
      name: 'about-parent',
      component: About,
      children: [
        { // affiche About & Counter
          path: '',
          name: 'about2',
          component: Counter,
        },
      ],
      meta: {
        layout: Default
      }
    },
    {
      path: '/params/id=:id',
      name: 'params',
      component: () => import('../views/Params.vue'),
      props: true, // will receive id as a props
      meta: {
        layout: Default
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue'),
      props: route => ({query: route.query.category}), // will pass { query: 'classique'} as props with 'classique' as value
      meta: {
        layout: Default
      }
    },
    {
      path: '/redirection/from=:from&msg=:msg',
      name: 'redirection',
      component: () => import('../views/Redirection.vue'),
      props: true, // params is passed as props here and accessible from the component by using defineProps()
      meta: {
        layout: Default
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/Details.vue'),
      beforeEnter: (to, from, next) => {
        if (to.params.id === "5" || to.params.id === "9") {
          next()
        } else {
          next( { name: "redirection", params: { from: to.name || '', msg: "Seule la fiche details/5 est accessible"} })
        }
      },
      meta: {
        layout: Default
      }
    },
    {
      path: '/details',
      redirect: {name: "home" },
      meta: {
        layout: Default
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      beforeEnter: (to, from, next) => {
        if (to.meta.isAuthenticated === false) {
          next({ name: 'home' })
        } else {
          next()
        }
      },
      // only authenticated users can access Dashboard
      meta: { 
        isAuthenticated: requestValidated,
        layout: Default
      }
    },
    { // Routes' Matching Syntax
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      
    },
  ]
})

//Navigation Guards
// router.beforeEach((to, from, next) => {
//   // redirect to home if isn't authentificated
//   if (to.name === "posts" && to.meta.isAuthenticated === false) {
//     next({ name: 'home' })
//   }
//   else next()
// })
// check for router.beforeResolve(to, from, next) => {}) for more

export default router
