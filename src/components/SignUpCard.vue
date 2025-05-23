<template>
  <section
    class="register-page"
    :style="{ width: !mobilView ? '388px' : windowWidth + 'px', padding: '0rem 1rem' }"
  >
    <article class="icon-app">
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-label="Spotify"
        aria-hidden="false"
        height="100%"
        data-encore-id="logoSpotify"
        class="Svg-sc-6c3c1v-0 jlGQTA"
      >
        <title>Spotify</title>
        <path
          d="M13.427.01C6.805-.253 1.224 4.902.961 11.524.698 18.147 5.853 23.728 12.476 23.99c6.622.263 12.203-4.892 12.466-11.514S20.049.272 13.427.01m5.066 17.579a.717.717 0 0 1-.977.268 14.4 14.4 0 0 0-5.138-1.747 14.4 14.4 0 0 0-5.42.263.717.717 0 0 1-.338-1.392c1.95-.474 3.955-.571 5.958-.29 2.003.282 3.903.928 5.647 1.92a.717.717 0 0 1 .268.978m1.577-3.15a.93.93 0 0 1-1.262.376 17.7 17.7 0 0 0-5.972-1.96 17.7 17.7 0 0 0-6.281.238.93.93 0 0 1-1.11-.71.93.93 0 0 1 .71-1.11 19.5 19.5 0 0 1 6.94-.262 19.5 19.5 0 0 1 6.599 2.165c.452.245.62.81.376 1.263m1.748-3.551a1.147 1.147 0 0 1-1.546.488 21.4 21.4 0 0 0-6.918-2.208 21.4 21.4 0 0 0-7.259.215 1.146 1.146 0 0 1-.456-2.246 23.7 23.7 0 0 1 8.034-.24 23.7 23.7 0 0 1 7.657 2.445c.561.292.78.984.488 1.546m13.612-.036-.832-.247c-1.67-.495-2.14-.681-2.14-1.353 0-.637.708-1.327 2.264-1.327 1.539 0 2.839.752 3.51 1.31.116.096.24.052.24-.098V6.935c0-.097-.027-.15-.098-.203-.83-.62-2.272-1.07-3.723-1.07-2.953 0-4.722 1.68-4.722 3.59 0 2.157 1.371 2.91 3.626 3.546l.973.274c1.689.478 1.998.902 1.998 1.556 0 1.097-.831 1.433-2.07 1.433-1.556 0-3.457-.911-4.35-2.025-.08-.098-.177-.053-.177.062v2.423c0 .097.01.141.08.22.743.814 2.52 1.53 4.59 1.53 2.546 0 4.456-1.485 4.456-3.784 0-1.787-1.052-2.865-3.625-3.635m10.107-1.76c-1.68 0-2.653 1.026-3.219 2.052V9.376c0-.08-.044-.124-.124-.124h-2.22c-.079 0-.123.044-.123.124V20.72c0 .08.044.124.124.124h2.22c.079 0 .123-.044.123-.124v-4.536c.566 1.025 1.521 2.034 3.237 2.034 2.264 0 3.89-1.955 3.89-4.581s-1.644-4.545-3.908-4.545m-.654 6.986c-1.185 0-2.211-1.167-2.618-2.458.407-1.362 1.344-2.405 2.618-2.405 1.211 0 2.051.92 2.051 2.423s-.84 2.44-2.051 2.44m40.633-6.826h-2.264c-.08 0-.115.017-.15.097l-2.282 5.483-2.29-5.483c-.035-.08-.07-.097-.15-.097h-3.661v-.584c0-.955.645-1.397 1.476-1.397.496 0 1.035.256 1.415.486.089.053.15-.008.115-.088l-.796-1.901a.26.26 0 0 0-.124-.133c-.389-.203-1.025-.38-1.644-.38-1.875 0-2.954 1.432-2.954 3.254v.743h-1.503c-.08 0-.124.044-.124.124v1.768c0 .08.044.124.124.124h1.503v6.668c0 .08.044.123.124.123h2.264c.08 0 .124-.044.124-.123v-6.668h1.936l2.812 6.11-1.512 3.325c-.044.098.009.142.097.142h2.414c.08 0 .116-.018.15-.097l4.997-11.355c.035-.08-.009-.141-.097-.141M54.964 9.04c-2.865 0-4.837 2.025-4.837 4.616 0 2.573 1.971 4.616 4.837 4.616 2.856 0 4.846-2.043 4.846-4.616 0-2.591-1.99-4.616-4.846-4.616m.008 7.065c-1.37 0-2.343-1.043-2.343-2.45 0-1.405.973-2.449 2.343-2.449 1.362 0 2.335 1.043 2.335 2.45 0 1.406-.973 2.45-2.335 2.45m33.541-6.334a1.24 1.24 0 0 0-.483-.471 1.4 1.4 0 0 0-.693-.17q-.384 0-.693.17a1.24 1.24 0 0 0-.484.471q-.174.302-.174.681 0 .375.174.677.175.3.484.471t.693.17.693-.17.483-.471.175-.676q0-.38-.175-.682m-.211 1.247a1 1 0 0 1-.394.39 1.15 1.15 0 0 1-.571.14 1.16 1.16 0 0 1-.576-.14 1 1 0 0 1-.391-.39 1.14 1.14 0 0 1-.14-.566q0-.316.14-.562t.391-.388.576-.14q.32 0 .57.14.253.141.395.39t.142.565q0 .312-.142.56m-19.835-5.78c-.85 0-1.468.6-1.468 1.396s.619 1.397 1.468 1.397c.866 0 1.485-.6 1.485-1.397 0-.796-.619-1.397-1.485-1.397m19.329 5.19a.31.31 0 0 0 .134-.262q0-.168-.132-.266-.132-.099-.381-.099h-.588v1.229h.284v-.489h.154l.374.489h.35l-.41-.518a.5.5 0 0 0 .215-.084m-.424-.109h-.26v-.3h.27q.12 0 .184.036a.12.12 0 0 1 .065.116.12.12 0 0 1-.067.111.4.4 0 0 1-.192.037M69.607 9.252h-2.263c-.08 0-.124.044-.124.124v8.56c0 .08.044.123.124.123h2.263c.08 0 .124-.044.124-.123v-8.56c0-.08-.044-.124-.124-.124m-3.333 6.605a2.1 2.1 0 0 1-1.053.257c-.725 0-1.185-.425-1.185-1.362v-3.484h2.211c.08 0 .124-.044.124-.124V9.376c0-.08-.044-.124-.124-.124h-2.21V6.944c0-.097-.063-.15-.15-.08l-3.954 3.113c-.053.044-.07.088-.07.16v1.007c0 .08.044.124.123.124h1.539v3.855c0 2.087 1.203 3.06 2.918 3.06.743 0 1.46-.194 1.884-.442.062-.035.07-.07.07-.133v-1.68c0-.088-.044-.115-.123-.07"
          transform="translate(-0.95,0)"
        ></path>
      </svg>
    </article>
    <h2 class="title-register">{{ $t('registerMessage') }}</h2>
    <q-stepper
      v-model="step"
      ref="stepper"
      animated
      flat
      type="horizontal"
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
      style="width: 100%"
      class="full-transparent"
      contracted
      :transition-next="step===2? 'fade' : 'slide-right'"
      :transition-prev="step===1? 'fade' : 'slide-right'"

      dark
      header-class="background-header"
    >
      <q-step :name="0" icon="account_circle" :done="step > 0" title="">
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
      <q-step :name="1" icon="event" :done="step > 1" title="">
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
      </q-step>
      <q-step :name="2" icon="password" :done="step > 2" title="">
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
      <q-step :name="3" icon="add_a_photo" :done="step > 3" title="">
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
          <q-btn v-if="step === 0" icon="home" @click="router.push({name: 'login'})" class="button left" />
          <q-btn v-if="step > 0" label="Back" @click="step--" class="button left" />
          <q-btn v-if="step >= 0 && step < 3" label="Next" class="button right" @click="nextStep" />
          <q-btn v-else label="SUBMIT" class="button right" type="button" @click="signUpAction" />
        </q-stepper-navigation>
      </template>
      <template v-slot:message>
        <q-banner v-if="step === 0" class="bg-purple-8 text-white q-px-lg text-center">
          {{ text[0] }}
        </q-banner>
        <q-banner v-else-if="step === 1" class="bg-orange-8 text-white q-px-lg text-center">
          {{ text[1] }}
        </q-banner>
        <q-banner v-else-if="step === 2" class="bg-green-8 text-white q-px-lg text-center">
          {{ text[2] }}
        </q-banner>
        <q-banner v-else class="bg-blue-8 text-white q-px-lg text-center">
          {{ text[3] }}
        </q-banner>
      </template>
    </q-stepper>
    <q-dialog v-model="dialog" backdrop-filter="blur(4px) saturate(150%)">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          Registered successfully.
        </q-card-section>

        <q-card-section>{{ $t('reigsterSuccesfull') }}</q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Close"
            color="primary"
            v-close-popup
            @click="(router.push({ name: 'login' }), close())"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signUp } from '../utils/api/post.js'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { notifyError } from 'src/utils/utilsNotify.js'
