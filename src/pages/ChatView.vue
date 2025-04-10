<template>
  <section class="chat">
    <FriendsContacts />
    <ChatDialog />
    <q-input standout bottom-slots v-model="text" label="Label" :dense="dense" class="keyboard">
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
        <q-btn round dense flat icon="send" />
      </template>
    </q-input>
  </section>
</template>

<script setup>
import ChatDialog from 'src/components/chat/ChatDialog.vue'
import FriendsContacts from 'src/components/chat/FriendsContacts.vue'
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}
.keyboard {
  width: 100%;
  position: relative;
  bottom: 0;
}
</style>
