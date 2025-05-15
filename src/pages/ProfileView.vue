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
                <q-avatar color="primary" text-color="white" size="200px">
                  <img v-if="auth.avatar" :src="auth.avatar" />
                  <span v-else>{{ auth.username.charAt(0) }}</span>
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
              <p>{{ auth.email }}</p>
              <p>Hola {{ auth.username }} !</p>
              <q-btn @click="changePassword">Change password</q-btn>

              <q-btn @click="logout">Logout</q-btn>
            </section>
          </q-tab-panel>
          <q-tab-panel name="contacts">
            <section class="contacts">
              <p>{{ auth.email }}</p>
              <div style="position: relative; display: inline-block">
                <q-avatar color="primary" text-color="white" size="200px">
                  <img v-if="auth.avatar" :src="auth.avatar" />
                  <span v-else>{{ auth.username.charAt(0) }}</span>
                </q-avatar>
                <q-badge color="red" floating label="new"> </q-badge>
              </div>
              <p>Hola {{ auth.username }} !</p>
              <q-btn @click="logout">Logout</q-btn>
            </section>
          </q-tab-panel>
          <q-tab-panel name="social">
            <section class="social">
              <p>{{ auth.email }}</p>
              <q-avatar color="primary" text-color="white" size="200px">
                <img v-if="auth.avatar" :src="auth.avatar" />
                <span v-else>{{ auth.username.charAt(0) }}</span
                ><q-badge color="teal"><q-btn icon="edit" class="edit"></q-btn></q-badge>
              </q-avatar>

              <p>Hola {{ auth.username }} !</p>
              <q-btn @click="logout">Logout</q-btn>
            </section>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
  <DialogPhoto :show="showDialog" @close-dialog="closeDialog()" />
</template>

<script setup>
import { onMounted, inject, ref } from 'vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import DialogPhoto from 'src/components/DialogPhoto.vue'

//data
const auth = useUserStore()
const router = useRouter()
const mqtt = inject('appGlobal/mqtt')
const tab = ref('profile')
const showDialog = ref(false)

//methods
const logout = () => {
  mqtt.unSubscribeFromAllTopics()
  auth.deleteUser()
  router.push({ name: 'login' })
}
const closeDialog = (bool) => {
  showDialog.value = bool
}
const changePassword = () => {}
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
  grid-template-rows: 3fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-content: top;
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
.badge-avatar:hover {
  cursor: pointer;
}

.avatar-section {
  position: relative;
  display: inline-block;
  height: fit-content;
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
