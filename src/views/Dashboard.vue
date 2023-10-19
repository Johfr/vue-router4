<script setup>
import { ref } from 'vue'
const showCode = ref(false)
</script>

<template>
  <div class="page">
    <h1>Page Dashboard</h1>
    <p>Accès autorisé car meta.isAuthenticated vaut true</p>
    <p>Navigation guards :</p>
    <code>
      <pre>
        // router/index.js
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
            isAuthenticated: true,
            layout: Default
          }
        },
      </pre>
    </code>
    <p>Equivalent à : <button v-show="!showCode" @click="showCode = true">...</button></p>
    <code v-if="showCode">
      <pre>
        // router/index.js
        router.beforeEach((to, from, next) => {
          // redirect to home if isn't authentificated
          if (to.name === "Dashboard" && to.meta.isAuthenticated === false) {
            next({ name: 'home' })
          }
          else next()
        })
      </pre>
    </code>
  </div>
</template>

<style scoped>
</style>
