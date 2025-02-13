import api from './axios.js'
const endpoint = '/travels'
export const getAllTravels = async () => {
  try {
    const response = await api.get(endpoint)
    console.log(response.data)
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
    console.log(error)
  }
}

export const createTravel = async (travel) => {
  try {
    const response = await api.post(endpoint, travel)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateTravel = async (id, travel) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, travel)
    return response.data
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
