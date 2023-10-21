<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from "vue-router"
const router = useRouter()

// on button click : show or hide code.
const showCode = ref(false)

onBeforeRouteUpdate(async (to, from) => {
  console.log('route update', typeof to.params.id);
  if (to.params.id != "5" && to.params.id != "9") {
    router.replace({
      name: "redirection",
      params: { from: 'details/' + to.params.id, msg: "seule la fiche details/5 est accessible "}
    })
  }
})
</script>

<template>
  <div class="page">
    <h1>Page Details</h1>
    <router-link to="/details/4">Aller vers detail 4</router-link>
    <router-link to="/details/9">Aller vers detail 9</router-link>
    <div>
      Params : {{ $route.params.id }}
    </div>
    
    <button v-if="!showCode" @click="showCode = true">Show Code</button>

    <div v-if="showCode">
      <code>
        <pre>
          // router/index.js
          {
            path: '/details/:id',
            name: 'details',
            component: () => import('../views/Details.vue'),
            beforeEnter: (to, from, next) => {
              if (to.params.id === "5" || to.params.id === "9") {
                next()
              } else {
                next({
                  name: "redirection", params: { from: to.name || '',
                  msg: "Seule la fiche details/5 est accessible"}
                })
              }
            },
            meta: {
              layout: Default
            }
          },
        </pre>
      </code>
      <code v-if="$route.params.id === '9'">
        <pre>
          // pages/Details.vue
          import { onBeforeRouteUpdate, useRouter } from "vue-router"
          const router = useRouter()

          onBeforeRouteUpdate(async (to, from) => {
            console.log('route update');
            if (to.params.id != "5" && to.params.id != "9") {
              router.replace({
                name: "redirection",
                params: { from: 'details/' + to.params.id, msg: "seule la fiche details/5 est accessible "}
              })
            }
          })
        </pre>
      </code>
      <code v-else>
        <pre>
          // pages/Details.vue
          &#60;script setup&#62;
          &#60;/script&#62;

          &#60;template&#62;
            &#60;p&#62; Params : &#123;&#123; $route.params.id &#125;&#125; &#60;/p&#62;
          &#60;/template&#62;
        </pre>
      </code>
    </div>

    <section>
        <h3>Meta & beforeEnter</h3>
        <ul>
          <li>
            <span class="bold">meta</span> : est utile pour les autorisations statiques qui ne changent pas fréquemment.
          </li>
          <li>
            <span class="bold">beforeEnter</span> : est utile pour les autorisations plus dynamiques ou complexes qui nécessitent des vérifications à la volée.
          </li>
        </ul>
      </section>
  </div>
</template>

<style scoped>
</style>
