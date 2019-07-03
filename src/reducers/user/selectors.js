import NameSpace from '../name-spaces.js';

const NAME_SPACE = NameSpace.USER;

export const getUser = (state) => {
  return state[NAME_SPACE].userInfo;
};

export const getError = (state) => {
  return state[NAME_SPACE].error;
};

export const getValidationError = (state) => {
  return state[NAME_SPACE].validationError;
};

export const checkIsAuthorizedUser = (state) => {
  const user = state[NAME_SPACE].userInfo;
  return !!(user && user.id);
};

export const checkIsRequiredAuthorization = (state) => {
  return state[NAME_SPACE].isRequiredAuthorization;
};

export const checkIsLoadedUserInfo = (state) => {
  return state[NAME_SPACE].isLoadedUserInfo;
};
