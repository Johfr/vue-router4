<script setup>
import { ref, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  id: String
})

const params = useRoute().params
const params2 = useRouter().currentRoute.value.params

console.log('useRoute', useRoute());
console.log('useRouter', useRouter());

// on button click : show or hide code.
const showCode = ref(false)
</script>

<template>
  <div class="page">
    <h1>Page Params</h1>

    <p>
      <span class="bold">script :</span>
      Props : {{ props }}
    </p>
    <p>
      <span class="bold">template :</span>
      $route.params : {{ $route.params }}
    </p>
    <p>
      <span class="bold">template :</span>
      $router.params : {{ $router.currentRoute.value.params }}
    </p>
    <p>
      <span class="bold">script :</span>
      useRoute().params : {{ params }}
    </p>
    <p>
      <span class="bold">script :</span>
      useRouter().currentRoute.value.params : {{ params2 }}
    </p>
    <button v-if="!showCode" @click="showCode = true">Show Code</button>
    
    <div v-if="showCode">
      <code>
        <pre>
          &#60;script setup&#62;
            // ComponentParams.vue
            import { defineProps } from 'vue'
            import { useRoute, useRouter } from 'vue-router'

            const props = defineProps({
              id: String
            })

            const params = useRoute().params
            const params2 = useRouter().currentRoute.value.params
          &#60;/script&#62;

          &#60;template&#62;
            &#60;p&#62; Props : &#123;&#123; props &#125;&#125; &#60;/p&#62;
            &#60;p&#62; $route : &#123;&#123; $route.params &#125;&#125; &#60;/p&#62;
            &#60;p&#62; $router : &#123;&#123; $router.currentRoute.value.params &#125;&#125; &#60;/p&#62;
            &#60;p&#62; useRoute() : &#123;&#123; params &#125;&#125; &#60;/p&#62;
            &#60;p&#62; useRouter() : &#123;&#123; params2 &#125;&#125; &#60;/p&#62;
          &#60;/template&#62;
        </pre>
      </code>

      <code>
        <pre>
          // router/index.js
          {
            path: 'params/id=:id',
            name: 'params',
            component: () => import('../components/ComponentParams.vue'),
            props: true, // will receive id as a props
            meta: {
              layout: Default
            }
          },
        </pre>
      </code>
      <p class="info">Quand props est passé à <code>true</code>, les paramètres seront passés en tant que props au composant.</p>

      <section>
        <h3>Les avantages de passer par les props plutôt que via $route ?</h3>
        <ul>
          <li>
            <span class="bold">Simplicité d'utilisation :</span> Vous pouvez accéder aux paramètres en tant que props directement dans votre composant sans avoir à extraire le $route.params. Cela rend votre code plus lisible et moins verbeux.
          </li>
          <li>
            <span class="bold">Type Checking :</span> Vous pouvez spécifier le type attendu des paramètres en utilisant props. Cela permet une vérification de type statique, ce qui signifie que si le type de paramètre ne correspond pas à ce qui est attendu, vous obtiendrez une erreur de compilation. Cela vous aide à détecter les erreurs plus tôt dans le processus de développement.
          </li>
          <li>
            <span class="bold">Composition API :</span> Si vous travaillez avec la Composition API, props est un moyen recommandé d'obtenir les paramètres. Il est aligné sur la façon dont les autres variables réactives sont définies dans les composants Vue 3.
          </li>
        </ul>
      </section>
    </div>
    
  </div>
</template>

<style scoped>
</style>
