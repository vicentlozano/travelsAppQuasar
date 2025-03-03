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
import { logIn } from '../api/travelsService'
import { useQuasar } from 'quasar'
import md5 from 'md5'
import { useTokenStore } from '../stores/token'
const auth = useTokenStore()
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
    email: email.value,
    password: md5(password.value),
  }
  try {
    const response = await logIn(user)
    console.log(response)
    if (response) {
      if (response.ok) {
        if (!$q.localStorage.getItem('token')) {
          $q.localStorage.set('token', response.result.token)
          $q.localStorage.set('userId', response.result.id)
          auth.updateToken()

          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'user is logged',
          })
        } else {
          $q.notify({
            color: 'brown-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'user is already logged',
          })
        }
        close()
      } else {
        $q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'cloud_done',
          message: response.error,
        })
      }
    }
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'cloud_done',
      message: error.message,
    })
    console.log(error)
  }
}
</script>

<style lang="scss" scoped></style>
