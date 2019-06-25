import axios from 'axios';
import {BASE_URL} from './consts.js';
import history from './history.js';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `${BASE_URL}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      history.push(`/login`);
    }
    if ([404, 500, 503, 504].includes(err.response.status)) {
      history.push(`/500`);
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
