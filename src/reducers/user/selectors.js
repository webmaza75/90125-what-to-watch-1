import NameSpace from '../name-spaces.js';

const NAME_SPACE = NameSpace.USER;

export const isAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUser = (state) => {
  return state[NAME_SPACE].userInfo;
};

export const getError = (state) => {
  return state[NAME_SPACE].error;
};