<template>
  <q-dialog v-model="signupInjector" persistent>
    <q-card class="form">
      <q-card-section>
        <div class="text-h6" align="center">Your name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="name" autofocus @keyup.enter="prompt = false" required />
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Your email</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          type="email"
          dense
          v-model="email"
          autofocus
          @keyup.enter="prompt = false"
          required
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6" align="center">Your password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="password" autofocus @keyup.enter="prompt = false" required />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup @click="close" />
        <q-btn flat label="Sign Up" v-close-popup @click="signUpAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-if="created" v-model="created" position="top" backdrop-filter="blur(4px)">
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-grey">Usuario registrado correctamente!</div>
        </div>

        <q-space />

        <q-btn flat round icon="close" @click="closePopUp" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref} from 'vue'
import {signUp} from '../utils/api/post.js'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { notifyError,notifySuccess } from 'src/utils/utils.js'
const router = useRouter()
const props = defineProps({
  signup: Boolean,
})
const signupInjector = ref(props.signup)
const name = ref('')
const email = ref('')
const password = ref('')
const created = ref(false)
const close = () => {
  signUp.value = false
}
const closePopUp = () => {
  created.value = false
}
const signUpAction = async () => {
  const user = {
    name: name.value,
    email: email.value,
    password: md5(password.value),
  }
  try {
    const response = await signUp(user)
    if(!response.data.error.status){
      notifySuccess('Registered succsesfull!')
      router.push({ name: 'login' })
      close()
    }
    else{
      notifyError('error en el registro')
    }

  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.form {
  min-width: 350px;
  padding: 2rem;
}
</style>
