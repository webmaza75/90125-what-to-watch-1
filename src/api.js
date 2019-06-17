import axios from 'axios';
import {BASE_URL} from './consts.js';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `${BASE_URL}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      history.pushState(null, null, `/login`);
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
