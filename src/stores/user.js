import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userId = ref(null)
    const username = ref(null)
    const email = ref(null)
    const role = ref(null)
    const avatar = ref(null)
    const mqttAlertSubscribe = ref(false)
    const countMessages = ref(null)

    function deleteUser() {
      userId.value = null
      username.value = null
      email.value = null
      role.value = null
      avatar.value = null
      mqttAlertSubscribe.value = false
      countMessages.value = null
      LocalStorage.removeItem('token')
    }
    function setUser(id, name, userEmail, userRole, userAvatar, countMessagesValue) {
      userId.value = id
      username.value = name
      email.value = userEmail
      role.value = userRole
      avatar.value = userAvatar
      countMessages.value = countMessagesValue ? countMessagesValue : countMessages.value
    }
    function updateUserAvatar(avatarUrl) {
      avatar.value = avatarUrl
    }
    function setName(name) {
      username.value = name
    }
    function subscribeAlert(bool) {
      mqttAlertSubscribe.value = bool
    }
    function recountNewMessages(newMessagesCount) {
      countMessages.value = newMessagesCount
    }

    return {
      userId,
      username,
      email,
      role,
      avatar,
      mqttAlertSubscribe,
      countMessages,
      setName,
      deleteUser,
      setUser,
      updateUserAvatar,
      subscribeAlert,
      recountNewMessages,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['countMessages', 'mqttAlertSubscribe'],
    },
  },
)
