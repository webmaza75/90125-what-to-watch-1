import {RatingLevels} from './consts.js';

export const getMovieRatingLevel = (ratingValue) => {
  const rating = Math.floor(ratingValue);

  if (rating === 10) {
    return RatingLevels.AWESOME;
  }

  if (rating >= 8) {
    return RatingLevels.VERY_GOOD;
  }

  if (rating >= 5) {
    return RatingLevels.GOOD;
  }

  if (rating >= 3) {
    return RatingLevels.NORMAL;
  }

  if (rating >= 0) {
    return RatingLevels.BAD;
  }
  return RatingLevels.AWESOME;
};

export const getRating = (rating) => {
  return rating.toString().replace(`.`, `,`);
};

export const getMoreFilmsByGenre = (films, movie, max = 4) => {
  const moreFilms = films.filter(({genre, id}) => genre === movie.genre && id !== movie.id);

  return max < moreFilms.length ?
    moreFilms.slice(0, max) :
    moreFilms.slice(0);
};
