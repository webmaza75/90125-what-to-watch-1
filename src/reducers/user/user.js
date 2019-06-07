import ActionTypes from '../../actions/action-types.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  isAuthorizationRequired: false,
  userInfo: undefined,
  error: undefined
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
  }
  return state;
};

const transform = (data) => {
  const {id, email, name, avatar_url: avatarUrl} = data;
  return {id, email, name, avatarUrl};
};

const Operation = {
  signInUser: (params) => (dispatch, getState, api) => {
    return api
      .post(`/login`, params)
      .then((res) => {
        if (res.status === 200) {
          const userInfo = transform(res.data);
          dispatch(ActionCreator.signInUser(userInfo));
          dispatch(ActionCreator.requireAuthorization(false));
        } else { // status 400
          dispatch(ActionCreator.signInUserError(res.response.data.error));
        }
      }).catch((error) => {
        dispatch(ActionCreator.signInUserError(error.message));
      });
  }
};

export {
  Operation,
  reducer,
  transform
};
