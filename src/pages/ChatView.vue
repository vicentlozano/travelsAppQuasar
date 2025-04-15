<template>
  <div class="page-basic">
    <div class="absolute-top">
      <HeaderComponent />
      <q-input v-model="search" debounce="500" filled placeholder="Search" class="search-input">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <section class="chat">
      <FriendsContacts/>
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
  </div>
</template>

<script setup>
import ChatDialog from 'src/components/chat/ChatDialog.vue'
import FriendsContacts from 'src/components/chat/FriendsContacts.vue'
import HeaderComponent from 'src/components/HeaderComponent.vue'
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  z-index: -1;
  margin-top: 6.9rem;
}
.keyboard {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1rem;
}
.page-basic {
  display: grid;
  max-height: 100%;
  width: 100%;
  grid-template-rows: auto 1fr auto;
}
.absolute-top {
  position: fixed;
  top: 0;
  background-color: $gray-accent;
  height: 6.9rem;
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

</style>
