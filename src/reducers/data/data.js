import ActionTypes from '../../actions/action-types.js';
import {ALL_GENRES} from '../../consts.js';
import {ActionCreator} from '../../actions/actions.js';

const initialState = {
  films: [],
  filter: ALL_GENRES,
};

export const transform = (data) => {
  const item = {
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
    released: data.released,
    runTime: data.run_time,
    scoresCount: data.scores_count,
    starring: data.starring,
    videoLink: data.video_link
  };

  return item;
};

const Operation = {
  loadFilms: () => (dispatch, _getState, api) => {
    return api.get(`/films`)
    .then((response) => {
      const result = response.data.map((item) => transform(item));
      dispatch(ActionCreator.loadFilms(result));
    });
  },
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
  }
  return state;
};

export {
  Operation,
  reducer
};
