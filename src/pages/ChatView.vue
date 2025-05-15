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
      :contactSearch="search"
      @recipientSelected="reciveRecipient"
      class="friendsAvatars"
    />

    <section class="chat" v-if="recipientId">
      <ChatDialog
        :contactChat="recipientId ? recipientId : null"
        :isContactWritting="isWrittingStatus"
      />
    </section>
    <q-input
      standout
      bottom-slots
      v-model="messageText"
      label="Label"
      @focus="writting"
      @blur="stopWritting"
      @keydown.enter="sendMessage"
      bg-color="gray"
      class="keyboard"
    >
      <template v-slot:before>
        <q-avatar>
          <img :src="user.avatar" />
        </q-avatar>
      </template>

      <template v-slot:append>
        <q-icon
          v-if="messageText !== ''"
          name="close"
          @click="messageText = ''"
          class="cursor-pointer"
        />
        <q-icon name="schedule" />
      </template>

      <template v-slot:after>
        <q-btn round dense flat icon="send" @click="sendMessage" />
      </template>
      <template v-slot:control>
        <input
          class="q-field__native q-placeholder"
          type="text"
          :value="messageText"
          @input="(e) => (messageText = e.target.value)"
          @keydown.enter="sendMessage"
        />
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
import { ref, inject, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { sendMessageById } from 'src/utils/api'

//data
const mqtt = inject('appGlobal/mqtt')
const user = useUserStore()
const recipientId = ref(null)
const messageText = ref('')
const $t = useI18n()
const search = ref('')
const isWrittingStatus = ref(false)

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
      messageText.value = ''
    }
  } catch (error) {
    notifyError($t('errorSendMessage'), error)
  }
}
const stopWritting = () => {
  mqtt.publish(
    
    `TRAVELS/ISWRITTING/${user.userId}/${recipientId.value.id}`,
    JSON.stringify({ isWritting: false }),
  )
}
const writting = () => {
  mqtt.publish(
    `TRAVELS/ISWRITTING/${user.userId}/${recipientId.value.id}`,
    JSON.stringify({ isWritting: true }),
  )
}
//computed

//watch

watch(recipientId, (newRecipient, oldRecipent) => {
  if (newRecipient?.id) {
    if (oldRecipent) {
      mqtt.unSubscribe(`TRAVELS/ISWRITTING/${oldRecipent.id}/${user.userId}`)
    }
    mqtt.publish(
      `TRAVELS/ISWRITTING/${user.userId}/${newRecipient.id}`,
      JSON.stringify({ isWritting: false }),
    )
    mqtt.subscribe(`TRAVELS/ISWRITTING/${newRecipient.id}/${user.userId}`, (isWritting) => {
      let message = JSON.parse(isWritting)
      isWrittingStatus.value = message.isWritting
    })
  }
})

onUnmounted(()=> {
  mqtt.unSubscribe(`TRAVELS/ISWRITTING/${recipientId.value.id}/${user.userId}`)

})
//hooks
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
    padding: 0rem 0rem;
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
  .nav-footer {
    position: relative;
  }
}
</style>
