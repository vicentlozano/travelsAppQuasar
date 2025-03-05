<template>
  <section class="chat"><FriendsContacts /> <ChatDialog /></section>
</template>

<script setup>
import ChatDialog from 'src/components/chat/ChatDialog.vue'
import FriendsContacts from 'src/components/chat/FriendsContacts.vue'
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
   
}

</style>
