<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent @click-cart="showCart = !showCart" />
  <main >
   <RouterView />
  </main>


  <footer-component />
</template>

<style scoped lang="scss">





</style>
