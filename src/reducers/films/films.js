import ActionType from '../../actions/action-type.js';
import {ALL_GENRES} from '../../consts.js';
import {ActionCreator} from '../../actions/actions.js';
import {sortComments} from '../../utils.js';
import {getMovieRatingLevel} from '../../utils.js';
import {NotificationManager} from 'react-notifications';

import {MAX_FILMS_TO_SHOW} from '../../consts.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
  comments: [],
  favorites: [],
  promo: null,
  maxShowFilms: MAX_FILMS_TO_SHOW,
  playState: false
};

export const transformFilmData = (data) => ({
  backgroundColor: data.background_color,
  backgroundImage: data.background_image,
  description: data.description,
  director: data.director,
  genre: data.genre,
  id: data.id,
  isFavorite: data.is_favorite,
  title: data.name,
  posterImage: data.poster_image,
  picture: data.preview_image,
  src: data.preview_video_link,
  rating: data.rating,
  ratingLevel: getMovieRatingLevel(data.rating),
  released: data.released,
  runTime: data.run_time,
  scoresCount: data.scores_count,
  starring: data.starring,
  videoLink: data.video_link
});

export const updateFilmList = (item, list) => {
  const idx = list.findIndex(({id}) => id === item.id);
  if (idx !== -1) {
    list[idx] = item;
  }
  return list;
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      const result = response.data.map(transformFilmData);
      dispatch(ActionCreator.loadFilms(result));
    })
    .catch((error) => NotificationManager.error(error.message));
  },
  loadComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
    .then((response) => {
      const result = response.data.sort(sortComments);
      dispatch(ActionCreator.loadComments(result));
    })
    .catch((error) => NotificationManager.error(error.message));
  },
  addComment: (id, params) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${id}`, params)
      .then((res) => {
        dispatch(ActionCreator.addComment(res.data));
      });
  },
  toggleFavorite: (filmId, status) => (dispatch, getState, api) => {
    return api
      .post(`/favorite/${filmId}/${status}`)
      .then((res) => {
        dispatch(ActionCreator.updateFilms(transformFilmData(res.data)));
      })
      .catch((error) => NotificationManager.error(error.message));
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api
      .get(`/favorite`)
      .then((res) => {
        const result = res.data.map(transformFilmData);
        dispatch(ActionCreator.loadFavorites(result));
      })
      .catch((error) => NotificationManager.error(error.message));
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api
      .get(`/films/promo`)
      .then((res) => {
        const result = transformFilmData(res.data);
        dispatch(ActionCreator.loadPromo(result));
      })
      .catch((error) => NotificationManager.error(error.message));
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return ({
        ...state,
        films: action.payload,
      });
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        filter: action.payload,
        maxShowFilms: MAX_FILMS_TO_SHOW
      };
    case ActionType.LOAD_COMMENTS:
      return ({
        ...state,
        comments: action.payload,
      });
    case ActionType.ADD_COMMENT:
      return ({
        ...state,
        comments: action.payload,
      });
    case ActionType.UPDATE_FILMS:
      const item = action.payload;
      const filmList = updateFilmList(item, [...state.films]);
      const {promo} = state;
      return ({
        ...state,
        films: filmList,
        promo: promo && promo.id === item.id ? item : promo
      });
    case ActionType.LOAD_FAVORITES:
      return ({
        ...state,
        favorites: action.payload
      });
    case ActionType.LOAD_PROMO:
      return ({
        ...state,
        promo: action.payload
      });
    case ActionType.INCREASE_MAX_SHOW_FILMS:
      const maxShowFilms = state.maxShowFilms + action.payload;
      return ({
        ...state,
        maxShowFilms
      });
    case ActionType.TOGGLE_PLAY_BUTTON:
      return ({
        ...state,
        playState: action.payload
      });
    case ActionType.RESET_MAX_SHOW_FILMS:
      return ({
        ...state,
        maxShowFilms: MAX_FILMS_TO_SHOW
      });
  }
  return state;
};

export {
  Operation,
  reducer
};
