<script setup>
// refaire carbon code
</script>

<template>
  <div class="page">
    <h1>Page home</h1>
    <p>Home est également accessible via /home</p>

    <code>
      <pre>
       // router/index.js 
      {
        path: '/',
        name: 'home',
        component: Home,
        children: [
          {
            path: 'home',
            redirect: {name: 'home'}
          },
        ],
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
