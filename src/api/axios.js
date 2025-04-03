import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7002',
  timeout: 6000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
