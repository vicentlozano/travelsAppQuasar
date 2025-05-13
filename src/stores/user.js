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

    function deleteUser() {
      userId.value = null
      username.value = null
      email.value = null
      role.value = null
      avatar.value = null
      mqttAlertSubscribe.value = false
      LocalStorage.removeItem('token')
    }
    function setUser(id, name, userEmail, userRole,userAvatar) {
      userId.value = id
      username.value = name
      email.value = userEmail
      role.value = userRole
      avatar.value = userAvatar
      mqttAlertSubscribe.value = false
    }
    function updateUser() {}
    function subscribeAlert(bool){
      mqttAlertSubscribe.value = bool
    }

    return { userId, username, email, role, avatar,mqttAlertSubscribe, deleteUser, setUser, updateUser,subscribeAlert }
  },
  {
    persist: true,
  }
)
