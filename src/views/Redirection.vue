<script setup>
import { ref, computed, defineProps } from 'vue'
import { useRoute } from "vue-router"

const route = useRoute()

// using props in the router is the same as use router.params
const props = defineProps({
  from: String,
  msg: String,
})

let msg = ref(route.params.msg)

const formattedMsg = computed(() => {
  const matches = msg.value.match(/details\/\d+/)
  if (matches) {
    const route = matches[0]
    const link = `<a href="/${route}">${route}</a>`
    return msg.value.replace(route, link)
  }
  return msg.value;
});

let showCode = ref(false)

</script>

<template>
  <div class="page">
    <h1>Page Redirection</h1>
    <p>
      Tu as été redirigé de
      <router-link v-if="$route.params.from != 'redirection'" :to="'/' + $route.params.from"> {{ $route.params.from }}</router-link>
      <router-link v-else :to="'/'"> {{ $route.params.from }}</router-link>
      à ici : {{ $route.name }}
    </p>
    
    <p>/redirection prend <code>from & msg</code> en paramètre dans <code>router/index.js</code> via la clé <code>params</code> </p>
    <p v-html="formattedMsg"></p>
    <p>
      props : {{ props }}
    </p>
    <button v-show="!showCode" @click="showCode = true">
      Show code
    </button>
    <code v-if="showCode">
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
              next( { name: "redirection", params: { from: to.name || '', msg: "Seule la fiche details/5 est accessible"} })
            }
          },
          meta: {
            layout: Default
          }
        },
      </pre>
    </code>
  </div>
</template>

<style scoped>
</style>
