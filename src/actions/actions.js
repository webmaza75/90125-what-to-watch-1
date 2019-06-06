import ActionTypes from './action-types.js';

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: filter
  }),
  loadFilms: (films) => ({
    type: ActionTypes.LOAD_FILMS,
    payload: films
  }),
  requireAuthorization: (status) => ({
    type: ActionTypes.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  signInUser: (params) => ({
    type: ActionTypes.SIGN_IN_USER,
    payload: params
  })
};

export {ActionCreator};
