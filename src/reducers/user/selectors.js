import NameSpace from '../name-spaces.js';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};
