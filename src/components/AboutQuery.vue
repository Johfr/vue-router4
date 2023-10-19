<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  query: String
})

const router = useRouter()
const queryIt = () => {
  router.replace({ path: '/about/query',  query: { q: 'ceci est un query' } })
}
</script>

<template>
  <div>
    <h2>
      /about/query
      <span v-show="props.query">
        ?q={{ props.query }}
      </span>
    </h2>

    <button @click="$router.replace({ path: '/about/query',  query: { q: 'ceci est un query' } })">Add query</button>

    <div v-if="props.query">
      <p> Query Props : {{ props }}</p>
      <code>
        <pre>
          // router/index.js
          {
            path: '/about',
            name: 'about-parent',
            component: About,
            children: [
              { // query
                path: 'query',
                name: 'about3',
                component: () => import('../components/AboutQuery.vue'),
                props: route => ({ query: route.query.q }), // will pass { query: 'lorem ipsum'} as props
              },
            ]
          },
        </pre>
      </code>

      <code>
        <pre>
          // components/AboutQuery.vue
          &#60;script setup&#62;
            // components/AboutQuery.vue
            import { defineProps } from 'vue'

            const props = defineProps({
              query: String
            })
          &#60;/script&#62;

          &#60;template&#62;
            &#60;p&#62; Props : { "query": "ceci est un query" } &#60;/p&#62;
          &#60;/template&#62;
        </pre>
      </code>
    </div>
  </div>
</template>

<style scoped>
</style>
