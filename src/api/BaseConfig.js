import * as axios from 'axios';

const API_URL = 'http://10.0.2.2:5000/';

const axiosConfig = {
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const setToken = token => {
  axiosConfig.headers.Authorization = `Bearer ${token}`;
};

export const deleteToken = () => {
  delete axiosConfig.headers.Authorization;
};

const apiConfig = () => axios.create(axiosConfig);

export default apiConfig;
