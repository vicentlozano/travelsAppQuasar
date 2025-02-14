<template>
  <header>
    <nav class="nav">
      <h1>MY TRAVELS</h1>
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/travels">Travels</RouterLink>
      <q-btn @click="login = true">inicar sesion</q-btn>
    </nav>
  </header>

  <q-dialog v-model="login" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6" align="center">Your email</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="email" autofocus @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Your password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="password" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Loggin" v-close-popup  @click="loginAction"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
const login = ref(false)
const email = ref('')
const password = ref('')
const loginAction = async () => {
  const user = {
    userEmail: email.value,
    password: password.value
  }
  
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
  grid-template-columns: 4fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid white;
  gap: 2px;
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
