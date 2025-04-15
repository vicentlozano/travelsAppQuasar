<template>
  <q-card style="min-width: 350px">
    <q-form @submit="loginAction" class="q-gutter-md">
      <q-card-section>
        <div class="text-h6" align="center">Your email or user name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="email"
          autofocus
          @keyup.enter="prompt = false"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Your password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="password"
          autofocus
          @keyup.enter="prompt = false"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Register" @click="closeRegister" type="button" />
        <q-btn flat label="Cancel" v-close-popup @click="close" />
        <q-btn flat label="Loggin" v-close-popup type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { logIn } from '../utils/api/post.js'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { notifyError, notifySuccess } from 'src/utils/utils.js'

const router = useRouter()
import md5 from 'md5'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const $q = useQuasar()

const props = defineProps({
  login: Boolean,
})
const loginInjector = ref(props.login)
const email = ref('')
const password = ref('')

//methods
const close = () => {
  loginInjector.value = false
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
      )

      notifySuccess('User is logged')
      close()
      router.push({ name: 'home' })
    } else {
      notifyError('An error ocurred')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.full-transparent {
  background-color: transparent;
}
</style>
