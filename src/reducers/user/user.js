import ActionTypes from '../../actions/action-types.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  isAuthorizationRequired: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
  }
  return state;
};

const Operation = {
  checkAuth: () => {
    return (dispatch, getState, api) => {
      return api
        .get(`/login`)
        .then((res) => {
          // TODO Разберусь, когда будет готова страница авторизации поользователя (модуль 7, задание 2).
          if (res.status === 200) {
            dispatch(ActionCreator.requireAuthorization(true));
          }
        });
    };
  }
};

export {
  Operation,
  reducer
};
