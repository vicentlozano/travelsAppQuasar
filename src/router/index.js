import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { loginWithToken } from '../utils/api/post'
import { useUserStore } from '../stores/user'
import { useQuasar } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })
  Router.beforeEach(async (to, from, next) => {
    const $q = useQuasar()
    const auth = useUserStore()
    const token = $q.localStorage.getItem('token')

    const isLoginRoute = to.name === 'login'
    const isRegisterRoute = to.name === 'register'

    const redirectToLogin = () => {
      $q.localStorage.set('isAuth', false)
      $q.localStorage.remove('token')
      if (!isLoginRoute) {
        next({ name: 'login' })
      } else {
        next() // ja estem a login, deixem continuar
      }
    }

    if (token) {
      try {
        let user = await loginWithToken(token)
        user = user.data

        if (!user.error.status && user.data) {
          auth.setUser(user.data.userId, user.data.name, user.data.email, user.data.role)
          $q.localStorage.set('isAuth', true)
          next()
        } else {
          redirectToLogin()
        }
      } catch (error) {
        console.error('Error al verificar el token:', error)
        redirectToLogin()
      }
    } else {
      if (isRegisterRoute) {
        next()
      } else {
        redirectToLogin()
      }
    }
  })
  return Router
})
