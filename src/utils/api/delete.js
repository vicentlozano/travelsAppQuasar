import { LocalStorage } from 'quasar'
import { api } from '../../boot/axios'
import { notifyError } from 'src/utils/utils'

let isReloading = false

const errorCode = 54321

function deleted(endpoint, params) {
  return api
    .delete(`/${endpoint}`, { params })
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


export const deleteTravelById = (id) => {
  return deleted('Travels/wsDeleteTravelById', id)}



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
