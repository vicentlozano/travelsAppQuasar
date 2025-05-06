<template>
  <div class="page-basic">
    <HeaderComponent class="header-top" />

    <q-input v-model="search" debounce="500" filled placeholder="Search" class="search-input">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <FriendsContacts
      :userId="user.userId"
      @recipientSelected="reciveRecipient"
      class="friendsAvatars"
    />

    <section class="chat" v-if="recipientId">
      <ChatDialog :contactChat="recipientId ? recipientId : null" />
    </section>
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
          <img :src="user.avatar" />
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
      messageText.value = ''
    }
  } catch (error) {
    notifyError($t('errorSendMessage'), error)
  }
}
</script>

<style lang="scss" scoped>
.page-basic {
  display: grid;
  max-height: 100%;
  width: 100%;
  grid-template-columns: min-content 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  overflow-y: hidden;
}
.header-top {
  grid-row: 1/2;
  grid-column: 1/-1;
}
.chat {
  display: grid;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  grid-column: 2/2;
  grid-row: 3/4;
  overflow-y: hidden;
}
.keyboard {
  width: 100%;
  grid-column: 1/-1;
  grid-row: 4/4;
  height: min-content;
  z-index: 4;
  padding: 0rem 1rem 0.4rem 1rem;
  background-color: white;
}

.absolute-top {
  background-color: $gray-accent;
  height: min-content;
}
.search-input {
  width: 100%;
  grid-row: 2/3;
  height: min-content;
  grid-column: 1/-1;
  background-color: white;
}
.contacts {
  width: 100%;
}
.friendsAvatars {
  width: 100%;
  grid-column: 1/2;
  grid-row: 3/4;
  padding: 2rem 0rem;
}
@media (max-width: 450px) {
  .page-basic {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content 1fr min-content min-content;
  }
  .keyboard {
    width: 100%;
    grid-row: 4/5;
  }
  .chat {
    padding: 0rem 0rem 0rem;
    grid-row: 3/4;
    grid-column: 1/-1;
  }
  .friendsAvatars {
    width: 100%;
    grid-row: 2/3;
    padding: 0rem 1rem;
  }
  .search-input {
    width: 100%;
    grid-row: 1/2;
    height: min-content;
    background-color: white;
  }
  .header-top {
    grid-row: 5/5;
  }
  .nav-footer{
position: relative;
  }
}
</style>
