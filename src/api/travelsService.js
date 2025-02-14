import api from './axios.js'
const endpoint = '/travels'
const endpoint1 = '/users'

export const getAllTravels = async () => {
  try {
    const response = await api.get(endpoint)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

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
    throw error // Opcional: Propaga el error para manejarlo en el componente
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

export const logIn = async (user) => {
  try {
    const response = await api.delete(`${endpoint1}/${user}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
