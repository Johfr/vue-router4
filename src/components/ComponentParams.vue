<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  id: String,
  query: String
})
</script>

<template>
  <div>
    <h2>Composant Enfant : Params as props</h2>
    
    <p>$route.params : {{ $route.params }}</p>
    <p> Props : {{ props }}</p>

    <code>
      <pre>
        &#60;script setup&#62;
          // ComponentParams.vue
          import { defineProps } from 'vue'

          const props = defineProps({
            id: String
          })
        &#60;/script&#62;

        &#60;template&#62;
          &#60;p&#62; Props : { "id": "5" } &#60;/p&#62;
        &#60;/template&#62;
      </pre>
    </code>

    <code>
      <pre>
        // router/index.js
        {
          path: '/about',
          name: 'about-parent',
          component: About,
          children: [
            {
              path: 'id=:id',
              name: 'about-child',
              component: () => import('../components/ComponentParams.vue'),
              props: true // will receive id as a props
            },
          ],
          meta: {
            layout: Default
          }
        },
      </pre>
    </code>

    <section>
      <h3>Les avantages de passer par les props plutôt que via $route ?</h3>
      <ul>
        <li>
          Simplicité d'utilisation : Vous pouvez accéder aux paramètres en tant que props directement dans votre composant sans avoir à extraire le $route.params. Cela rend votre code plus lisible et moins verbeux.
        </li>
        <li>
          Type Checking : Vous pouvez spécifier le type attendu des paramètres en utilisant props. Cela permet une vérification de type statique, ce qui signifie que si le type de paramètre ne correspond pas à ce qui est attendu, vous obtiendrez une erreur de compilation. Cela vous aide à détecter les erreurs plus tôt dans le processus de développement.
        </li>
        <li>
          Composition API : Si vous travaillez avec la Composition API, props est un moyen recommandé d'obtenir les paramètres. Il est aligné sur la façon dont les autres variables réactives sont définies dans les composants Vue 3.
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
</style>
