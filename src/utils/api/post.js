import { LocalStorage } from 'quasar'
import { api } from '../../boot/axios'
import { notifyError } from 'src/utils/utilsNotify'

let isReloading = false
const errorCode = 54321

function post(endpoint, params) {
  return api
    .post(`/${endpoint}`, params)
    .then((res) => {
      const { data } = res
      if (data.error && data.error.status) {
        closeUserSession(data.error)
        if (!isReloading) {
          notifyError(data.error.source)
        }
      }
      return res
    })
    .catch((error) => {
      closeUserSession(error)
      if (!isReloading) {
        if (error.response.data.error && error.response.data.error.code === errorCode) {
          notifyError(error.response.data.error.source)
        } else {
          notifyError('defaultError')
        }
      }
      throw error
    })
}

function closeUserSession(error) {
  //si la sesión ha caducado o el token es invalido y no se esta cerrando sesión por el usuario
  if (
    error.status &&
    error.code === errorCode &&
    (error.source === 'invalidToken' || error.source === 'sessionExpired') &&
    !isReloading &&
    LocalStorage.getItem('user_token')
  ) {
    notifyError(error.source)
    setTimeout(() => {
      location.reload()
    }, 2000)

    isReloading = true
  }
}

/**
 * Create or edit a user
 *
 * @param {Number} idUser: if idUser = 0, create a new user. If idUser != 0, edit user.
 * @param {String} company: company the user belongs to.
 * @param {String} email: Users email.
 * @param {String} pass: Users password. If sent ''. Password not updated.
 * @param {Array} projects: Projects to which the user is linked to.
 *
 */

export function createTravel(travel) {
  return post('Travels/wsCreateTravel', travel)
}
export function updateTravel(travel) {
  return post('Travels/wsUpdateTravelById', travel)
}

export const logIn = (user) => {
  return post('Login/wsLogin', user)
}

export const loginWithToken = () => {
  return post('Login/wsLoginToken')
}

export const signUp = async (user) => {
  return post('Users/wsSignUp', user)
}
export const verifyEmail = async (token) => {
  return post('Users/wsVerifyEmail', token)
}

export const sendMessageById = async (message) => {
  return post('Messages/wsSendMessageById', message)
}
export const changeAvatar = async (avatarFile) => {
  return post('User/wsChangeAvatar', avatarFile)
}
export const updateName = async (name) => {
  return post('User/wsChangeName', name)
}
export const resetPassword = async (password) => {
  return post('User/wsResetPassword', password)
}
export const deleteContactById = async (contact) => {
  return post('Contacts/wsDeleteContactById', contact)
}
