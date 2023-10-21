<script setup>
</script>

<template>
  <div class="page">
    <h1>Page Admin</h1>
    <p>
      Accès autorisé pour les admins
    </p>
    <code>
      <pre>
       // router/index.js
        routes: [
          {
            {...},
            beforeEnter: ((to, from, next) => {
              // STORE
              const authStore = useAuthentification()
              const roles = computed(() => authStore.roles)
              // END STORE
              if (
                to.meta.roleRequired
                && !roles.value.some(role => to.meta.roleRequired.includes(role))
              ) {
                next({ name: 'access-refused', query: { redirect: to.fullPath }, })
              } else {
                next()
              }
            }),
            meta: {
              roleRequired: ['admin', 'super-admin'],
              layout: Default
            }
          },
        ]
      </pre>
    </code>

    <section>
        <h3>Meta & beforeEnter</h3>
        <ul>
          <li>
            <span class="bold">meta</span> : est utile pour les autorisations statiques qui ne changent pas fréquemment.
          </li>
          <li>
            <span class="bold">beforeEnter</span> : est utile pour une route spécifique.
          </li>
          <li>
            <span class="bold">beforeEach</span> : est globale, il est exécuté pour chaque route.
          </li>
        </ul>
      </section>
  </div>
</template>

<style scoped>
</style>
