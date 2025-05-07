<template>
  <q-scroll-area
    ref="chatScroll"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
    style="height: 100%; width: 100%"
    id="scroll-area-with-virtual-scroll-1"
  >
    <div class="chat-dialog">
      <q-chat-message
        :label="messages[0]?.date ? moment(messages[0]?.date).format('DD MMMM') : ''"
      />
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
              contactChat.name.charAt(0).toUpperCase() +
              contactChat.lastname.charAt(0).toUpperCase()
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
              contactChat.name.charAt(0).toUpperCase() +
              contactChat.lastname.charAt(0).toUpperCase()
            }}
          </q-avatar>
        </template>
        <q-spinner-dots size="2rem" />
      </q-chat-message>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, onMounted, watch, inject,nextTick  } from 'vue'
import { getMessages } from 'src/utils/api/get'
import { useUserStore } from 'src/stores/user'
import moment from 'moment'
import { notifyError } from 'src/utils/utilsNotify'

//props&emits
const props = defineProps({
  contactChat: Object,
})

//data
const mqtt = inject('appGlobal/mqtt')
const user = useUserStore()
const messages = ref([])
const contactAvatar = ref(null)
const constactIsWritting = ref(true)
const chatScroll = ref(null)

//computed
watch(
  () => props.contactChat,
  async (oldVal, newVal) => {
    if (newVal) {
      try {
        let newTopic = user.userId + props.contactChat.id
        let oldTopic = user.userId + oldVal.id

        messages.value = await getMessages({ userId: user.userId, friendId: newVal.id })
        messages.value = messages.value.data.data
        contactAvatar.value = newVal?.avatar.length > 0 ? newVal?.avatar : ''
        mqtt.unSubscribe(`TRAVELS/UPDATES/${oldTopic}`)

        mqtt.subscribe(`TRAVELS/UPDATES/${newTopic}`, (message) => {
          messages.value.push(JSON.parse(message))
        })
        scrollToBottom(true)
      } catch (error) {
        notifyError(error)
      }
    }
  },
)
watch(messages, () => {
  scrollToBottom()
})

//methods

function scrollToBottom() {
  nextTick(() => {
    const scrollEl = chatScroll.value?.getScrollTarget?.()
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: 'smooth' // <-- ¡Este es el scroll suave real!
      })
    }
  })
}
//hooks
onMounted(async () => {
  try {
    messages.value = await getMessages({ userId: user.userId, friendId: props.contactChat.id })
    messages.value = messages.value.data.data
    contactAvatar.value = props.contactChat?.avatar.length > 0 ? props.contactChat?.avatar : ''
    let topic = user.userId + props.contactChat.id
    mqtt.subscribe(`TRAVELS/UPDATES/${topic}`, (message) => {
      messages.value.push(JSON.parse(message))
    })
    scrollToBottom(true)
  } catch (error) {
    notifyError(error)
  }
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  max-width: 900px;
  padding: 1rem 3rem;
}
</style>
