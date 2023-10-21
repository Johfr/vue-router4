<script setup>
import { ref, defineProps, watchEffect } from 'vue'

const props = defineProps({
  params: String,
  query: String
})

// on button click : show or hide code.
const showCode = ref(false)

// products list
const products = [
  {
    name: "Sequoia",
    category: "non-defini",
    id: "3ed",
  },
  {
    name: "ficus lyrata",
    category: "classique",
    id: "2ed",
  },
  {
    name: 'olivier',
    category: 'exterieur',
    id: '5pl',
  },
  {
    name: 'géranium',
    category: 'exterieur',
    id: '6uo',
  },
  {
    name: "monstera",
    id: "1ed",
    category: "classique",
  },
  {
		name: 'géranium',
		category: 'exterieur',
		id: '6uo',
  },
  {
		name: 'basilique',
		category: 'exterieur',
		id: '7ie',
  },
  {
		name: 'aloe',
		category: 'plante grasse',
		id: '8fp',
  },
  {
		name: 'succulente',
		category: 'plante grasse',
		id: '9vn',
  }
]

// watch props.query value
let noCategoryFound = ref(false)
watchEffect(() => {
  noCategoryFound.value = products.some(product => product.category === props.query)
})

// highlight plants items that match with the button category
let catFocus = ref('')
const bright = (productCat) => {
  catFocus.value = productCat
}
</script>

<template>
  <div class="page products">
    <h1>Page produits</h1>
    <p> Props : 
      <pre>{{ props }}</pre>
    </p>
    
    <section>
      <h2>Filtrer par categorie :</h2>
      <button
        class="list-btn"
        @mouseover="bright('exterieur')"
        @mouseleave="catFocus = ''"
        @click="$router.replace({ path: '/products/plantes',  query: { category: 'exterieur' } })"
      >
        exterieur
      </button>

      <button
        class="list-btn"
        @mouseover="bright('classique')"
        @mouseleave="catFocus = ''"
        @click="$router.replace({ path: '/products/plantes',  query: { category: 'classique' } })"
      >
        classique
      </button>

      <button
        class="list-btn"
        @mouseover="bright('plante grasse')"
        @mouseleave="catFocus = ''"
        @click="$router.replace({ path: '/products/plantes',  query: { category: 'plante grasse' } })"
      >
        plante grasse
      </button>

      <button
        class="list-btn"
        @mouseover="bright('non-defini')"
        @mouseleave="catFocus = ''"
        @click="$router.replace({ path: '/products/plantes',  query: { category: 'non-defini' } })"
      >
        non-defini
      </button>
      <button class="list-btn color-grey" @click="$router.replace({ path: '/products' })">Reset</button>
    </section>

    <section>
      <h2>Mes plantes</h2>
      <ul>
        <li v-for="product in products" :key="product.id" v-show="props.query ? product.category === props.query : product" :class="['item',{bright: catFocus === product.category }]">
          {{ product.name }} - {{ product.category }}
        </li>
        <li class="info" v-show="!noCategoryFound && props.query">Aucune categorie correspondante</li>
      </ul>
    </section>

    <button v-if="props.query && !showCode" @click="showCode = true">Show Code</button>

    <div v-if="showCode">
      <code>
        <pre>
          // router/index.js
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
            meta: {
              layout: Default
            }
          },
        </pre>
      </code>

      <code>
        <pre>
          // views/Products.vue
          &#60;script setup&#62;
            // views/Products.vue
            import { defineProps } from 'vue'

            const props = defineProps({
              params: String,
              query: String
            })

            const products = [{...}]

            // watch props.query value
            let noCategoryFound = ref(false)
            watchEffect(() => {
              noCategoryFound.value = products.some(product => product.category === props.query)
            })
          &#60;/script&#62;

          &#60;template&#62;
            &#60;p v-show="!noCategoryFound"&#62; props.query : { "category": "exterieur" } &#60;/p&#62;
            
            &#60;ul&#62;
              &#60;li
                v-for="product in products"
                :key="product.id"
                v-show="props.query ? product.category === props.query : product"
              &#62;
                &#123;&#123; product.name &#125;&#125; - &#123;&#123; product.category &#125;&#125;
              &#60;/li&#62;
              &#60;li class="info" v-show="!noCategoryFound && props.query"&#62;
                Aucune categorie correspondante
              &#60;/li&#62;
            &#60;/ul&#62;
          &#60;/template&#62;
        </pre>
      </code>

      <section>
        <h3>Comment ça fonctionne ?</h3>
        <ul>
          <li>
            <span class="bold">props</span> indique que l'on souhaite passer des props à votre composant.
          </li>
          <li>
            <span class="bold">route</span> est un objet représentant la route active.
          </li>
          <li>
            <span class="bold">route.query.category</span> signifie que l'on extrait la valeur du paramètre "category" de l'URL actuelle.
          </li>
          <li>
            <span class="bold">La syntaxe <code>route => ({ query: route.query.category })</code></span> crée un objet props pour le composant avec une propriété nommée "query" à laquelle vous attribuez la valeur du paramètre "category" de l'URL en cours.
          </li>
          <li>
           <span class="bold">route => ({ query: route.query.category })</span> est l'équivalent de <code>props: route => {return {query: route.query.category} }</code>
          </li>
          <li class="info">
            En JavaScript, lorsqu'une fonction fléchée est utilisée pour retourner un objet, les parenthèses autour de cet objet sont nécessaires pour éviter toute confusion. Les parenthèses indiquent que ce qui est à l'intérieur est un objet littéral à retourner.
          </li>
        </ul>
      </section>

      <section>
        <h3>Quand utiliser les querys ?</h3>
        <ul>
          <li>
            <span class="bold">Filtrage de Données</span> : Ils permettent de filtrer les données renvoyées par le serveur en fonction de certains critères. Par exemple, si vous avez une liste de produits, ?category=tech pourrait être utilisé pour n'afficher que les produits de la catégorie "technologie".
          </li>
          <li>
            <span class="bold">Pagination</span> : Ils sont couramment utilisés pour la pagination, où vous pouvez spécifier la page souhaitée via un paramètre, comme ?page=2, pour accéder à la deuxième page de résultats.
          </li>
          <li>
            <span class="bold">Recherche</span> : Les paramètres de requête sont souvent utilisés pour effectuer des recherches. Dans l'exemple, 'category=plantes' pourrait être le terme de recherche pour obtenir des résultats liés à "plantes".
          </li>
          <li>
            <span class="bold">Personnalisation</span> : Ils permettent aux utilisateurs de personnaliser leur expérience. Par exemple, ?theme=dark pourrait être utilisé pour activer un mode sombre sur un site web.
          </li>
          <li>
            <span class="bold">Tri</span> : Ils peuvent être utilisés pour spécifier l'ordre de tri des données. Par exemple, ?sort=price_asc pourrait être utilisé pour trier une liste de produits par prix croissant.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  &.bright {
    font-weight: 700;
  }
}

section {
  margin-top: 50px;
  margin-bottom: 50px;
}
li {
  margin-bottom: 5px;
}
</style>
