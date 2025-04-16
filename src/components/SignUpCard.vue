<template>
  <section class="register-card">
    <h5 class="title">{{ text[step] }}</h5>
    <q-form @submit.prevent class="q-gutter-md custom">
      <section v-if="step === 0" class="inputs-name">
        <q-input
          outlined
          label="First name"
          stack-label
          v-model="name"
          class="input"
          filled
          type="name"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          outlined
          label="Last Name"
          stack-label
          class="input"
          v-model="lastName"
          filled
          type="lastname"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </section>
      <section v-if="step === 1" class="inputs-name">
        <q-input
          outlined
          label="Day"
          stack-label
          v-model="day"
          class="input"
          filled
          type="day"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          outlined
          label="Month"
          stack-label
          class="input"
          v-model="month"
          filled
          type="month"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          outlined
          label="Year"
          stack-label
          class="input"
          v-model="year"
          filled
          type="year"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-select
          stack-label
          label="Gender"
          transition-show="flip-up"
          transition-hide="flip-down"
          filled
          dense
          bg-color="white"
          v-model="gender"
          :options="optionsGender"
          style="width: 250px"
        />
      </section>
      <section v-if="step === 2" class="inputs-email">
        <q-input
          outlined
          label="Email"
          stack-label
          v-model="email"
          class="input"
          filled
          type="email"
          @keyup.enter="prompt = false"
          lazy-rules
          dense
          bg-color="white"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-input
          v-model="password"
          label="Password"
          outlined
          dense
          class="input"
          stack-label
          filled
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
        <q-input
          v-model="repeatPassword"
          label="Repeat Password"
          outlined
          dense
          stack-label
          class="input"
          filled
          bg-color="white"
          :type="isPwd2 ? 'password' : 'text'"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
      </section>
    </q-form>
    <section v-if="!allData" :class="step > 0 ? 'buttons' : 'only-button'">
      <q-btn v-if="step > 0" class="button left" rounded label="Back" @click="step--" />
      <q-btn class="button right" rounded label="Next" @click="step++" />
    </section>
    <section v-else class="buttons">
      <q-btn class="button right" rounded label="Next" type="button"  @click="signUpAction"/>
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from '../utils/api/post.js'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { notifyError, notifySuccess } from 'src/utils/utils.js'
const router = useRouter()
const step = ref(0)
const name = ref('')
const lastName = ref('')
const day = ref(null)
const month = ref(null)
const year = ref(null)
const gender = ref('')
const optionsGender = ['Male', 'Female', 'Rather not say', 'Other']
const text = [
  'Enter your name',
  'Enter your birthday and gender',
  'Enter your email and create a strong password',
  'upload your profile photo',
]
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const isPwd = ref(true)
const isPwd2 = ref(true)

const signUpAction = async () => {
  const user = {
    name: name.value,
    email: email.value,
    password: md5(password.value),
  }
  try {
    const response = await signUp(user)
    if (!response.data.error.status) {
      notifySuccess('Registered succsesfull!')
      router.push({ name: 'login' })
      close()
    } else {
      notifyError('error en el registro')
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
.register-card {
  width: 570px;
  height: 500px;
  display: grid;
  gap: 1rem;
  grid-template-rows: 1fr 3fr;
  text-align: center;
  padding: 2rem 2rem 0 2rem;
  background-color: $gray-accent;
  border-radius: 25px;
  place-items: center;
  justify-content: center;
}
.title {
  color: white;
  font-weight: bolder;
  letter-spacing: 0.05em;
}
.inputs-name {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.7rem;
  width: 100%;
  align-self: center;
  place-items: center;
  margin: 0;
}
.buttons {
  display: grid;
  grid-template-columns: 130px 130px;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.6rem;
}
.only-button {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 30%;
  align-items: right;
  justify-self: right;
  padding-bottom: 0.6rem;
}
.button {
  width: 8rem;
  background: linear-gradient(-127deg, $gray-accent 50%, $blue-gray 67%);
  background-size: 800% 800%;
  animation: gradient 10s ease infinite;
  color: white;
}
.input {
  min-width: 300px;
}
.inputs-email {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.7rem;
  width: 100%;
  align-self: center;
  place-items: center;
}
.custom {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 0.2fr;
}
</style>
