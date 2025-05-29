import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'http://localhost:7002/wsTravels/',

  //baseURL: 'https://travlesbackend-bmg4gtc5a0d9bbbd.canadacentral-01.azurewebsites.net/wsTravels/',
  //travlesbackend-bmg4gtc5a0d9bbbd.canadacentral-01.azurewebsites.net
  timeout: 6000,
  withCredentials: true, // <-- AIXÒ ÉS IMPORTANT
})
api.interceptors.request.use(
  (config) => {
    // Comprova si el token està emmagatzemat en LocalStorage
    const token = LocalStorage.getItem('token')

    // Si el token existeix, afegeix-lo a l'header de la petició
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Gestionar errors si la petició falla
    return Promise.reject(error)
  },
)
export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
