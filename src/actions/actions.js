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
  }),
  signInUserError: (error) => ({
    type: ActionTypes.SIGN_IN_USER_ERROR,
    payload: error
  }),
  setSignInError: (error) => ({
    type: ActionTypes.VALIDATE_SIGN_IN_USER_ERROR,
    payload: error
  }),
  resetErrors: () => ({
    type: ActionTypes.RESET_ERRORS,
    payload: undefined
  }),
  loadComments: (comments) => ({
    type: ActionTypes.LOAD_COMMENTS,
    payload: comments
  }),
  resetComments: () => ({
    type: ActionTypes.RESET_COMMENTS,
    payload: []
  })
};

export {ActionCreator};
