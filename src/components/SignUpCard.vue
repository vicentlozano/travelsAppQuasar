<template>
  <section class="register-card">
    <h5 class="title">{{ text[step] }}</h5>
    <q-form @submit.prevent class="custom">
      <section v-if="step === 0" class="inputs-name">
        <q-input
          outlined
          ref="nameRef"
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
          ref="lastNameRef"
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
          filled
          v-model="dateStamp"
          mask="date"
          ref="dateRef"
          :rules="[
            (val) => {
              if (!val) return 'Please enter a date'
              const inputDate = new Date(val)
              const today = new Date()
              if (inputDate > today) return 'The date cannot be in the future'
              return true
            },
          ]"
          dense
          bg-color="white"
          class="input"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateStamp" :locale="myLocale">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          stack-label
          label="Gender"
          ref="genderRef"
          transition-show="flip-up"
          transition-hide="flip-down"
          filled
          dense
          bg-color="white"
          v-model="gender"
          :options="optionsGender"
          class="input"
          :rules="[(val) => (val && val.length > 0) || 'Please select something']"
        />
      </section>
      <section v-if="step === 2" class="inputs-email">
        <q-input
          outlined
          label="Email"
          stack-label
          v-model="email"
          ref="emailRef"
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
          ref="passwordRef"
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
          :rules="[
            (val) => !!val || 'Please type a password',
            (val) => /[A-Z]/.test(val) || 'Must contain at least one uppercase letter',
            (val) => /\d/.test(val) || 'Must contain at least one number',
          ]"
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
          ref="repeatPasswordRef"
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
          :rules="[
            (val) => {
              if (!val) return 'Please repeat the password'
              if (val !== password) return 'Passwords do not match'
              return true
            },
          ]"
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
      <section v-if="step === 3" class="avatar">
        <q-avatar size="200px" font-size="52px" text-color="white" color="teal">
          <img v-if="imageUrl" :src="imageUrl" />
          <p class="initial" v-else>{{ name.charAt(0).toUpperCase() }}</p>
        </q-avatar>
        <q-file
          style="width: 250px"
          v-model="imageFile"
          filled
          name="avatar"
          label-color="white"
          label="Add your photo"
          @rejected="onRejected"
          @update:model-value="onFileChange"
        >
          <template v-slot:append>
            <q-icon
              v-if="imageFile !== null"
              name="close"
              @click.stop.prevent="((imageFile = null), (imageUrl = null))"
              class="cursor-pointer"
            />
            <q-icon v-if="imageFile === null" round dense flat name="cloud_upload" />
          </template>
        </q-file>
      </section>
      <section :class="step > 0 ? 'buttons' : 'only-button'">
        <q-btn v-if="step > 0" class="button left" rounded label="Back" @click="step--" />
        <q-btn
          v-if="step >= 0 && step < 3"
          class="button right"
          rounded
          label="Next"
          @click="nextStep"
        />
        <q-btn
          v-else
          class="button right"
          rounded
          label="SUBMIT"
          type="button"
          @click="signUpAction"
        />
      </section>
    </q-form>
  </section>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card>
      <q-card-section class="row items-center q-pb-none text-h6">
        Registered successfully.
      </q-card-section>

      <q-card-section>Go to your messages to verify the email address!</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from '../utils/api/post.js'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { notifyError, notifySuccess } from 'src/utils/utils.js'
import moment from 'moment'
const router = useRouter()
const step = ref(0)
const name = ref('')
const lastName = ref('')
const dateStamp = ref(moment().format('YYYY/MM/DD'))
const gender = ref('')
const imageUrl = ref(null)
const optionsGender = ['Male', 'Female', 'Rather not say', 'Other']
const text = [
  'Enter your name',
  'Enter your birthday and gender',
  'Enter your email and create a strong password',
  'Upload your profile photo',
]
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const imageFile = ref(null)
const isPwd = ref(true)
const isPwd2 = ref(true)
const nameRef = ref(null)
const lastNameRef = ref(null)
const dateRef = ref(null)
const genderRef = ref(null)
const emailRef = ref(null)
const passwordRef = ref(null)
const repeatPasswordRef = ref(null)
const dialog = ref(null)

//methods
const onFileChange = () => {
  imageUrl.value = URL.createObjectURL(imageFile.value)
}
const signUpAction = async () => {
  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('lastName', lastName.value)
    formData.append('birthday', dateStamp.value)
    formData.append('gender', gender.value)
    formData.append('email', email.value)
    formData.append('password', md5(password.value))

    if (imageFile.value) {
      formData.append('avatar', imageFile.value)
    }

    const response = await signUp(formData)
    if (!response.data.error.status) {
      notifySuccess('Registered successfully!')
      dialog.value = true

      router.push({ name: 'login' })
      close()
    } else {
      notifyError('Error en el registro')
    }
  } catch (error) {
    console.log(error)
  }
}

const nextStep = async () => {
  switch (step.value) {
    case 0: {
      let validName = await nameRef.value.validate()
      let validLast = await lastNameRef.value.validate()
      if (validName && validLast) step.value++
      break
    }
    case 1: {
      let validDate = await dateRef.value.validate()
      let validGender = await genderRef.value.validate()
      if (validDate && validGender) step.value++
      break
    }
    case 2: {
      let validEmail = await emailRef.value.validate()
      let validPassword = await passwordRef.value.validate()
      let validRepeatPassword = await repeatPasswordRef.value.validate()
      if (validEmail && validPassword && validRepeatPassword) step.value++
      break
    }
    default:
      break
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
  width: 450px;
  height: 500px;
  display: grid;
  gap: 1rem;
  grid-template-rows: 1fr 4fr;
  text-align: center;
  padding: 2rem 2rem 0 2rem;
  background-color: #70858fb2;
  border-radius: 25px;
  place-items: center;
  align-content: center;
}
.title {
  color: white;
  font-weight: bolder;
  letter-spacing: 0.05em;
}

.buttons {
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.6rem;
}
.only-button {
  display: flex;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  padding-bottom: 0.6rem;
  justify-content: right;
}
.button {
  width: 8rem;
  background: linear-gradient(-127deg, $gray-accent 50%, $blue-gray 67%);
  background-size: 800% 800%;
  animation: gradient 10s ease infinite;
  color: white;
}
.input {
  width: 250px;
}
.date {
  width: 8rem;
}
.inputs-email {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.1rem;
  width: 100%;
  height: fit-content;
  align-self: center;
  place-items: center;
}
.inputs-name {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.7rem;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin: 0;
}
.custom {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 1fr;
  justify-items: space-between;
  align-items: center;
}
.date-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  gap: 1.5rem;
}
.avatar {
  display: grid;
  grid-template-rows: 2fr 1fr;
  justify-content: center;
  place-items: center;
  gap: 0.3rem;
  justify-content: center;
}
.initial {
  margin: 0;
  font-weight: 600;
}
.no-click {
  z-index: 0;
}
</style>
