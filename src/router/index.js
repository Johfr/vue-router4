import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Counter from '../components/Counter.vue'
import Default from '../layouts/Default.vue'
import { computed } from 'vue'
import { useAuthentification } from "../store/useAuthentification.js"

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
      path: '/params/:id',
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
      // will pass { params: plantes, query: 'classique'} as props
      props: route => ({params: route.params.productName, query: route.query.category}), 
      children: [
        {
          path: ':productName',
          name: 'product-name',
          component: () => import('../views/Products.vue'),
        },
      ],
      meta: {
        layout: Default
      }
    },
    {
      path: '/redirection',
      name: 'redirection',
      component: () => import('../views/Redirection.vue'),
      props: route => ({ query: route.query.redirect }),
      meta: {
        layout: Default
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/Details.vue'),
      beforeEnter: (to, from, next) => {
        if (to.params.id === "5") {
          next()
        } else {
          next( { name: "redirection", query: { redirect: '/' + to.name + '/' + to.params.id } })
        }
      },
      meta: {
        layout: Default
      }
    },
    {
      path: '/details',
      redirect: {name: "home" },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      // only authenticated users can access Dashboard
      meta: {
        authRequired: true,
        layout: Default
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: {
        roleRequired: ['admin', 'super-admin'],
        layout: Default
      }
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('../views/Summary.vue'),
      meta: {
        layout: Default
      }
    },
    {
      path: '/access-refused',
      name: 'access-refused',
      component: () => import('../views/AccessRefused.vue'),
      meta: {
        layout: Default
      }
    },
    { // 404 notFound - Routes' Matching Syntax
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      
    },
  ]
})

//Navigation Guards
router.beforeEach((to, from, next) => {
  // STORE
  const authStore = useAuthentification()
  const roles = computed(() => authStore.roles)
  // END STORE
  
  // redirect to home if isn't authentificated
  if (to.meta.authRequired && !authStore.auth) {
    next({ name: 'access-refused', query: { redirect: to.name }, }) // Redirigez vers la page de connexion, par exemple
  } else if (to.meta.roleRequired && !roles.value.some(role => to.meta.roleRequired.includes(role))) {
    next({ name: 'access-refused', query: { redirect: to.name }, })
  } else {
    next()
  }
})
// check for router.beforeResolve(to, from, next) => {}) for more

export default router
