<template>
  <div class="page-basic">
      <HeaderComponent />
    <section class="profile">
      <p>{{ auth.email }}</p>
      <q-avatar color="primary" text-color="white" size="200px">
        <img v-if="auth.avatar" :src="auth.avatar" />
        <span v-else>{{ auth.username.charAt(0) }}</span
        ><q-badge color="teal"><q-icon class="edit"></q-icon></q-badge>
      </q-avatar>

      <p>Hola {{ auth.username }} !</p>
      <q-btn @click="logout">Logout</q-btn>
    </section>
  </div>
</template>

<script setup>
import { onMounted,inject } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

//data
const auth = useUserStore()
const router = useRouter()
const mqtt = inject('appGlobal/mqtt')
//methods
const logout = () => {
  mqtt.unSubscribeFromAllTopics()
  auth.deleteUser()
  router.push({ name: 'login' })
}

//hooks
onMounted(async () => {})
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: min-content 1fr;
}
.absolute-top {
  position: fixed;
  top: 0;
  background-color: $gray-accent;
  height: 3.4rem;
}
.profile {
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
@media (max-width: 450px) {
  .all-travels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    padding-top: 5rem;
    padding-bottom: 3.6rem;
  }
  .page-basic {
    padding-top: 0rem;
  }
}
</style>
