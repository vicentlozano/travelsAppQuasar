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

    function deleteUser() {
      userId.value = null
      username.value = null
      email.value = null
      role.value = null
      avatar.value = null
      LocalStorage.removeItem('token')
    }
    function setUser(id, name, userEmail, userRole,userAvatar) {
      userId.value = id
      username.value = name
      email.value = userEmail
      role.value = userRole
      avatar.value = userAvatar
    }
    function updateUser() {}

    return { userId, username, email, role, avatar, deleteUser, setUser, updateUser }
  },
  {
    persist: true,
  }
)
