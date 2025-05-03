<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    animated
    type="horizontal"
    done-color="deep-orange"
    active-color="purple"
    inactive-color="secondary"
    class="full transparent"
    style="width: 600px"
    contracted
    dark
    header-class="background-header"
  >
    <q-step :name="0" icon="account_circle" :done="step > 0">
      <section class="inputs-name">
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
    </q-step>
    <q-step :name="1" icon="event" :done="step > 1">
      <section v-if="step === 1" class="inputs-name" transition-hide="jump-up">
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
    </q-step>
    <q-step :name="2" icon="password" :done="step > 2">
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
    </q-step>
    <q-step :name="3" icon="add_a_photo" :done="step > 3">
      <section v-if="step === 3" class="avatar">
        <q-avatar size="149.60px" font-size="52px" text-color="white" color="teal">
          <img v-if="imageUrl" :src="imageUrl" />
          <p class="initial" v-else>{{ name.charAt(0).toUpperCase() }}</p>
        </q-avatar>
        <q-file
          style="width: 250px"
          v-model="imageFile"
          filled
          dense
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
    </q-step>
    <section class="buttons">
      <q-btn v-if="step > 0" class="button left" label="Back" @click="step--" />
      <q-btn v-if="step >= 0 && step < 3" class="button right" label="Next" @click="nextStep" />
      <q-btn v-else class="button right" label="SUBMIT" type="button" @click="signUpAction" />
    </section>
    <template v-slot:navigation>
      <q-stepper-navigation class="buttons">
        <q-btn v-if="step > 0" label="Back" @click="step--" class="button left" />
        <q-btn v-if="step >= 0 && step < 3" label="Next" class="button right" @click="nextStep" />
        <q-btn v-else label="SUBMIT" class="button right" type="button" @click="signUpAction" />
      </q-stepper-navigation>
    </template>
    <template v-slot:message>
      <q-banner v-if="step === 0" class="bg-purple-8 text-white q-px-lg">
        {{ text[0] }}
      </q-banner>
      <q-banner v-else-if="step === 1" class="bg-orange-8 text-white q-px-lg">
        {{ text[1] }}
      </q-banner>
      <q-banner v-else-if="step === 2" class="bg-green-8 text-white q-px-lg">
        {{ text[2] }}
      </q-banner>
      <q-banner v-else class="bg-blue-8 text-white q-px-lg">
        {{ text[3] }}
      </q-banner>
    </template>
  </q-stepper>
  <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
    <q-card>
      <q-card-section class="row items-center q-pb-none text-h6">
        Registered successfully.
      </q-card-section>

      <q-card-section>Go to your messages to verify the email address!</q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Close"
          color="primary"
          v-close-popup
          @click="
            router.push({ name: 'login' }),
            close()
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from '../utils/api/post.js'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { notifyError } from 'src/utils/utilsNotify.js'
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
  'Enter your name and last name',
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
      dialog.value = true
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
.full-transparent {
  background-color: transparent;
}

.plus {
  padding: 4rem;
}
.title {
  color: white;
  font-weight: bolder;
  letter-spacing: 0.05em;
  width: 100%;
  font-size: 1.6em;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  width: 100%;
  align-items: center;
  margin: 0;
  padding-top: 0.5rem;
  justify-content: space-around;
  background-color: #22202063;
}

.button {
  width: 100%;
  background-color: $blue-gray;
  color: white;
}
.left {
  grid-column: 1/2;
}
.right {
  grid-column: 2/2;
}
.input {
  width: 100%;
}

.inputs-email {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  gap: 0.7rem;
  margin: 0;
}
.inputs-name {
  display: grid;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  place-items: center;
  gap: 0.7rem;
  margin: 0;
  padding: 35.61px 0rem;
}

.avatar {
  display: grid;
  grid-template-rows: 2fr min-content;
  justify-content: center;
  place-items: center;
  gap: 0.8rem;
  justify-content: center;
}
.initial {
  margin: 0;
  font-weight: 600;
}

::v-deep(.q-stepper__header) {
  background-color: rgb(44, 41, 41);
}
::v-deep(.q-stepper__line)::before,
::v-deep(.q-stepper__line)::after {
  background-color: rgba(255, 255, 255, 0.401) !important;
}
::v-deep(.q-stepper__content.q-panel-parent) {
  background-color: #22202063;
}
@media (max-width: 730px) {
  .full {
    margin: 2.6rem;
  }
}
</style>
