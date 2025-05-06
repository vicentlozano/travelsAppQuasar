<template>
  <div class="chat-dialog">
    <q-chat-message label="Sunday, 19th" />
    <q-chat-message
      v-for="message in messages"
      :key="message.message"
      :name="message.sendFrom === user.userId ? user.username : contactChat.name"
      :avatar="message.sendFrom === user.userId ? user.avatar : contactAvatar"
      :text="[message.message]"
      :stamp="
        moment().diff(message.date, 'minutes') < 60
          ? `${moment().diff(message.date, 'minutes')} ${$t('minutesStamp')}`
          : `${moment().diff(message.date, 'hours')} ${$t('hoursStamp')}`
      "
      :sent="user.userId === message.sendFrom"
    >
      <template v-slot:avatar v-if="user.userId !== message.sendFrom && !contactAvatar">
        <q-avatar color="primary" class="q-message-avatar q-message-avatar--received">
          {{
            contactChat.name.charAt(0).toUpperCase() + contactChat.lastname.charAt(0).toUpperCase()
          }}
        </q-avatar>
      </template>
    </q-chat-message>
    <q-chat-message
      v-if="constactIsWritting"
      :name="contactChat.name"
      :avatar="contactAvatar"
      :sent="false"
    >
      <template v-slot:avatar v-if="!contactAvatar">
        <q-avatar color="primary" class="q-message-avatar q-message-avatar--received">
          {{
            contactChat.name.charAt(0).toUpperCase() + contactChat.lastname.charAt(0).toUpperCase()
          }}
        </q-avatar>
      </template>
      <q-spinner-dots size="2rem" />
    </q-chat-message>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessages } from 'src/utils/api/get'
import { useUserStore } from 'src/stores/user'
import moment from 'moment'
//props&emits
const props = defineProps({
  contactChat: Object,
})
//data
const user = useUserStore()
const messages = ref([])
const contactAvatar = ref(null)
const constactIsWritting = ref(true)
onMounted(async () => {
  messages.value = await getMessages({ userId: user.userId, friendId: props.contactChat.id })
  messages.value = messages.value.data.data
  contactAvatar.value = props.contactChat?.avatar.length > 0 ? props.contactChat?.avatar : ''
  console.log(user.avatar)
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  padding: 1rem 1rem 1rem 1rem;
  max-width: 900px;
}
</style>
