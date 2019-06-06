import ActionTypes from '../../actions/action-types.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  isAuthorizationRequired: false,
  userInfo: undefined
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
  }
  return state;
};

const transform = (data) => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    avatarUrl: data.avatar_url
  };
};

const Operation = {
  signInUser: (params) => (dispatch, getState, api) => {
    return api
      .post(`/login`, params)
      .then((res) => {
        const userInfo = transform(res.data);
        dispatch(ActionCreator.signInUser(userInfo));
        dispatch(ActionCreator.requireAuthorization(false));
      });
    // TODO Обработка ошибок
    // .catch((error) => {

    // });
  }
};

export {
  Operation,
  reducer
};
