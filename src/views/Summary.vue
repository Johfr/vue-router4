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

const routerRef = ref()
const componentRef = ref()

const dropDown = (section) => {
  if (routerRef.value && section === "routerRef") {
    if (routerRef.value.classList.contains('hide')) {
      routerRef.value.classList.remove('hide')
    } else {
      routerRef.value.classList.add('hide')
    }
  }
  
  if (componentRef.value && section === "componentRef") {
    if (componentRef.value.classList.contains('hide')) {
      componentRef.value.classList.remove('hide')
    } else {
      componentRef.value.classList.add('hide')
    }
  }
}
</script>

<template>
  <div class="page">
    <h1>En résumé</h1>
    <section>
      <h2 class="hide" @click="dropDown('routerRef')" ref="routerRef">router/index.js</h2>
      <ul>
        <li>
          <span class="bold">Redirect :</span> 
          <p>Redirige automatiquement si la route match</p>
          <code>
            <pre>
{
  path: 'home',
  redirect: { name: 'home' }
}</pre>
          </code>
        </li>
        <li>
          <span class="bold">children :</span> 
          <p>Le composant parent doit obligatoirement avoir le composant <code>&#60;RouterView /&#62; fourni par le router pour afficher les childrens</code> </p>
          <code>
            <pre>
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),
    // will pass { params: plantes, query: 'classique'} as props
    props: route => ({params: route.params.productName, query: route.query.category}), 
    children: [
      {
        path: ':productName',
        name: 'product-name',
        component: () => import('../views/Products.vue'),
      },
    ],
  }</pre>
  
            <pre>
// views/products
&#60;template&#62;
  &#60;div&#62;
    &#60;RouterView /&#62;
  &#60;/div&#62;
&#60;/template&#62;
            </pre>
          </code>
        </li>
        <li>
          <span class="bold">props :</span> 
          <p>si boolean:  passe les params en tant que props. Si fonction:  retourne un objet littéral sous forme de props</p>
          <code>
            <pre>//router/index.js
props: route => ({ query: route.query.cat })
props: true</pre>
            <pre>
//components/ myComponent
&#60;template&#62;
    &#60;RouterLink :to="{ path: '/products/plantes',  query: { category: 'exterieur' } }"&#62;
      exterieur
    &#60;/RouterLink&#62;
    
    &#60;button
      @click="$router.replace({ path: '/products/plantes',  query: { category: 'exterieur' } })"
    &#62;
      exterieur
    &#60;/button&#62;
&#60;/template&#62;
            </pre>
          </code>
        </li>
        <li>
          <span class="bold">beforeEnter :</span> 
          <p>est une fonction (navigation Guard) qui sera appelé avant l'entrée d'une route bien précise</p>
          <code>
            <pre>
beforeEnter: (to, from, next) => {
  if (userIsAuth) {
    next()
  } else {
    next( { name: "redirection", query: { redirect: '/' + to.name + '/' + to.params.id } })
  }
},</pre>
          </code>
        </li>
        <li>
          <span class="bold">beforeEach :</span> 
          <p>est une fonction (navigation Guard) qui gère l'entrée de l'ensemble des routes</p>
          <code>
            <pre>
import { computed } from 'vue'
import { useAuthentification } from "../store/useAuthentification.js"

router.beforeEach((to, from, next) => {
  // STORE
  const authStore = useAuthentification()
  const roles = computed(() => authStore.roles)
  // END STORE
  
  // redirect to home if isn't authentificated
  if (to.meta.authRequired && !authStore.auth) {
    next({ name: 'access-refused', query: { redirect: to.name }, })
  } else if (to.meta.roleRequired && !roles.value.some(role => to.meta.roleRequired.includes(role))) {
    next({ name: 'access-refused', query: { redirect: to.name }, })
  } else {
    next()
  }
})</pre>
          </code>
        </li>
        <li>
          <span class="bold">sensitive & strict :</span> 
          <p>défini si l'accès à la route est stricte, cad s'il doit correspondre exactement au <code>path</code></p>
          <code>
            <pre>//router/index.js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // will match /users/john but not:
    // - /users/john/ because of strict: true
    // - /Users/john because of sensitive: true
    { path: '/users/:id', sensitive: true },
    // will match /users, /Users, and /users/42 but not /users/ or /users/42/
    { path: '/users/:id?' },
  ],
  strict: true, // applies to all routes
})
            </pre>
          </code>
        </li>
      </ul>
    </section>
    
    <section>
      <h2 class="hide" @click="dropDown('componentRef')" ref="componentRef">components/myComponent.vue</h2>
      <ul>
        <li>
          <span class="bold">Props :</span> 
          <p>Fonctionne de la même façon que des props classiques passées aux composants</p>
          <span class="bold">onBeforeRouteUpdate, useRouter, onBeforeRouteLeave, useRoute :</span> 
          <p>Fonctions dédiées à l'utilisation du router dans les composants</p>
          <code>
            <pre>
&#60;script setup&#62;
  import { defineProps } from 'vue'
  import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute, useRouter } from "vue-router"

  const props = defineProps({
    params: String,
    query: String
  })

  const router = useRouter()
  const route = useRoute()

  const params = useRoute().params
  const params2 = useRouter().currentRoute.value.params

  onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id != "5") {
      // programmatic navigation
      router.replace({
        name: "redirection",
        query: { redirect: '/' + to.name + '/' + to.params.id }
      })
    }
  })

  // programmatic navigation
  const goBack = () => router.go(-1)
  const goForward = () => router.go(1)
&#60;/script&#62;</pre>

<pre>
  &#60;template&#62;
    &#60;button @click="goBack"&#62; Go back &#60;/button&#62;
    &#60;button @click="goForward"&#62; Go forward &#60;/button&#62;

    &#60;p&#62; Props : &#123;&#123; props &#125;&#125; &#60;/p&#62;
    &#60;p&#62; $route : &#123;&#123; $route.params &#125;&#125; &#60;/p&#62;
    &#60;p&#62; $router : &#123;&#123; $router.currentRoute.value.params &#125;&#125; &#60;/p&#62;
    &#60;p&#62; useRoute() : &#123;&#123; params &#125;&#125; &#60;/p&#62;
    &#60;p&#62; useRouter() : &#123;&#123; params2 &#125;&#125; &#60;/p&#62;
  &#60;/template&#62;
</pre>
          </code>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped lang="scss">
p {
  margin-top: 0;
  margin-bottom: 0;
}
section {
  h2 {
    cursor: pointer;
  }
}
.hide + ul {
  height: 0px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
