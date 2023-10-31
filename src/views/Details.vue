<script setup>
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRouter } from "vue-router"
const router = useRouter()

// on button click : show or hide code.
const showCode = ref(false)
const showMore = ref(false)

onBeforeRouteUpdate(async (to, from) => {
  console.log('route update');
  if (to.params.id != "5") {
    router.replace({
      name: "redirection",
      query: { redirect: '/' + to.name + '/' + to.params.id }
    })
  }
})
</script>

<template>
  <div class="page">
    <h1>Page Details</h1>
      <router-link to="/details/4">Aller vers detail 4</router-link>
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
              if (to.params.id === "5") {
                next()
              } else {
                next(
                  {
                    name: "redirection",
                    query: { redirect: to.name }
                  }
                )
              }
            },
            meta: {
              layout: Default
            }
          },
        </pre>
      </code>
    
      <button v-if="!showMore" @click="showMore = true">Identique à ...</button>

      <code v-if="showMore">
        <pre>
          &#60;script setup&#62;
            // pages/Details.vue
            import { onBeforeRouteUpdate, useRouter } from "vue-router"
            // import { onBeforeRouteLeave, useRoute } from "vue-router"
            const router = useRouter()

            onBeforeRouteUpdate(async (to, from) => {
              console.log('route update');
              if (to.params.id != "5") {
                router.replace({
                  name: "redirection",
                  query: { redirect: '/' + to.name + '/' + to.params.id }
                })
              }
            })
          &#60;/script&#62;
        </pre>
      </code>
    </div>
  </div>
</template>

<style scoped>
</style>
