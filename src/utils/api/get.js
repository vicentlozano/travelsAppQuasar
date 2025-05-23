import { LocalStorage } from 'quasar'
import { api } from '../../boot/axios'
import { notifyError } from 'src/utils/utilsNotify'

let isReloading = false

const errorCode = 54321

async function get(endpoint, params) {
  return api
    .get(`/${endpoint}`, { params })
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
      console.log(error)
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

export const getAllTravels = () => {
  return get('Travels/wsGetAllTravels')
}
export const getMessages = (idUser) => {
  return get('Messages/wsGetMessages', idUser)
}
export const getTravelById = (idTravel) => {
  return get('Travels/wsGetTravelById', idTravel)
}
export const getContactsById = (idUser) => {
  return get('Contacts/wsGetContactsById', idUser)
}
export const getRequestsById = (idUser) => {
  return get('Contacts/wsGetRequestsById', idUser)
}
export const getFiveContactsById = (idUser) => {
  return get('Contacts/wsGetFiveContactsById', idUser)
}

function closeUserSession(error) {
  //si la sesión ha caducado o el token es invalido y no se esta cerrando sesión por el usuario
  if (
    error.status &&
    error.code === errorCode &&
    (error.source === 'invalidToken' || error.source === 'sessionExpired') &&
    !isReloading &&
    LocalStorage.getItem('token')
  ) {
    notifyError(error.source)
    setTimeout(() => {
      location.reload()
    }, 2000)

    isReloading = true
  }
}
