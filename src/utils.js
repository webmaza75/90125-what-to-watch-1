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
  const ratingToString = rating.toString();
  if (ratingToString.indexOf(`.`) !== -1) {
    return ratingToString.replace(`.`, `,`);
  }
  return ratingToString + `,0`;
};

export const getMoreFilmsByGenre = (films, movie, max = 4) => {
  const moreFilms = films.filter(({genre, id}) => genre === movie.genre && id !== movie.id);

  return max < moreFilms.length ?
    moreFilms.slice(0, max) :
    moreFilms.slice(0);
};
export const getRunTime = (runTime) => {
  if (runTime < 60) {
    return `${runTime} m`;
  }

  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
};

export const getCommentDate = (date) => {
  const newDate = new Date(date);
  const month = newDate.toLocaleString(`en-US`, {
    month: `long`
  });

  return {
    date: `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`,
    dateTime: date.split(`T`)[0]
  };
};
