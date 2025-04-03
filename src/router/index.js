import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { loginWithToken } from 'src/api/travelsService'
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
    if (token) {
      try {
        const user = await loginWithToken(token)
        if (user) {
          auth.setUser(user.result.id, user.result.name, user.result.email, user.result.role)
          $q.localStorage.set('isAuth', true)
          next()
        } else {
          next()
        }
      } catch (error) {
        console.error('Error al verificar el token:', error)
        $q.localStorage.set('isAuth', false)
        $q.localStorage.setItem('connection to database fail', true)
        $q.localStorage.removeItem('token')

        next()
      }
    } else {
      $q.localStorage.set('isAuth', false)
      next()
    }
  })

  return Router
})
