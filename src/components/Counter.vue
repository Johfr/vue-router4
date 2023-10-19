<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div>
    <h2>Composant Enfant : Counter</h2>
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>Cette page affiche le composant <code>Counter</code> dont l'affichage est conditionné par le router :</p>
    <code>
      <pre>
        // router/indes.js
        {
          path: '/about',
          name: 'about-parent',
          component: About,
          children: [
            { // affiche About & Counter
              path: '',
              name: 'about2',
              component: Counter,
            },
          ]
        },
      </pre>
    </code>
    <p>Pour se faire le composant parent <code>About</code> prend <code>router-view</code> qui fonctionne comme un slot.</p>

    <code>
      <pre>
        // pages/About.vue
        &#60;template&#62;
          &#60;div&#62;
            &#60;Navigation /&#62;
            &#60;h1&#62;Page About&#60;/h1&#62;
            &#60;!-- if absent, the child component will not be displayed --&#62;
            &#60;router-view&#62;&#60;/router-view&#62;
          &#60;/div&#62;
        &#60;/template&#62;
      </pre>
    </code>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
