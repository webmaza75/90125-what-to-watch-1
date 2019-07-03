import ActionType from '../../actions/action-type.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  userInfo: undefined,
  error: undefined,
  validationError: undefined,
  isRequiredAuthorization: false,
  isLoadedUserInfo: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_IN_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    case ActionType.SIGN_IN_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case ActionType.VALIDATE_SIGN_IN_USER_ERROR:
      return {
        ...state,
        validationError: action.payload
      };
    case ActionType.RESET_ERRORS:
      return {
        ...state,
        validationError: action.payload
      };
    case ActionType.LOGOUT_USER:
      return initialState;
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isRequiredAuthorization: action.payload
      };
    case ActionType.LOADED_USER_INFO:
      return {
        ...state,
        isLoadedUserInfo: true
      };
  }
  return state;
};

const transformUserData = (data) => {
  const {avatar_url: avatarUrl, ...other} = data;
  return {avatarUrl, ...other};
};

const Operation = {
  signInUser: (params) => (dispatch, getState, api) => {
    return api
      .post(`/login`, params)
      .then((res) => {
        const userInfo = transformUserData(res.data);
        dispatch(ActionCreator.signInUser(userInfo));
      }).catch((error) => {
        dispatch(ActionCreator.signInUserError(error.message));
      });
  },
  checkUser: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((res) => {
        const userInfo = transformUserData(res.data);
        dispatch(ActionCreator.signInUser(userInfo));
      }).catch(() => {
        dispatch(ActionCreator.logoutUser());
      }).then(() => {
        dispatch(ActionCreator.loadedUserInfo());
      });
  }
};

export {
  Operation,
  reducer,
  transformUserData
};
