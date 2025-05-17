<script setup>
import { ref } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import HeroComponent from './components/HeroComponent.vue'
import FeaturedComponent from './components/FeaturedComponent.vue'
import CartComponent from './components/CartComponent.vue'

const showCart = ref(false)
const cart = ref({
  items: [],
  total: 0,
})
const books = [
  {
    id: 1,
    title: 'Comigo na livraria',
    cover: '/covers/comigo-na-livraria.png',
    price: 23.24,
    author: 'Martha Medeiros',
  },
  {
    id: 2,
    title: 'Quincas Borba',
    cover: '/covers/quincas-borba.png',
    price: 23.24,
    author: 'Machado de Assis',
  },
  {
    id: 3,
    title: 'A livraria',
    cover: '/covers/a-livraria.png',
    price: 13.94,
    author: 'Penelope Fitzgerald',
  },
  {
    id: 4,
    title: 'A hora da estrela',
    cover: '/covers/a-hora-da-estrela.png',
    price: 16.84,
    author: 'Clarice Lispector',
  },
  {
    id: 5,
    title: 'O alienista',
    cover: '/covers/o-alienista.png',
    price: 266.92,
    author: 'Machado de Assis',
  },
  {
    id: 6,
    title: 'Mar morto',
    cover: '/covers/mar-morto.png',
    price: 13.95,
    author: 'Jorge Amado',
  },
  {
    id: 7,
    title: 'Grande sertão',
    cover: '/covers/grande-sertao-veredas.png',
    price: 26.04,
    author: 'Guimarães Rosa',
  },
  {
    id: 8,
    title: 'Flor de poemas',
    cover: '/covers/flor-de-poema.png',
    price: 15.81,
    author: 'Cecília Meireles',
  },
]

function decrementBookToCart(book) {
  const existingBook = cart.value.items.find((item) => item.id === book.id)
  if (existingBook.quantity === 1) {
    cart.value.items = cart.value.items.filter((item) => item.id !== book.id)
  } else {
    existingBook.quantity--
  }
  cart.value.total -= book.price
}

function incrementBookToCart(book) {
  const existingBook = cart.value.items.find((item) => item.id === book.id)
  existingBook.quantity++
  cart.value.total += book.price
}

function addToCart(book) {
  const existingBook = cart.value.items.find((item) => item.id === book.id)
  if (existingBook) {
    existingBook.quantity++
  } else {
    cart.value.items.push({ ...book, quantity: 1 })
  }
  cart.value.total += book.price
  alert(`Adicionado ${book.title} ao carrinho!`)
}
</script>

<template>
  <HeaderComponent @click-cart="showCart = !showCart" />
  <main v-if="showCart">
    <CartComponent :cart="cart" @increment-book="incrementBookToCart" @decrement-book="decrementBookToCart" @close-cart="showCart = false" />
  </main>
  <main v-else>
    <hero-component />
    <featured-component />

    <section class="books">
      <article class="book" v-for="book in books" :key="book.id">
        <img :src="book.cover" :alt="book.title" />
        <h2>{{ book.title }}</h2>
        <p class="book-author">{{ book.author }}</p>
        <span class="price-and-like">
          <p class="book-price">R$ {{ book.price.toFixed(2) }}</p>
          <span class="mdi mdi-heart-outline"></span>
        </span>
        <button @click="addToCart(book)"><span class="mdi mdi-cart"></span>Comprar</button>
      </article>
    </section>
  </main>
  <footer-component />
</template>

<style scoped lang="scss">
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vh 9vw;
  border-bottom: 2px solid #27ae6099;

  & h2 {
    color: #382c2c;
    font-size: 3rem;
    font-weight: 700;
  }

  & .hero-content {
    width: 50%;
    padding-right: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    & h3.outlined {
      background-color: transparent;
      color: #27ae60;
      border: 2px solid #27ae60;
      padding: 15px 20px;
      border-radius: 5px;
      font-size: 1rem;
    }

    & button {
      margin-top: 20px;
    }

    p {
      width: 70%;
    }
  }

  & .hero-image {
    width: 50%;
    text-align: right;
    padding-right: 4vw;

    & img {
      max-width: 100%;
      height: auto;
    }
  }
}



.books {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 5vh 8vw;

  & .book {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: calc(100% / 4 - 42px);
    margin: 20px;

    & h2 {
      font-size: 1.5rem;
      font-weight: 700;
    }

    & .book-author {
      font-size: 1rem;
    }

    & .book-price {
      font-size: 1.2rem;
      font-weight: 700;
    }

    & .price-and-like {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      & .mdi-heart-outline {
        font-size: 1.3rem;
        color: #27ae60;
      }
    }
  }
}
</style>
