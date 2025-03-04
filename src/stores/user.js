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

    function deleteUser() {
      userId.value = null
      username.value = null
      email.value = null
      role.value = null
      LocalStorage.removeItem('token')
    }
    function setUser(id, name, userEmail, userRole) {
      userId.value = id
      username.value = name
      email.value = userEmail
      role.value = userRole
    }
    function updateUser() {}

    return { userId, username, email, role, deleteUser, setUser, updateUser }
  },
  {
    persist: true,
  }
)
