<template>
  <q-scroll-area
    ref="chatScroll"
    style="height: 100%; width: 100%"
    id="scroll-area-with-virtual-scroll-1"
  >
    <div class="chat-dialog">
      <q-chat-message
        :label="messages[0]?.date ? moment(messages[0]?.date).format('DD MMMM') : ''"
      />
      <q-chat-message
        v-for="message in messages"
        :key="message.message + message.date"
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
      <transition name="fade-slide" @after-leave="onDotsHidden">
        <q-chat-message
          v-show="isContactWritting"
          :name="contactChat.name"
          :avatar="contactAvatar"
          :sent="false"
          class="animation"
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
      </transition>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { ref, onMounted, watch, inject, nextTick, onUnmounted } from 'vue'
import { getMessages } from 'src/utils/api/get'
import { useUserStore } from 'src/stores/user'
import moment from 'moment'
import { notifyError } from 'src/utils/utilsNotify'

//props&emits
const props = defineProps({
  contactChat: Object,
  isContactWritting: Boolean,
})
//data
const mqtt = inject('appGlobal/mqtt')
const user = useUserStore()
const messages = ref([])
const contactAvatar = ref(null)
const chatScroll = ref(null)
const wasWritting = ref(false)
const pendingMessage = ref(null)

//methods
function isAtBottom() {
  const scrollEl = chatScroll.value?.getScrollTarget?.()
  if (!scrollEl) return false
  return scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 330 // tolerancia
}
function scrollToBottom() {
  nextTick(() => {
    const scrollEl = chatScroll.value?.getScrollTarget?.()
    if (scrollEl) {
      scrollEl.scrollTo({
        top: scrollEl.scrollHeight,
        behavior: 'smooth',
      })
    }
  })
}
function onDotsHidden() {
  // Esperem un pel·lín per assegurar-nos que l'animació ha acabat
  setTimeout(() => {
    if (pendingMessage.value) {
      messages.value.push(pendingMessage.value)
      pendingMessage.value = null
    }
    scrollToBottom()
  }, 50)
}
//computed
watch(
  () => props.contactChat,
  async (newVal, oldVal) => {
    if (newVal) {
      try {
        let newTopic = [user.userId, newVal.id].sort((a, b) => a - b).join('-')
        let oldTopic = [user.userId, oldVal.id].sort((a, b) => a - b).join('-')

        messages.value = await getMessages({ userId: user.userId, friendId: newVal.id })
        messages.value = messages.value.data.data
        contactAvatar.value = newVal?.avatar.length > 0 ? newVal?.avatar : ''
        mqtt.unSubscribe(`TRAVELS/UPDATES/${oldTopic}`)
        mqtt.subscribe(`TRAVELS/UPDATES/${newTopic}`, (message) => {
          const parsed = JSON.parse(message)
          if (wasWritting.value) {
            // Guardem el missatge fins que acabe l'animació dels dots
            pendingMessage.value = parsed
          } else {
            messages.value.push(parsed)
          }
        })

        scrollToBottom(true)
      } catch (error) {
        notifyError(error)
      }
    }
  },
)
watch(
  () => messages.value.length,
  () => {
    if (wasWritting.value) {
      // si justo antes estaba escribiendo, da un poco de tiempo
      setTimeout(() => {
        scrollToBottom()
        wasWritting.value = false // reseteamos
      }, 100)
    } else {
      scrollToBottom()
    }
  },
)
watch(
  () => props.isContactWritting,
  (val) => {
    if (val && isAtBottom()) {
      // Solo hacemos scroll si estamos abajo
      nextTick(() => {
        scrollToBottom()
      })
    }
    wasWritting.value = val
  },
)

//hooks
onMounted(async () => {
  try {
    messages.value = await getMessages({ userId: user.userId, friendId: props.contactChat.id })
    messages.value = messages.value.data.data
    contactAvatar.value = props.contactChat?.avatar.length > 0 ? props.contactChat?.avatar : ''
    const [id1, id2] = [user.userId, props.contactChat.id].sort((a, b) => a - b)
    const topic = `${id1}-${id2}`
    mqtt.subscribe(`TRAVELS/UPDATES/${topic}`, (message) => {
      messages.value.push(JSON.parse(message))
    })
    scrollToBottom(true)
  } catch (error) {
    notifyError(error)
  }
})
onUnmounted(() => {
  const [id1, id2] = [user.userId, props.contactChat.id].sort((a, b) => a - b)
  const topic = `${id1}-${id2}`
  mqtt.unSubscribe(`TRAVELS/UPDATES/${topic}`)
})
</script>

<style lang="scss" scoped>
.chat-dialog {
  width: 100%;
  max-width: 900px;
  padding: 1rem 3rem;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
