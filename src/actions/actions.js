import ActionType from './action-type.js';
import {MAX_FILMS_TO_SHOW} from '../consts.js';

const ActionCreator = {
  changeFilter: (filter) => ({
    type: ActionType.CHANGE_GENRE,
    payload: filter
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films
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
    payload: MAX_FILMS_TO_SHOW
  }),
  togglePlayButton: (playState) => ({
    type: ActionType.TOGGLE_PLAY_BUTTON,
    payload: playState
  }),
  resetMaxShowFilms: () => ({
    type: ActionType.RESET_MAX_SHOW_FILMS,
    payload: MAX_FILMS_TO_SHOW
  }),
  logoutUser: () => ({
    type: ActionType.LOGOUT_USER
  }),
  checkIsRequiredAuthorization: (isRequired) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: isRequired
  }),
  loadedUserInfo: () => ({
    type: ActionType.LOADED_USER_INFO
  })
};

export {ActionCreator};
