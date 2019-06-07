import NameSpace from '../name-spaces.js';

const NAME_SPACE = NameSpace.USER;

export const isAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getUser = (state) => {
  if (state[NAME_SPACE].userInfo) {
    return state[NAME_SPACE].userInfo;
  }
  return undefined;
};

export const getError = (state) => {
  return state[NAME_SPACE].error;
};
