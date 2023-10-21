<script setup>
import { ref } from 'vue'
// on button click : show or hide code.
const showCode = ref(false)
</script>

<template>
  <div class="page">
    <h1>Accès non autorisé</h1>
    <button v-if="!showCode" @click="showCode = true">Show Code</button>

    <code v-if="showCode">
      <pre> // router/index.js

      //Navigation Guards
      router.beforeEach((to, from, next) => {
        // STORE
        const authStore = useAuthentification()
        const roles = computed(() => authStore.roles)
        // END STORE
        
        // redirect to home if isn't authentificated
        if (to.meta.authRequired && !authStore.auth) {
          next({ name: 'access-refused' }) // Redirigez vers la page de connexion, par exemple
        } else if (to.meta.roleRequired && !roles.value.includes(to.meta.roleRequired)) {
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
