<template>
  <header>
    <nav class="nav" :class="{ logged: isLogin }">
      <h1>MY TRAVELS</h1>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink v-if="isLogin" class="link" to="/travels">Travels</RouterLink>
      <q-btn-group rounded v-if="!isLogin">
        <q-btn class="custom-button" @click="login = true">inicar sesion</q-btn>
        <q-btn @click="signup = true">Registrarse</q-btn></q-btn-group
      >
      <q-btn v-if="isLogin" @click="logOut">Log Out</q-btn>
    </nav>
  </header>

  <LoginCard :login="login" @close-login="closeLogin" />
  <SignUpCard :signup="signup" @close-signup="closeSignUp" />
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginCard from './LoginCard.vue'
import SignUpCard from './SignUpCard.vue'
import { useTokenStore } from '../stores/token'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const auth = useTokenStore()
const isLogin = computed(() => {
  return auth.token
})
const login = ref(false)
const signup = ref(false)
const closeLogin = () => {
  login.value = false
}
const closeSignUp = () => {
  signup.value = false
}
const logOut = () => {
  auth.deleteToken()
  auth.updateToken()
  $q.notify({
    color: 'blue',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'User log Out',
  })
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background-color: rgba(21, 144, 201, 0.323);
}
.nav {
  display: grid;
  grid-template-columns: 4fr 1fr 4fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  gap: 2px;
}
.logged {
  grid-template-columns: 4fr 1fr 1fr 1fr;
}

.link {
  color: white;
  text-decoration: none;
  width: 50%;
  height: fit-content;
  padding: 0.6rem;
  border-radius: 25px;
}
.link:hover {
  background-color: white;
  color: black;
  transition: 0.5s ease;
}
a {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.8s ease;
}
h1 {
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.1em;
}
.custom-button {
  min-width: 150px;
  border-right: 2px solid rgba(255, 255, 255, 0.664);
}
@media (max-width: 600px) {
  a.link {
    padding: 0.2rem 1.5rem;
    width: 60%;
  }
}

@media (max-width: 600px) {
  .nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid white;
    gap: 2px;
  }
  h1 {
    grid-row: 1;
    grid-column: 1 / -1;
  }
  .link {
    margin-bottom: 0.4rem;
  }
}
</style>
