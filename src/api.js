import axios from 'axios';
import {BASE_URL} from './consts.js';
import history from './history.js';

const TIME_OUT = 5000;
export const createAPI = () => {
  const api = axios.create({
    baseURL: `${BASE_URL}/wtw`,
    timeout: TIME_OUT,
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
