import MockAdapter from 'axios-mock-adapter';
import {
  reducer,
  Operation,
  transformUserData
} from './user.js';
import ActionType from '../../actions/action-type.js';
import user from '../../mocks/user.js';
import {createAPI} from '../../api.js';

const initialState = {
  userInfo: undefined,
  error: undefined,
  validationError: undefined,
  isRequiredAuthorization: false
};

const guestState = {
  userInfo: undefined,
  error: undefined,
  validationError: undefined,
  isRequiredAuthorization: false
};

const signInUserState = {
  userInfo: user,
  error: undefined,
  validationError: undefined,
  isRequiredAuthorization: false
};

const validationError = `email is not correct`;
const signInUserWithValidationErrorState = {
  userInfo: undefined,
  error: undefined,
  validationError,
  isRequiredAuthorization: false
};

describe(`Reducer works correctly`, () => {
  it(`Reducer returns initial state by default`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer loads userInfo`, () => {
    expect(reducer(guestState, {
      type: ActionType.SIGN_IN_USER,
      payload: user
    })).toEqual(signInUserState);
  });

  it(`Reducer loads signInError`, () => {
    const signInUserWithErrorState = {
      userInfo: undefined,
      error: `bad request`,
      validationError: undefined,
      isRequiredAuthorization: false
    };

    expect(reducer(guestState, {
      type: ActionType.SIGN_IN_USER_ERROR,
      payload: `bad request`
    })).toEqual(signInUserWithErrorState);
  });

  it(`Should make a correct API call to /login`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const email = `qwe@qwe.ru`;
    const password = 1;
    const userLoader = Operation.signInUser(email, password);

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return userLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = transformUserData({fake: true});
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SIGN_IN_USER,
          payload: result,
        });
      }).catch(() => {
      });
  });

  it(`Should make a correct API call to /login with get`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const userLoader = Operation.signInUser();

    apiMock
      .onGet(`/login`)
      .reply(200, [{fake: true}]);

    return userLoader(dispatch, jest.fn(), api)
      .then(() => {
        const result = transformUserData({fake: true});
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SIGN_IN_USER,
          payload: result,
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
          type: ActionType.SIGN_IN_USER_ERROR,
          payload: error
        });
      });
  });

  it(`Reducer sets validationError`, () => {
    expect(reducer(guestState, {
      type: ActionType.VALIDATE_SIGN_IN_USER_ERROR,
      payload: validationError
    })).toEqual(signInUserWithValidationErrorState);
  });

  it(`Reducer resets validationError`, () => {
    expect(reducer(signInUserWithValidationErrorState, {
      type: ActionType.RESET_ERRORS,
      payload: undefined
    })).toEqual(guestState);
  });

  it(`Reducer should logout user`, () => {
    expect(reducer(signInUserState, {
      type: ActionType.LOGOUT_USER
    })).toEqual(guestState);
  });

  it(`Reducer should check authorization user`, () => {
    const needAuthorizationState = {
      userInfo: undefined,
      error: undefined,
      validationError: undefined,
      isRequiredAuthorization: true
    };
    expect(reducer(guestState, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true
    })).toEqual(needAuthorizationState);
  });
});
