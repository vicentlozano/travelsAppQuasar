import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { ref } from 'vue'

export const useTokenStore = defineStore('userToken', () => {
  const token = ref(LocalStorage.getItem('token'))
  const userId = ref(LocalStorage.getItem('userId'))
  function deleteToken() {
    token.value = null
    userId.value = null
    LocalStorage.removeItem('token')
    LocalStorage.removeItem('userId')
  }
  function updateToken() {
    token.value = LocalStorage.getItem('token')
    userId.value = LocalStorage.getItem('userId')
  }
  return { token, userId, deleteToken, updateToken }
})
