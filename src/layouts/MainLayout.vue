<template>
  <section class="principal-grid">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>
    <FooterComponent />
  </section>
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'

// import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
#app,
.principal-grid {
  display: grid;
  grid-template-rows: 100px 1fr minmax(60px, auto);
  width: 100%;
  height: 100%;
}
main {
  width: 100%;
  height: 100%;
  background-color: rgb(198, 228, 235);
}

h1 {
  padding: 1rem;
  letter-spacing: 0.3em;
  font-weight: bold;
}
h3 {
  font-size: larger;
  padding: 0.3rem;
  margin: 0;
}
</style>
