<template>
  <div class="page-basic">
    <div class="absolute-top">
      <HeaderComponent />
    </div>
    <section class="profile">
      <q-avatar color="primary" text-color="white">J</q-avatar>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'

onMounted(async () => {})
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: auto 1fr;
}
.absolute-top {
  position: fixed;
  top: 0;
  background-color: $gray-accent;
  height: 3.4rem;
}
.profile {
  margin-top: 3.4rem;
}
</style>
