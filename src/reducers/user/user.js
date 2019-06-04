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
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((res) => {
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
