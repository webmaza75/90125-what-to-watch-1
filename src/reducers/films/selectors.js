import {createSelector} from 'reselect';
import NameSpace from '../name-spaces.js';
import {ALL_GENRES} from '../../consts.js';

const NAME_SPACE = NameSpace.FILMS;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getActiveFilter = (state) => {
  return state[NAME_SPACE].filter;
};

export const getFilmsByGenre = createSelector(
    getFilms,
    getActiveFilter,
    (films, filter) => {
      if (filter === ALL_GENRES) {
        return films;
      }
      return films.filter((item) => item.genre === filter);
    }
);

export const getGenres = createSelector(
    getFilms,
    (films) => {
      const allGenres = films.map(({genre}) => genre);
      return [ALL_GENRES, ...new Set(allGenres)];
    }
);

export const getFavoriteList = createSelector(
    getFilms,
    (films) => {
      return films.filter((item) => item.isFavorite === true);
    }
);

export const getMovieById = (state, filmId) => {
  return state[NAME_SPACE].films.find((item) => item.id === +filmId);
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};
