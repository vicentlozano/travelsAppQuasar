<template>
  <header v-if="!props.isMobile">
    <nav class="nav" :class="{ logged: isLoginUser || isLoginAdmin }">
      <h1 class="title">MY TRAVELS</h1>
      <RouterLink class="link" to="/" @click="show"
        ><q-icon name="mdi-home" /><span class="section-title">Home</span></RouterLink
      >
      <RouterLink v-if="auth.username" class="link" to="/chat">
        <q-icon name="mdi-chat" /><span class="section-title">Chat</span>
      </RouterLink>
      <RouterLink v-if="auth.username" class="link" to="/media"
        ><q-icon name="mdi-multimedia" /><span class="section-title">Media</span></RouterLink
      >
      <RouterLink v-if="auth.username" class="link" to="/search"
        ><q-icon name="mdi-magnify" /><span class="section-title">Search</span></RouterLink
      >
      <RouterLink v-if="auth.username" class="link" to="/travels"
        ><q-icon name="mdi-account" /><span class="section-title">Travels</span></RouterLink
      >

      <q-btn v-if="auth.username" @click="logOut">Log Out</q-btn>
    </nav>
  </header>
  <footer v-else class="nav-footer">
    <RouterLink class="link" to="/" @click="show"><q-icon name="mdi-home" /></RouterLink>
    <RouterLink class="link" to="/chat">
      <q-icon name="mdi-chat" />
    </RouterLink>
    <RouterLink class="link" to="/media"><q-icon name="mdi-multimedia" /></RouterLink>
    <RouterLink class="link" to="/search"><q-icon name="mdi-magnify" /></RouterLink>
    <RouterLink class="link" to="/travels"><q-icon name="mdi-account" /></RouterLink>
  </footer>

  <LoginCard :login="login" @close-login="closeLogin" />
  <SignUpCard :signup="signup" @close-signup="closeSignUp" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoginCard from './LoginCard.vue'
import SignUpCard from './SignUpCard.vue'
import { useUserStore } from '../stores/user'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const auth = useUserStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const isLoginUser = computed(() => {
  return auth.role === 'user' ? true : false
})
const isLoginAdmin = computed(() => {
  return auth.role === 'admin' ? true : false
})
const login = ref(false)
const signup = ref(false)
const mobilView = ref(null)

//props

const props = defineProps({
  isMobile: Boolean,
})
//methods
const closeLogin = () => {
  login.value = false
}
const closeSignUp = () => {
  signup.value = false
}
const logOut = () => {
  auth.deleteUser()
  $q.localStorage.removeItem('token')
  $q.localStorage.setItem('isAuth', false)


  $q.notify({
    color: 'blue',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'User log Out',
  })
  router.push({ name: 'login' })
}
const show = () => {
  console.log(auth.email)
}

//hooks

onMounted(() => {
  mobilView.value = window.innerWidth < 450
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  background-color: rgba(21, 144, 201, 0.625);
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
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
}

.link {
  color: white;
  text-decoration: none;
  width: 70%;
  height: fit-content;
  padding: 0.2rem;
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
  font-size: 1.5em;
  font-weight: 700;
  gap: 0.3rem;
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
.nav-footer {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  border-top: 2px solid white;
  background-color: rgba(21, 144, 201, 0.323);
  background-color: rgba(21, 144, 201, 0.33);

  align-items: center;
  padding: 0.3rem;
  .link {
    padding: 0.7rem;
    margin: 0;
    width: fit-content;
  }
}
@media (min-width: 1070px) and (max-width: 1500px) {
  .link {
    padding: 0.2rem 1.5rem;
    width: 90%;
    gap: 0.1rem;
  }
}
@media (max-width: 1069px) {
  .link {
    padding: 0.2rem 1.5rem;
    width: 90%;
    gap: 0.1rem;
  }
  .logged {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    gap: 0.5rem;
    .title {
      grid-row: 1/2;
      grid-column: 1 / -1;
      height: fit-content;
    }
    .section-title {
      display: none;
    }
  }
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
