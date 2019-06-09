import axios from 'axios';
import {ActionCreator} from './actions/actions.js';
import {BASE_URL} from './consts.js';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `${BASE_URL}/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
