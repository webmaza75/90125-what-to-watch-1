import NameSpace from '../name-spaces.js';

const NAME_SPACE = NameSpace.USER;

export const isAuthorizationRequired = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};
