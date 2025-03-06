<template>
  <section class="principal-grid" :class="{ mobile: isCompact }">
    <div :class="{ 'mobile-header': isCompact }">
      <HeaderComponent :isMobile="isCompact" />
    </div>
    <main :class="{ 'mobile-main': isCompact }">
      <RouterView />
    </main>
    <FooterComponent v-if="!isCompact" />
  </section>
</template>

<script setup>
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import { ref, onMounted,computed } from 'vue'
let windowWidth = ref(window.innerWidth);
let isCompact = computed(() => {
      return windowWidth.value < 450? true: false;
    });


//methods
const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

//hooks
onMounted(() => {
  window.addEventListener("resize", updateWidth);
})
</script>

<style scoped>
#app,
.principal-grid {
  display: grid;
  grid-template-rows:100px  1fr 60px;
  width: 100%;
  height: 100%;
}
.mobile {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.mobile-main {
  flex: 1;
  overflow-y: auto; /* Scroll solo aquí */
}
.mobile-header {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Asegura que esté encima de todo */
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2); /* Opcional: sombra superior */
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
@media (max-width: 1069px) {
  .principal-grid {
  grid-template-rows:min-content  1fr 60px;
 ;
}
}
</style>
