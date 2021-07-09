import * as axios from 'axios'

const API_URL = 'http://10.0.2.2:5000/'

const axiosConfig = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json,application/pdf,application/octet-stream',
    'Content-Type': 'application/json',
  },
})

export const setToken = token => {
  axiosConfig.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}

export default axiosConfig
