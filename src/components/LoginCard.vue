<template>
  <section class="login-card">
    <h3 class="title">TRAVELS APP</h3>
    <q-form @submit.prevent="loginAction" class="q-gutter-md form">
      <section class="inputs">
        <q-input
          outlined
          label="Email or Username"
          stack-label
          v-model="email"
          filled
          type="email"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          class="full-input"
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-model="password"
          label="Password"
          outlined
          dense
          stack-label
          filled
          class="full-input"
          bg-color="white"
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </section>
      <section class="buttons">
        <q-btn label="Register" @click="goRegister" type="button" class="button" />
        <q-btn class="button" label="Login" v-close-popup type="submit" />
      </section>
    </q-form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { logIn } from '../utils/api/post.js'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { notifyError, notifySuccess } from 'src/utils/utilsNotify.js'

const router = useRouter()
import md5 from 'md5'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const $q = useQuasar()

const email = ref('')
const password = ref('')
const isPwd = ref(true)

//methods
const goRegister = () => {
  router.push({ name: 'register' })
}
const loginAction = async () => {
  const user = {
    user: email.value,
    hash: md5(password.value),
  }

  try {
    let response = await logIn(user)
    response = response.data
    if (!response.error.status && !$q.localStorage.getItem('token')) {
      $q.localStorage.set('token', response.data.token)
      $q.localStorage.set('isAuth', true)
      auth.setUser(
        response.data.idUser,
        response.data.name,
        response.data.email,
        response.data.role,
        response.data.avatar,
        response.data.newMessages
      )

      notifySuccess('User is logged')
      router.push({ name: 'home' })
    } else {
      if (response.error.source === 'userNotVerified') {
        notifyError('User not verified. Please check your email and verify your email adress')
      } else {
        notifyError('An error ocurred')
      }
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.full-transparent {
  background-color: transparent;
}
.login-card {
  width: 370px;
  height: fit-content;
  display: grid;
  gap: 1rem;
  grid-template-rows: 0.7fr 3fr;
  text-align: center;
  place-items: center;
}
.title {
  color: white;
  font-weight: bolder;
  letter-spacing: 0.05em;
}
.inputs {
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  place-items: center;
  gap: 0.7rem;
  margin: 0;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 90%;
  align-items: center;
  margin: 0;
  justify-content: space-around;
}
.button {
  width: 100%;
  background: linear-gradient(-127deg, $gray-accent 50%, $blue-gray 67%);
  background-size: 800% 800%;
  animation: gradient 14s ease infinite;
  color: white;
}
.form {
  display: grid;
  width: 90%;
  place-items: center;
  margin: 0;
}
.full-input {
  width: 100%;
}
</style>
