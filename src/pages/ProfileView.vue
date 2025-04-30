<template>
  <div class="page-basic">
    <div class="absolute-top">
      <HeaderComponent />
    </div>
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
import { onMounted } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

//data
const auth = useUserStore()
const router = useRouter()
const $q = useQuasar()
//methods
const logout = () => {
  $q.localStorage.removeItem('token')

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
