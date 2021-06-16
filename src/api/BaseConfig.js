import * as axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/';

let axiosConfig = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const setClientToken = token => {
  axiosConfig.interceptors.request.use(function(config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default axiosConfig;
