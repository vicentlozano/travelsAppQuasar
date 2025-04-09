import api from './axiosConfig.js'
const endpoint = '/wsTravels/Travels/'
const endpoint1 = '/wsTravels/users/'
const endpoint2 = '/wsTravels/login/'
const endpoint4 = '/wsTravels/users/messages'

// export const getAllTravels = async () => {
//   try {
//     const response = await api.get(`${endpoint}wsGetAllTravels`)
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getTravelById = async (id) => {
  try {
    const response = await api.get(`${endpoint}/${id}`)
    return response.data
  } catch (error) {
    throw error.name
  }
}

export const createTravel = async (travel) => {
  try {
    const response = await api.post(endpoint, travel)
    return response.data
  } catch (error) {
    console.error('Error en createTravel:', error.response ? error.response.data : error.message)
    throw error
  }
}

export const updateTravel = async (id, travel) => {
  try {
    await api.put(`${endpoint}/${id}`, travel)
  } catch (error) {
    console.log(error)
  }
}

export const deleteTravel = async (id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const logIn = async (userCredentials) => {
  try {
    const response = await api.post(`${endpoint2}wsLogin`, userCredentials)
    return response.data
  } catch (error) {
    return error
  }
}
export const signUp = async (user) => {
  try {
    const response = await api.post(endpoint1, user)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const loginWithToken = async () => {
  try {
    const response = await api.post(`${endpoint2}wsLoginToken`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const getMessages = async (userId) => {
  try {
    const response = await api.get(`${endpoint4}/${userId}`)
    return response.data
  } catch (error) {
    throw error.name
  }
}
