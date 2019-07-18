import {
  ratingLevels,
  MONTHS,
  DurationIntervals
} from './consts.js';

export const getMovieRatingLevel = (ratingValue) => {
  const result = ratingLevels.find((element) => {
    return element[0] <= ratingValue;
  });

  if (!result) {
    return result;
  }
  return result[1];
};

export const formatRating = (rating) => {
  const ratingToString = rating.toFixed(1);
  return ratingToString.replace(`.`, `,`);
};

export const getMoreFilmsByGenre = (films, movie, max = 4) => {
  const moreFilms = films.filter(({genre, id}) => genre === movie.genre && id !== movie.id);

  return moreFilms.slice(0, max);
};

export const getRunTime = (runTime) => {
  if (runTime < DurationIntervals.SECONDS_IN_MINUTE) {
    return `${runTime}m`;
  }

  return `${Math.floor(runTime / DurationIntervals.SECONDS_IN_MINUTE)}h ${runTime % DurationIntervals.SECONDS_IN_MINUTE}m`;
};

export const getCommentDate = (date) => {
  const newDate = new Date(date);
  const month = getMonthName(newDate.getMonth());

  return {
    date: `${month} ${newDate.getDate()}, ${newDate.getFullYear()}`,
    dateTime: date.split(`T`)[0]
  };
};

export const sortComments = ((a, b) => Date.parse(b.date) - Date.parse(a.date));
export const getMonthName = (index) => {
  return MONTHS[index];
};

export const formatVideoTime = (time) => {
  const hours = Math.floor(time / DurationIntervals.SECONDS_IN_HOUR);
  const secondsPerHours = hours * DurationIntervals.SECONDS_IN_HOUR;
  const minutes = Math.floor((time - secondsPerHours) / DurationIntervals.SECONDS_IN_MINUTE);
  const secondsPerMinutes = minutes * DurationIntervals.SECONDS_IN_MINUTE;
  const seconds = time - secondsPerHours - secondsPerMinutes;
  if (!hours && !minutes) {
    return `${(`` + seconds).padStart(4, `0:0`)}`;
  }
  if (!hours) {
    return `${minutes}:${(`` + seconds).padStart(2, `0`)}`;
  }
  return `${hours}:${(`` + minutes).padStart(2, `0`)}:${(`` + seconds).padStart(2, `0`)}`;
};
