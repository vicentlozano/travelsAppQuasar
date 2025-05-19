<template>
  <div>
    <section class="profile">
      <div class="avatar-section">
        <q-avatar color="primary" text-color="white" size="200px" class="avatar">
          <img v-if="auth.avatar" :src="auth.avatar" />
          <span v-else>{{ auth.username?.charAt(0) }}</span>
        </q-avatar>
        <q-badge
          @click="showDialog = true"
          color="grey"
          floating
          rounded
          align="bottom"
          class="badge-avatar"
        >
          <q-icon name="edit" color="black" size="23px"></q-icon>
        </q-badge>
      </div>
      <section class="info">
        <div class="form">
          <span class="title">Nombre</span>
          <q-separator vertical />
          <p>{{ auth.username }}</p>
          <q-separator vertical />
          <q-input
            ref="nameInput"
            v-model="textName"
            name="username"
            for="username"
            outlined
            dense
            clearable
            lazy-rules
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                round
                icon="save"
                @click="saveName"
                :disable="!textName || textName.trim() === ''"
                class="save-icon"
              />
            </template>
          </q-input>
        </div>
        <q-separator />
        <div class="formPassword">
          <span class="title">Correo</span>
          <q-separator vertical />

          <p>{{ auth.email }}</p>
          <q-separator vertical />

          <q-btn @click="showPasswordDialog = true">Change password</q-btn>
        </div>
      </section>

      <section class="conf">
        <q-btn class="close-account" @click="closeAccount">Close account</q-btn>

        <q-btn @click="logout">Logout</q-btn>
      </section>
    </section>
    <DialogPhoto :show="showDialog" @close-dialog="closeDialog" />
    <DialogPassword :show="showPasswordDialog" @close-dialog="closePasswordDialog" />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

import DialogPhoto from 'src/components/DialogPhoto.vue'
import DialogPassword from 'src/components/DialogPassword.vue'
import { useRouter } from 'vue-router'
import { notifyErrorCenter } from 'src/utils/utilsNotify'
import { updateName } from 'src/utils/api'
import { useUserStore } from '../stores/user'

//data
const router = useRouter()
const mqtt = inject('appGlobal/mqtt')
const showDialog = ref(false)
const showPasswordDialog = ref(false)
const textName = ref('')
const nameInput = ref(null)
const auth = useUserStore()

//methods
const closeAccount = () => {}

const logout = () => {
  mqtt.unSubscribeFromAllTopics()
  auth.deleteUser()
  router.push({ name: 'login' })
}
const closeDialog = (bool) => {
  showDialog.value = bool
}
const closePasswordDialog = (bool) => {
  showPasswordDialog.value = bool
}

const saveName = async () => {
  const nativeEl = nameInput.value?.$el?.querySelector('input')
  nativeEl?.blur()
  nameInput.value?.blur()
  try {
    const response = await updateName({ userId: auth.userId, username: textName.value })
    if (!response.data.error.status) {
      auth.setName(textName.value)
      nameInput.value?.reset()
      textName.value = ''
    } else {
      notifyErrorCenter('Error updating name')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: min-content min-content min-content;
  justify-content: center;
  align-content: top;
  place-items: center;
  gap: 2rem;
  padding: 2rem;
}
.badge-avatar {
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  top: 165px;
  left: 80%;
  transform: translateX(-50%);
  place-content: center;
}
p {
  margin: 0;
}
.badge-avatar:hover {
  cursor: pointer;
}
.avatar-section {
  position: relative;
  display: inline-block;
  height: fit-content;
  width: fit-content;
}
.avatar {
  overflow: hidden;
  box-shadow: 0 0 12px 4px rgba(40, 142, 167, 0.6);
}
.info {
  display: grid;
  grid-template-rows: 1fr min-content 1fr;
  padding: 0rem 1rem;
  background-color: rgb(217, 225, 226);
  border-radius: 15px;
}
.form {
  display: grid;
  grid-template-columns: 1fr min-content 2fr min-content 1fr;
  gap: 0.5rem;
  place-items: center;
  padding: 1rem;
}
.formPassword {
  display: grid;
  grid-template-columns: 1fr min-content 2fr min-content 1fr;
  place-items: center;
  gap: 0.5rem;
  padding: 1rem;
}
.title {
  font-weight: bold;
  text-align: center;
}
.conf {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
.close-account {
  background-color: rgba(255, 0, 0, 0.596);
}
.save-icon:hover {
  cursor: pointer;
}
</style>