import moment from 'moment'
const router = useRouter()

//data
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
const mobilView = ref(null)
let windowWidth = ref(window.innerWidth)
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
const updateWidth = () => {
  windowWidth.value = window.innerWidth
  windowWidth.value < 480 ? (mobilView.value = true) : (mobilView.value = false)
}

//hooks

onMounted(() => {
  mobilView.value = window.innerWidth < 480
  window.addEventListener('resize', updateWidth)
})
</script>

<style lang="scss" scoped>
.icon-app {
  display: flex;
  place-content: center;
  width: 100%;
  height: 30px;
}
.register-page {
  display: grid;
  grid-template-rows: min-content min-content min-content;
  height: 100%;
  gap: 1rem;
  padding: 12rem 0rem;
  place-items: center;
  align-content: center;
}
.title-register {
  text-align: center;
  color: white;
  font-size: 2.5em;
  font-weight: 500;
  width: 100%;
}
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
  justify-content: space-around;
  background-color: #22202000;
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
  gap: 0.4rem;
  margin: 0;
  padding: 0.7rem 0rem;
}

.avatar {
  display: grid;
  grid-template-rows: 2fr min-content;
  justify-content: center;
  place-items: center;
  gap: 2rem;
  padding: 1rem;
  justify-content: center;
}
.initial {
  margin: 0;
  font-weight: 600;
}
::v-deep(.q-stepper){
  align-self: flex-start;
}
::v-deep(.q-stepper__header) {
  background-color: rgba(44, 41, 41, 0);
}
::v-deep(.q-stepper__line)::before,
::v-deep(.q-stepper__line)::after {
  background-color: rgba(255, 255, 255, 0.849) !important;
}
::v-deep(.q-stepper__content.q-panel-parent) {
  align-self: start;
}
@media(max-width: 480px){
.title-register{
  font-size: 2.3em;
}
}
</style>
