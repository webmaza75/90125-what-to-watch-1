import ActionTypes from './action-types.js';
import filmList from './mocks/films.js';
import {ALL_GENRES} from './consts.js';

const initialState = {
  films: filmList,
  filter: ALL_GENRES,
  filmsGroup: filmList
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return {
        ...state,
        filter: action.payload
      };
    case ActionTypes.GET_FILMS_BY_GENRE:
      if (action.payload.filter === ALL_GENRES) {
        return initialState;
      }
      return {
        ...state,
        filmsGroup: action.payload.films.filter(({genre}) => genre.includes(action.payload.filter))
      };
  }
  return state;
};

export default reducer;
