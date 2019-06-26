import {
  RatingLevels,
  MONTHS
} from './consts.js';

export const getMovieRatingLevel = (ratingValue) => {
  const result = RatingLevels.find((element) => {
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
  if (runTime < 60) {
    return `${runTime}m`;
  }

  return `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
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

const getFormatMinutesAndSeconds = (time, useZeroBefore = false) => {
  let minutes = Math.floor(time / 60);
  const diff = time - minutes * 60;
  minutes = useZeroBefore && (minutes < 10) ? `0${minutes}` : minutes;
  const seconds = diff < 10 ? `0${diff}` : diff;
  return `${minutes}:${seconds}`;
};


export const formatVideoTime = (time) => {
  if (time < 60) {
    return time < 10 ? `0:0${time}` : `0:${time}`;
  } else if ((time >= 60) && (time < 60 * 60)) {
    return `${getFormatMinutesAndSeconds(time)}`;
  } else {
    const hours = Math.floor(time / 3600);
    return `${hours}:${getFormatMinutesAndSeconds(time - hours * 3600, true)}`;
  }
};
