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
  addComment: (comments) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comments
  }),
  updateFilms: (film) => ({
    type: ActionTypes.UPDATE_FILMS,
    payload: film
  }),
  loadFavorites: (favorites) => ({
    type: ActionTypes.LOAD_FAVORITES,
    payload: favorites
  }),
  loadPromo: (promo) => ({
    type: ActionTypes.LOAD_PROMO,
    payload: promo
  }),
  increaseMaxShowFilms: () => ({
    type: ActionTypes.INCREASE_MAX_SHOW_FILMS,
    payload: 20
  }),
  togglePlayButton: (playState) => ({
    type: ActionTypes.TOGGLE_PLAY_BUTTON,
    payload: playState
  }),
  resetMaxShowFilms: () => ({
    type: ActionTypes.RESET_MAX_SHOW_FILMS,
    payload: 20
  })
};

export {ActionCreator};
