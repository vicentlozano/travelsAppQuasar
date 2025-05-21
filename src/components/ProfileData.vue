<template>
  <div class="center">
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
        <q-separator spaced color="secondary" />

        <div class="form">
          <span class="title">Nombre</span>
          <p v-if="!editUserName" class="data">
            {{ auth.username
            }}<q-btn
              @click="editUserName = true"
              flat
              icon="edit"
              size="8px"
              class="btn-edit"
            ></q-btn>
          </p>
          <q-input
            v-if="editUserName"
            ref="nameInput"
            v-model="textName"
            name="username"
            for="username"
            class="custom-input"
            dense
            autofocus
            @blur="editUserName = false"
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
        <q-separator spaced color="secondary" />
        <div class="email">
          <span class="title">Correo</span>

          <p class="data">{{ auth.email }} </p>
        </div>
        <q-separator spaced color="secondary" />

        <div class="formPassword">
          <span class="title">Password</span>

          <q-btn
            @click="showPasswordDialog = true"
            flat
            rounded
            color="primary"
            label="Change password"
          />
        </div>
        <q-separator spaced color="secondary" />
      </section>

      <section class="conf">
        <q-btn
          class="close-account"
          outline
          color="red"
          label="Close account"
          @click="closeAccount"
        />

        <q-btn class="custom-btn" outline  color="primary" label="Logout" @click="logout" />
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
const editUserName = ref(false)
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
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}
.profile {
  display: grid;
  height: 100%;
  width: 80%;
  max-width: 1400px;
  grid-template-rows: min-content min-content min-content;
  align-content: top;
  justify-items: center;
  place-items: center;
  gap: 2rem;
  padding: 5rem 0.3rem 3.8rem 0.3rem;
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
  width: 100%;
  text-align: right;
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
  grid-template-rows: min-content 1fr min-content 1fr min-content 1fr min-content;
  border-radius: 15px;
  width: 100%;
  gap: 0.7rem;
}
.form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0.5rem;
  place-items: center;
}
.formPassword {
  display: flex;
  justify-content: space-between;
  place-items: center;
  gap: 0.5rem;
}
.email {
  display: grid;
  grid-template-columns: 1fr 3fr;
  place-items: center;
}
.title {
  font-weight: bold;
  text-align: left;
  width: 100%;
  padding-left: 2rem;
}
.conf {
  display: flex;
  flex-direction: row;
  gap: 4rem;
}
.close-account {
  background-color: rgba(255, 0, 0, 0.596);
  padding: 0.3rem;
}
.save-icon:hover {
  cursor: pointer;
}
.custom-input {
  align-self: self-end;
}
.custom-btn {
    padding: 0.5rem;

}.data{
  padding-right: 1rem;
}
@media (max-width: 450px) {
  .info {
    display: grid;
    grid-template-rows: min-content 1fr min-content 1fr min-content 1fr min-content;
    border-radius: 15px;
    width: 100%;
    gap: 0.3rem;
  }
  .profile {
    display: grid;
    height: 100%;
    width: 80%;
    grid-template-rows: min-content min-content min-content;
    align-content: top;
    justify-items: center;
    place-items: center;
    gap: 2rem;
  }
  .avatar {
    height: 150px;
    width: 150px;
  }
  .badge-avatar {
    top: 119px;
  }
}
@media (max-width: 400px) {
   .profile {
    display: grid;
    height: 100%;
    width: 80%;
    grid-template-rows: min-content min-content min-content;
    align-content: top;
    padding: 5rem 0.3rem 3.8rem 0.3rem;
    justify-items: center;
    place-items: center;
    gap: 2rem;
  }
}

</style>
