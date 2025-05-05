<template>
  <div class="chat-dialog">
    <q-chat-message label="Sunday, 19th" />
    <q-chat-message
      v-for="message in messages"
      :key="message.message"
      :name="message.sendTo === user.userId ? user.username : contactChat.name"
      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
      :text="[message.message]"
      :stamp="`${moment().diff(message.date, 'minutes')} ${$t('minutesStamp')}`"
      :sent="user.userId === message.sendFrom"
    />
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
onMounted(async () => {
  console.log(user.userId)
  messages.value = await getMessages({ userId: user.userId, friendId: props.contactChat.id })
  messages.value = messages.value.data.data
  console.log(messages.value)
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  padding: 3rem 1rem 5rem 1rem;
  max-width: 600px;
}
</style>
