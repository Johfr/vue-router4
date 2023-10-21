<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const ids = [4, 5, 6, 9]
let history = ref([])

// live : is an exemple to explain how props works
console.log(route);

const DashboardMeta = ref()

const backInHistory = () => {
  history.value.pop()
}
const pushInHistory = (route) => {
  // create an historic of the navigation
  if (history.value.length > 0 && history.value.at(-1).path === route.path) {

  } else {
    history.value.push(
      {
        name: route.name,
        path: route.path,
      }
    )
  }
}
const forwardInHistory = () => {
  // history.value.splice(1, history.length)
}
// get the meta data from the route /Dashboard on created
router.getRoutes().forEach(route => {
  if (route.name === "Dashboard") {
    DashboardMeta.value = route.meta.isAuthenticated
  }
})

// used to change the value and to simulate the access to /Dashboard
const putAuthentificationToFalse = () => {
  router.getRoutes().forEach(route => {
    if (route.name === "Dashboard") {
      route.meta.isAuthenticated = !route.meta.isAuthenticated
      DashboardMeta.value = route.meta.isAuthenticated
    }
  })
  // redirige seulement si on est sur /Dashboard
  if (route.name === "Dashboard" && DashboardMeta.value === false) {
    router.push({ name: 'home' })
  }
}



</script>

<template>
  <div class="navigation">
    <aside class="history">
      <h2>Navigation history</h2>
      <ul>
        <li v-for="(route, routeId) in history" :key="route + routeId" :title="route.path">
            {{ route.path }}
        </li>
      </ul>
    </aside>
    <nav class="d-flex">
      <!-- // programmatic navigation -->
      <button @click="backInHistory(), $router.go(-1)">Go back</button>

      <RouterLink @click="pushInHistory({name: 'home', path: '/'})" to="/">home</RouterLink>
      <RouterLink @click="pushInHistory({name: 'About', path: '/about'})" to="/about">About</RouterLink>
      <RouterLink @click="pushInHistory({name: 'params', path: '/params/id=5'})" to="/params/id=5">Params</RouterLink>
      <RouterLink @click="pushInHistory({name: 'products', path: '/products'})" to="/products">Query</RouterLink>
      <div v-for="id in ids" :key="id">
        <!-- @click="checkId(id)" -->
        <RouterLink @click="pushInHistory({name: 'details', path: '/details/' + id})" :to="{path : '/details/' + id }">details {{ id }}</RouterLink>
      </div>
      <RouterLink @click="pushInHistory({name: 'dashboard', path: '/dashboard'})" to="/Dashboard">Dashboard</RouterLink>

      <button @click="forwardInHistory(), $router.go(1)">Go forward</button>
    </nav>

    <div class="d-flex">
      <p>
        {{ DashboardMeta ? "accés autorisé à /Dashboard" : "accès non autorisé à /Dashboard. redirection vers home" }}
      </p>
      <button @click="putAuthentificationToFalse">
        Modifier l'accès à /Dashboard
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px #f5f5f5;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.history {
  max-width: 250px;
  min-height: 200px;
  max-height: 500px;
  padding: 15px;
  text-align: left;
  word-break: break-word;
  background-color: #fff;
  position: fixed;
  top: 132px;
  left: 15px;
  z-index: 2;
  box-shadow: 0 3px 10px #f5f5f5;
  overflow: auto;

  li {
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
	  text-overflow: ellipsis;
  }
}
</style>
