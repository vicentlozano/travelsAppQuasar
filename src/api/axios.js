import axios from 'axios'

const api = axios.create({
  baseURL: 'https://travelsbackend.onrender.com',
  timeout: 6000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
