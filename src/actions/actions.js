import ActionType from './action-type.js';

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE,
    payload: filter
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  signInUser: (params) => ({
    type: ActionType.SIGN_IN_USER,
    payload: params
  }),
  signInUserError: (error) => ({
    type: ActionType.SIGN_IN_USER_ERROR,
    payload: error
  }),
  setSignInError: (error) => ({
    type: ActionType.VALIDATE_SIGN_IN_USER_ERROR,
    payload: error
  }),
  resetErrors: () => ({
    type: ActionType.RESET_ERRORS,
    payload: undefined
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  addComment: (comments) => ({
    type: ActionType.ADD_COMMENT,
    payload: comments
  }),
  updateFilms: (film) => ({
    type: ActionType.UPDATE_FILMS,
    payload: film
  }),
  loadFavorites: (favorites) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: favorites
  }),
  loadPromo: (promo) => ({
    type: ActionType.LOAD_PROMO,
    payload: promo
  }),
  increaseMaxShowFilms: () => ({
    type: ActionType.INCREASE_MAX_SHOW_FILMS,
    payload: 20
  }),
  togglePlayButton: (playState) => ({
    type: ActionType.TOGGLE_PLAY_BUTTON,
    payload: playState
  }),
  resetMaxShowFilms: () => ({
    type: ActionType.RESET_MAX_SHOW_FILMS,
    payload: 20
  })
};

export {ActionCreator};
