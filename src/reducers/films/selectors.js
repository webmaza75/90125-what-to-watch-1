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

export const getMaxShowFilms = (state) => {
  return state[NAME_SPACE].maxShowFilms;
};

export const getFilmsByGenre = createSelector(
    getFilms,
    getActiveFilter,
    getMaxShowFilms,
    (films, filter, maxShowFilms) => {
      if (filter === ALL_GENRES) {
        return films.slice(0, maxShowFilms);
      }
      return films.filter((item) => item.genre === filter).slice(0, maxShowFilms);
    }
);

export const getGenres = createSelector(
    getFilms,
    (films) => {
      const allGenres = films.map(({genre}) => genre);
      return [ALL_GENRES, ...new Set(allGenres)];
    }
);

export const getFavoriteList = (state) => {
  return state[NAME_SPACE].favorites;
};

export const getMovieById = (state, filmId) => {
  return state[NAME_SPACE].films.find((item) => item.id === +filmId);
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getPromo = (state) => {
  return state[NAME_SPACE].promo;
};
