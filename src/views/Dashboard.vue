<script setup>
import { ref } from 'vue'
const showCode = ref(false)
</script>

<template>
  <div class="page">
    <h1>Page Dashboard</h1>
    <p>Accès autorisé car meta.authRequired vaut true</p>
    <p>Navigation guards :</p>
    <code>
      <pre> // router/index.js
        import { computed } from 'vue'
        import { useAuthentification } from "../store/useAuthentification.js"
        
        {
          {...},
          beforeEnter: (to, from, next) => {
            // STORE
            const authStore = useAuthentification()
            const isAuth = computed(() => authStore.auth)
            // END STORE

            if (to.meta.authRequired && !isAuth.value) {
              next({ name: 'access-refused', query: { redirect: to.fullPath }, })
            } else {
              next()
            }
          },
          meta: { 
            authRequired: true,
          }
        },
      </pre>
    </code>
    <p>Equivalent à : <button v-show="!showCode" @click="showCode = true">...</button></p>
    <code v-if="showCode">
      <pre> // router/index.js
        router.beforeEach((to, from, next) => {
          // STORE
          const authStore = useAuthentification()
          const isAuth = computed(() => authStore.auth)
          // END STORE

          if (to.meta.authRequired && !isAuth.value) {
            next({ name: 'access-refused' })
          } else {
            next()
          }
        })
      </pre>
    </code>
  </div>
</template>

<style scoped>
</style>
