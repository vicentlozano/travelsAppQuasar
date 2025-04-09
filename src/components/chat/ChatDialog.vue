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
      :text="['doing fine, how r you?']"
      stamp="4 minutes ago"
    />
    <q-chat-message
      v-for="message in message"
      :key="message"
      name="Jane"
      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
      :text="['doing fine, how r you?']"
      stamp="4 minutes ago"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMessages } from 'src/utils/api/travelsService'
import { useUserStore } from 'src/stores/user'
const user = useUserStore()
const messages = ref([])
onMounted(async () => {
  messages.value = await getMessages(user.userId)
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  padding: 2rem;
  max-width: 600px;
}
</style>
