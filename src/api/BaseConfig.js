import * as axios from 'axios'
import {BASE_URL} from '@env'

const API_URL = BASE_URL

const axiosConfig = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json,application/pdf,application/octet-stream',
    'Content-Type': 'application/json',
  },
})

export const setToken = token => {
  axiosConfig.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}

axiosConfig.interceptors.request.use(request => {
  console.log('Starting Request: ', request)
  return request
})

axiosConfig.interceptors.response.use(
  response => {
    console.log('Response: ', response)
    return response
  },
  error => {
    console.log('Request error: ', error.response)
    return Promise.reject(error)
  },
)

export default axiosConfig
