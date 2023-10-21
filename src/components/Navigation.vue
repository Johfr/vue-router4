<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useAuthentification } from "../store/useAuthentification"

const authStore = useAuthentification()
const isAuth = computed(() => authStore.auth)
const userRoles = computed(() => authStore.roles)

const route = useRoute()
const router = useRouter()
const ids = [4, 5]
let history = ref([])

// live : is an exemple to explain how props works
console.log('route', route);

const userAccess = ref(isAuth.value)

// used to change the value and to simulate the access to /dashboard
const putAuthentificationToFalse = () => {
  // change isAuth to true or false
  authStore.updateAuth()
  userAccess.value = isAuth.value
  // // redirige seulement si on est sur /dashboard
  if (route.name === "dashboard" && isAuth.value === false) {
    router.push({ name: 'access-refused' })
  }
}

const addRoles = () => {
  authStore.roles.push('admin')
}

const removeRoles = () => {
  authStore.roles.pop()
  // // redirige seulement si on est sur /dashboard
  if (route.name === "admin" && authStore.roles[0] != 'admin') {
    router.push({ name: 'access-refused' })
  }
}

</script>

<template>
  <div class="navigation">
    <aside class="history">
      <h2>User</h2>
      <p>
        <span class="bold">isAuth : </span>
        {{ isAuth }}
      </p>
      <p>
        <span class="bold">userRoles : </span>
        {{ userRoles }}
      </p>
    </aside>

    <!-- Navigation -->
    <nav class="d-flex">
      <!-- // programmatic navigation -->
      <button @click="$router.go(-1)">Go back</button>

      <RouterLink to="/">home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/params/id=5">Params</RouterLink>
      <RouterLink to="/products">Products</RouterLink>

      <div v-for="id in ids" :key="id">
        <RouterLink :to="{path : '/details/' + id }">details {{ id }}</RouterLink>
      </div>

      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/summary">En résumé</RouterLink>

      <button @click="$router.go(1)">Go forward</button>
    </nav>

    <!-- CTA Buttons  -->
    <div class="d-flex">
      <button class="list-btn" @click="putAuthentificationToFalse">
        {{ userAccess ? "refuser l'accès à /dashboard" : "autoriser l'accès à /dashboard" }}
      </button>
      <button class="list-btn" @click="addRoles">
        addRoles
      </button>
      <button class="list-btn color-grey" @click="removeRoles">
        removeRoles
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
