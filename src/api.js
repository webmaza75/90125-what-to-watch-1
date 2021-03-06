import axios from 'axios';
import {BASE_URL} from './consts.js';
import {ActionCreator} from './actions/actions.js';


const TIME_OUT = 5000;
const REQUIRED_AUTHORIZATION_ERROR = 403;

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `${BASE_URL}/wtw`,
    timeout: TIME_OUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (!err.response || !err.response.status) {
      return Promise.reject(err);
    }
    if (err.response && err.response.status === REQUIRED_AUTHORIZATION_ERROR) {
      dispatch(ActionCreator.checkIsRequiredAuthorization(true));
      return Promise.reject(err);
    }
    const errorMessage = err.response.data && err.response.data.error;
    if (errorMessage) {
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(err);
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
