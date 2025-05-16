<template>
  <div class="page-basic">
    <HeaderComponent />
    <div class="panels">
      <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
        <q-tab class="text-purple full" name="profile" label="Profile" />
        <q-tab class="text-orange" name="contacts" label="Contacts" />
        <q-tab class="text-teal" name="social" label="Social" />
      </q-tabs>

      <div>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="full"
        >
          <q-tab-panel name="profile">
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
          </q-tab-panel>
          <q-tab-panel name="contacts">
            <section class="contacts"></section>
          </q-tab-panel>
          <q-tab-panel name="social">
            <section class="social"></section>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
  <DialogPhoto :show="showDialog" @close-dialog="closeDialog" />
  <DialogPassword :show="showPasswordDialog" @close-dialog="closePasswordDialog" />
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import DialogPhoto from 'src/components/DialogPhoto.vue'
import { notifyErrorCenter } from 'src/utils/utilsNotify'
import { updateName } from 'src/utils/api'
import DialogPassword from 'src/components/DialogPassword.vue'

//data
const auth = useUserStore()
const router = useRouter()
const mqtt = inject('appGlobal/mqtt')
const tab = ref('profile')
const showDialog = ref(false)
const showPasswordDialog = ref(false)
const textName = ref('')
const nameInput = ref(null)

//methods
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

const closeAccount = () => {}
//hooks
onMounted(async () => {})
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: min-content 1fr;
}
.absolute-top {
  position: fixed;
  top: 0;
  background-color: $gray-accent;
  height: 3.4rem;
}

.panels {
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 1rem 1rem 1rem 1rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.822);
}
.full {
  display: grid;
  grid-template-rows: 1fr;
  place-items: center;
  text-align: center;
  height: 100%;
  border-radius: 15px;
}
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
.contacts {
  display: grid;
  height: 100%;
  width: 100%;
  gap: 1rem;
  grid-template-rows: auto auto;
  justify-content: center;
  align-content: center;
  place-items: center;
  padding: 2rem;
}
.social {
  display: grid;
  height: 100%;
  width: 100%;
  gap: 1rem;
  grid-template-rows: auto auto;
  justify-content: center;
  align-content: center;
  place-items: center;
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
@media (max-width: 450px) {
  .all-travels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    padding-top: 5rem;
    padding-bottom: 3.6rem;
  }
  .page-basic {
    padding-top: 0rem;
    padding-bottom: 3.4rem;
    grid-template-rows: 1fr auto;
  }
}
</style>
