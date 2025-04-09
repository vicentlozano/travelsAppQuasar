<template>
  <q-dialog v-model="isLoginAction" persistent>
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
          <q-btn flat label="Cancel" v-close-popup @click="close" />
          <q-btn flat label="Loggin" v-close-popup type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { logIn } from '../utils/api/post.js'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
const router = useRouter()
import md5 from 'md5'
import { useUserStore } from '../stores/user'
const auth = useUserStore()
const $q = useQuasar()

const props = defineProps({
  login: Boolean,
})
const emits = defineEmits(['closeLogin'])
const loginInjector = computed(() => {
  return props.login ? true : false
})
const isLoginAction = ref(loginInjector)
const email = ref('')
const password = ref('')

//methods
const close = () => {
  emits('closeLogin', false)
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

      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'user is logged',
      })
    }
    close()
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
</style>
