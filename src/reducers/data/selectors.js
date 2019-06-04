import {createSelector} from 'reselect';
import NameSpace from '../name-spaces.js';
import {ALL_GENRES} from '../../consts.js';

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getActiveFilter = (state) => {
  return state[NAME_SPACE].filter;
};

export const getGenreFilms = createSelector(
    getFilms,
    getActiveFilter,
    (films, filter) => films.filter((item) => {
      if (filter !== ALL_GENRES) {
        return item.genre === filter;
      }
      return true;
    })
);

export const getGenres = createSelector(
    getFilms,
    (films) => {
      const allGenres = [...films.map(({genre}) => genre)];
      return [ALL_GENRES, ...new Set(allGenres)];
    }
);
