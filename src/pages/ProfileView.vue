<template>
  <div class="page-basic">
    <div class="absolute-top">
      <HeaderComponent />
    </div>
    <section class="profile">
      <p>{{ auth.email }}</p>
      <q-avatar color="primary" text-color="white" size="200px"
        >J <q-badge floating color="teal"><q-icon class="edit"></q-icon></q-badge>
      </q-avatar>

      <p>Hola {{ auth.username }} !</p>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from '../stores/user'

//data
const auth = useUserStore()

//hooks
onMounted(async () => {})
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: auto 1fr;
}
.absolute-top {
  position: fixed;
  top: 0;
  background-color: $gray-accent;
  height: 3.4rem;
}
.profile {
  margin-top: 3.4rem;
  display: grid;
  height: 100%;
  width: 100%;
  gap: 1rem;
  grid-template-rows: auto auto;
  justify-content: center;
  align-content: center;
  place-items: center;
  padding: 2rem;
}
</style>
