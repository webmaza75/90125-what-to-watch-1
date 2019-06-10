import MockAdapter from 'axios-mock-adapter';
import {
  reducer,
  Operation,
  transform
} from './user.js';
import ActionTypes from '../../actions/action-types.js';
import user from '../../mocks/user.js';
import {createAPI} from '../../api.js';

const initialState = {
  isAuthorizationRequired: false,
  userInfo: undefined,
  error: undefined
};

const signInRequiredState = {
  isAuthorizationRequired: true,
  userInfo: undefined,
  error: undefined
};

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer loads userInfo`, () => {
    const signInUserState = {
      isAuthorizationRequired: true,
      userInfo: user,
      error: undefined
    };

    expect(reducer(signInRequiredState, {
      type: ActionTypes.SIGN_IN_USER,
      payload: user
    })).toEqual(signInUserState);
  });

  it(`Reducer loads signInError`, () => {
    const signInUserWithErrorState = {
      isAuthorizationRequired: true,
      userInfo: undefined,
      error: `bad request`
    };

    expect(reducer(signInRequiredState, {
      type: ActionTypes.SIGN_IN_USER_ERROR,
      payload: `bad request`
    })).toEqual(signInUserWithErrorState);
  });

  it(`Should make a correct API call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoader = Operation.signInUser();

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return userLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = transform({fake: true});
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionTypes.SIGN_IN_USER,
          payload: result,
        });
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionTypes.REQUIRED_AUTHORIZATION,
          payload: status
        });
      }).catch(() => {
      });
  });

  it(`Should catch the error during API call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoader = Operation.signInUser();

    apiMock
      .onPost(`/login`)
      .reply(500, [{fake: true}]);

    return userLoader(dispatch, jest.fn(), api)
      .catch((error) => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionTypes.SIGN_IN_USER_ERROR,
          payload: error
        });
      });
  });
});
