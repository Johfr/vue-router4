<script setup>
import { ref, computed, defineProps } from 'vue'
import { useRoute } from "vue-router"

// using props in the router is the same as use router.params
const props = defineProps({
  query: String,
})


let showCode = ref(false)

</script>

<template>
  <div class="page">
    <h1>Page Redirection</h1>
    <div class="d-flex">
      <p>
        Tu as été redirigé depuis la page :
      </p>
      
      <router-link :to="props.query">{{ props.query }}</router-link>
    </div>
    
    <code>
      <pre>
        // views/Redirection.js
        
        &#60;template&#62;
          &#60;p&#62;
            Tu as été redirigé depuis la page :
          &#60;/p&#62;
          
          &#60;router-link :to="props.query"&#62;
            &#123;&#123; props.query &#125;&#125;
          &#60;/router-link&#62;
        &#60;/template&#62;
          </pre>
          <pre>
        // router/index.js
        {
          path: '/redirection',
          name: 'redirection',
          component: () => import('../views/Redirection.vue'),
          props: route => ({ query: route.query.redirect }),
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
