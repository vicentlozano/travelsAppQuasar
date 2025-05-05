<template>
  <HeaderComponent />
  <div class="page-basic">
    <q-input v-model="search" debounce="500" filled placeholder="Search" class="search-input">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <FriendsContacts :userId="user.userId" @recipientSelected="reciveRecipient" />

    <section class="chat" v-if="recipientId">
      <ChatDialog :contactChat="recipientId ? recipientId : null" />
      <q-input
        standout
        bottom-slots
        v-model="messageText"
        label="Label"
        :dense="dense"
        class="keyboard"
      >
        <template v-slot:before>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
          </q-avatar>
        </template>

        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="schedule" />
        </template>

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="sendMessage" />
        </template>
      </q-input>
    </section>
  </div>
</template>

<script setup>
import ChatDialog from 'src/components/chat/ChatDialog.vue'
import FriendsContacts from 'src/components/chat/FriendsContacts.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
import { useUserStore } from 'src/stores/user'
import { notifyError } from 'src/utils/utilsNotify'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { sendMessageById } from 'src/utils/api'

//data
const user = useUserStore()
const recipientId = ref(null)
const messageText = ref('')
const $t = useI18n()
//methods
const reciveRecipient = (value) => {
  recipientId.value = value
}
const sendMessage = async () => {
  try {
    const response = await sendMessageById({
      userId: user.userId,
      message: messageText.value,
      recipientId: recipientId.value.id,
    })
    if (!response.data.error?.status) {
      console.log('okey!')
    }
  } catch (error) {
    notifyError($t('errorSendMessage'), error)
  }
}
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding-top: 3.9rem;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.keyboard {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1rem;
}
.page-basic {
  display: grid;
  padding-top: 3.4rem;
  max-height: 100%;
  width: 100%;
  grid-template-rows: 0.2fr 1fr;
}
.absolute-top {
  position: relative;
  top: 1;
  background-color: $gray-accent;
  height: 3.4rem;
}
.search-input {
  width: 100%;
  position: fixed;
  top: 1;
  z-index: 3;
  background-color: white;
}
.contacts {
  width: 100%;
}
@media (max-width: 450px) {
  .page-basic {
    padding-top: 0rem;
    padding-bottom: 3.6rem;
  }
  .keyboard {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 1rem 1rem 3.6rem 1rem;
  }
}
</style>
