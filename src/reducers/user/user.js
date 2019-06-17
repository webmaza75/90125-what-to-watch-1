import ActionTypes from '../../actions/action-types.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  isAuthorizationRequired: false,
  userInfo: undefined,
  error: undefined,
  validationError: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload,
      };
    case ActionTypes.SIGN_IN_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    case ActionTypes.SIGN_IN_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionTypes.VALIDATE_SIGN_IN_USER_ERROR:
      return {
        ...state,
        validationError: action.payload
      };
    case ActionTypes.RESET_ERRORS:
      return {
        ...state,
        validationError: action.payload,
        error: action.payload
      };
  }
  return state;
};

const transform = (data) => {
  const {avatar_url: avatarUrl, ...other} = data;
  return {avatarUrl, ...other};
};

const Operation = {
  signInUser: (params) => (dispatch, getState, api) => {
    return api
      .post(`/login`, params)
      .then((res) => {
        const userInfo = transform(res.data);
        dispatch(ActionCreator.signInUser(userInfo));
        dispatch(ActionCreator.requireAuthorization(false));
      }).catch((error) => {
        dispatch(ActionCreator.signInUserError(error.response.data.error));
      });
  }
};

export {
  Operation,
  reducer,
  transform
};
