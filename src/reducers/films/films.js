import ActionTypes from '../../actions/action-types.js';
import {ALL_GENRES} from '../../consts.js';
import {ActionCreator} from '../../actions/actions.js';
import {sortComments} from '../../utils.js';
import {getMovieRatingLevel} from '../../utils.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
  comments: [],
  favorites: [],
  promo: null,
  maxShowFilms: 20,
  playState: false
};

export const transform = (data) => ({
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
      const result = response.data.map(transform);
      dispatch(ActionCreator.loadFilms(result));
    });
  },
  loadComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
    .then((response) => {
      const result = response.data.sort(sortComments);
      dispatch(ActionCreator.loadComments(result));
    });
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
        dispatch(ActionCreator.updateFilms(transform(res.data)));
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api
      .get(`/favorite`)
      .then((res) => {
        const result = res.data.map(transform);
        dispatch(ActionCreator.loadFavorites(result));
      });
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api
      .get(`/films/promo`)
      .then((res) => {
        const result = transform(res.data);
        dispatch(ActionCreator.loadPromo(result));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FILMS:
      return ({
        ...state,
        films: action.payload,
      });
    case ActionTypes.CHANGE_GENRE:
      return {
        ...state,
        filter: action.payload
      };
    case ActionTypes.LOAD_COMMENTS:
      return ({
        ...state,
        comments: action.payload,
      });
    case ActionTypes.ADD_COMMENT:
      return ({
        ...state,
        comments: action.payload,
      });
    case ActionTypes.UPDATE_FILMS:
      const item = action.payload;
      const filmList = updateFilmList(item, [...state.films]);
      const {promo} = state;
      return ({
        ...state,
        films: filmList,
        promo: promo.id === item.id ? item : promo
      });
    case ActionTypes.LOAD_FAVORITES:
      return ({
        ...state,
        favorites: action.payload
      });
    case ActionTypes.LOAD_PROMO:
      return ({
        ...state,
        promo: action.payload
      });
    case ActionTypes.INCREASE_MAX_SHOW_FILMS:
      const maxShowFilms = state.maxShowFilms + action.payload;
      return ({
        ...state,
        maxShowFilms
      });
    case ActionTypes.TOGGLE_PLAY_BUTTON:
      return ({
        ...state,
        playState: action.payload
      });
  }
  return state;
};

export {
  Operation,
  reducer
};
