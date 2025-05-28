<template>
  <q-dialog
    v-model="isShow"
    @hide="emits('close-dialog', false)"
    backdrop-filter="blur(5px) saturate(150%)"
  >
    <div class="password-dialog">
      <section class="inputs-email">
        <q-input
          ref="oldPasswordRef"
          v-model="oldPassword"
          label="Old Password"
          outlined
          dense
          class="input"
          stack-label
          filled
          :type="isOldPwd2 ? 'password' : 'text'"
          lazy-rules
          :rules="[
            (val) => !!val || 'Please type a password',
            (val) => /[A-Z]/.test(val) || 'Must contain at least one uppercase letter',
            (val) => /\d/.test(val) || 'Must contain at least one number',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isOldPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isOldPwd2 = !isOldPwd2"
            />
          </template>
        </q-input>
        <q-input
          ref="passwordRef"
          v-model="password"
          label="New Password"
          outlined
          dense
          class="input"
          stack-label
          filled
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
          label="Repeat New Password"
          outlined
          dense
          stack-label
          class="input"
          filled
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
      <q-card-actions align="center" class="buttons">
        <q-btn
          outline
          color="primary"
          class="button"
          label="Cancel"
          @click="emits('close-dialog', false)"
          v-close-popup
        />
        <q-btn
          outline
          color="primary"
          label="OK"
          @click="onOKClick"
          class="button"
          :disable="!isFormValid"
        />
      </q-card-actions>
    </div>
  </q-dialog>
</template>

<script setup>
import { notifyErrorCenter, notifySuccessCenter } from 'src/utils/utilsNotify'
import { useUserStore } from '../stores/user'
import { ref, watch, computed } from 'vue'
import { resetPassword } from 'src/utils/api'
import md5 from 'md5'

// props && emits
const emits = defineEmits(['close-dialog'])
const props = defineProps({
  show: Boolean,
})
const isShow = ref(false)
const auth = useUserStore()
const oldPassword = ref('')
const password = ref('')
const repeatPassword = ref('')
const oldPasswordRef = ref(null)
const passwordRef = ref(null)
const repeatPasswordRef = ref(null)
const isPwd = ref(true)
const isPwd2 = ref(true)
const isOldPwd2 = ref(true)

//computed
const isFormValid = computed(() => {
  const oldValid =
    !!oldPassword.value && /[A-Z]/.test(oldPassword.value) && /\d/.test(oldPassword.value)

  const newValid = !!password.value && /[A-Z]/.test(password.value) && /\d/.test(password.value)

  const repeatValid = repeatPassword.value === password.value && !!repeatPassword.value

  return oldValid && newValid && repeatValid
})
//watch
watch(
  () => props.show,
  (newValue) => {
    isShow.value = newValue
  },
)

//methods
const onOKClick = async () => {
  let validOldPassword = await oldPasswordRef.value.validate()
  let validPassword = await passwordRef.value.validate()
  let validRepeatPassword = await repeatPasswordRef.value.validate()
  if (validOldPassword && validPassword && validRepeatPassword) {
    try {
      const response = await resetPassword({
        userId: auth.userId,
        oldPassword: md5(oldPassword.value),
        newPassword: md5(password.value),
      })
      if (!response.data.error.status) {
        notifySuccessCenter('Password updated succesfully!')
        emits('close-dialog', false)
      } else {
        notifyErrorCenter(response.data.error.source)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.password-dialog {
  display: grid;
  grid-template-rows: 1fr min-content;
  border-radius: 20px;
  place-items: center;
  justify-content: center;
  height: fit-content;
  padding: 2rem 1rem 1rem 1rem;
  gap: 0.4rem;
  width: 40%;
  background-color: white;
}
.password {
  display: grid;
  grid-template-rows: min-content min-content;
  justify-items: center;
  align-content: center;
  gap: 1rem;
  background-color: transparent;
}
.buttons {
  display: flex;
  justify-items: space-around;
  place-items: center;
  width: 100%;
  gap: 1rem;
}
.button {
  width: 90px;
  border-radius: 30px;
  padding: 0rem 0rem;
  margin: 0;
}
.inputs-email {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  place-items: center;
  gap: 0.7rem;
  margin: 0;
}
.input {
  width: 250px;
}
@media (max-width: 600px) {
  .password-dialog {
    display: grid;
    grid-template-rows: 1fr min-content;
    border-radius: 20px;
    place-items: center;
    height: fit-content;
    width: 90%;
  }
}
</style>
