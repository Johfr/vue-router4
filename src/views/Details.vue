<script setup>
import { onBeforeRouteUpdate, useRouter } from "vue-router"
const router = useRouter()

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
</template>

<style scoped>
</style>
