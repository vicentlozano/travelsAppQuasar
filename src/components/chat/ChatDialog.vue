<template>
  <div class="chat-dialog">
    <q-chat-message label="Sunday, 19th" />

    <q-chat-message
      name="me"
      avatar="https://cdn.quasar.dev/img/avatar4.jpg"
      :text="['hey, how are you?']"
      sent
      stamp="7 minutes ago"
    />
    <q-chat-message
      name="Jane"
      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
      :text="['hey, how are you?']"
      stamp="4 minutes ago"
    />
    <q-chat-message
      v-for="message in messages"
      :key="message.message"
      :name="message.id"
      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
      :text="[message.message]"
      :stamp="message.date"
      :sent="user.userId === message.sendFrom"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessages } from 'src/utils/api/get'
import { useUserStore } from 'src/stores/user'
const user = useUserStore()
const messages = ref([])
onMounted(async () => {
  messages.value = await getMessages({ userId: user.userId })
  messages.value = messages.value.data.data
  console.log(messages.value)
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  padding: 3rem 1rem 5rem 1rem  ;
  max-width: 600px;
}
</style>
