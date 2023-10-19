<script setup>
</script>

<template>
  <div class="page">
    <h2>Page 404 Not found</h2>
    <code>
      <pre>
       // router/index.js
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue')
        },
      </pre>
    </code>
  </div>
</template>

<style scoped>
</style>
