import ActionTypes from '../../actions/action-types.js';
import {ALL_GENRES} from '../../consts.js';
import {ActionCreator} from '../../actions/actions.js';
import {sortComments} from '../../utils.js';
import {getMovieRatingLevel} from '../../utils.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
  comments: []
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
      }).catch((error) => {
        dispatch(ActionCreator.submitCommentsError(error.response.data.error));
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
  }
  return state;
};

export {
  Operation,
  reducer
};
