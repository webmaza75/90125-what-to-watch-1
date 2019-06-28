
import {
  formatRating,
  getMovieRatingLevel,
  getRunTime,
  getCommentDate,
  sortComments,
  getMoreFilmsByGenre,
  formatVideoTime
} from './utils.js';

describe(`utils work correctly`, () => {
  const ratingsForFormat = [
    [0, `0,0`],
    [0.5, `0,5`],
    [2.8, `2,8`],
    [3.0, `3,0`],
    [3.2, `3,2`],
    [4.7, `4,7`],
    [5, `5,0`],
    [9.5, `9,5`],
    [10.0, `10,0`]
  ];
  test.each(ratingsForFormat)(`formatRating and getMovieRatingLevel returns correctly values`, (rating, formattedRating) => {
    expect(formatRating(rating)).toEqual(formattedRating);
  });

  const ratingsForLevel = [
    [0, `Bad`],
    [0.5, `Bad`],
    [2.8, `Bad`],
    [3.0, `Normal`],
    [3.2, `Normal`],
    [4.7, `Normal`],
    [5, `Good`],
    [6.0, `Good`],
    [7.9, `Good`],
    [8, `Very good`],
    [8.2, `Very good`],
    [9.5, `Very good`],
    [10.0, `Awesome`]
  ];
  test.each(ratingsForLevel)(`formatRating and getMovieRatingLevel returns correctly values`, (rating, ratingLevel) => {
    expect(getMovieRatingLevel(rating)).toEqual(ratingLevel);
  });

  const filmDurations = [
    [117, `1h 57m`],
    [35, `35m`],
    [244, `4h 4m`]
  ];
  test.each(filmDurations)(`getRunTime returns correctly film duration in hours and minutes`, (runTime, formattedDuration) => {
    expect(getRunTime(runTime)).toEqual(formattedDuration);
  });

  const commentDates = [
    [`2019-06-08T19:33:44.643Z`, {"date": `June 8, 2019`, "dateTime": `2019-06-08`}],
    [`2019-05-27T19:33:44.643Z`, {"date": `May 27, 2019`, "dateTime": `2019-05-27`}],
    [`2018-04-30T19:33:44.643Z`, {"date": `April 30, 2018`, "dateTime": `2018-04-30`}],
    [`2018-03-05T19:33:44.643Z`, {"date": `March 5, 2018`, "dateTime": `2018-03-05`}],
    [`2019-03-05T19:33:44.643Z`, {"date": `March 5, 2019`, "dateTime": `2019-03-05`}],
    [`2019-02-17T19:33:44.643Z`, {"date": `February 17, 2019`, "dateTime": `2019-02-17`}],
    [`2019-01-21T19:33:44.643Z`, {"date": `January 21, 2019`, "dateTime": `2019-01-21`}],
    [`2018-12-08T19:33:44.643Z`, {"date": `December 8, 2018`, "dateTime": `2018-12-08`}],
    [`2018-11-12T19:33:44.643Z`, {"date": `November 12, 2018`, "dateTime": `2018-11-12`}],
    [`2018-10-01T19:33:44.643Z`, {"date": `October 1, 2018`, "dateTime": `2018-10-01`}],
    [`2018-09-07T19:33:44.643Z`, {"date": `September 7, 2018`, "dateTime": `2018-09-07`}],
    [`2018-08-07T19:33:44.643Z`, {"date": `August 7, 2018`, "dateTime": `2018-08-07`}],
    [`2018-07-31T19:33:44.643Z`, {"date": `July 31, 2018`, "dateTime": `2018-07-31`}]
  ];
  test.each(commentDates)(`getCommentDate returns correctly date for comment`, (dateFromServer, dateForComment) => {
    expect(getCommentDate(dateFromServer)).toEqual(dateForComment);
  });

  it(`sortComments returns correctly order of comments (by date)`, () => {
    const commentDatesForSort = [
      {date: `2018-12-08T19:33:44.643Z`},
      {date: `2019-05-27T19:33:44.643Z`},
      {date: `2019-06-08T19:33:44.643Z`},
      {date: `2018-11-12T19:33:44.643Z`},
      {date: `2018-04-30T19:33:44.643Z`},
      {date: `2018-03-05T19:33:44.643Z`},
      {date: `2019-03-05T19:33:44.643Z`},
      {date: `2019-02-17T19:33:44.643Z`},
      {date: `2019-01-21T19:33:44.643Z`},
      {date: `2018-10-01T19:33:44.643Z`},
      {date: `2018-09-07T19:33:44.643Z`},
      {date: `2018-08-07T19:33:44.643Z`},
      {date: `2018-07-31T19:33:44.643Z`}
    ];

    const SortedDates = [
      {date: `2019-06-08T19:33:44.643Z`},
      {date: `2019-05-27T19:33:44.643Z`},
      {date: `2019-03-05T19:33:44.643Z`},
      {date: `2019-02-17T19:33:44.643Z`},
      {date: `2019-01-21T19:33:44.643Z`},
      {date: `2018-12-08T19:33:44.643Z`},
      {date: `2018-11-12T19:33:44.643Z`},
      {date: `2018-10-01T19:33:44.643Z`},
      {date: `2018-09-07T19:33:44.643Z`},
      {date: `2018-08-07T19:33:44.643Z`},
      {date: `2018-07-31T19:33:44.643Z`},
      {date: `2018-04-30T19:33:44.643Z`},
      {date: `2018-03-05T19:33:44.643Z`},
    ];
    expect(commentDatesForSort.sort(sortComments)).toEqual(SortedDates);
  });

  it(`sortComments returns correctly order of comments (by date)`, () => {
    const films = [
      {id: 1, genre: `Comedy`},
      {id: 2, genre: `Triller`},
      {id: 3, genre: `Comedy`},
      {id: 4, genre: `Action`},
      {id: 5, genre: `Comedy`},
      {id: 6, genre: `Comedy`},
      {id: 7, genre: `Comedy`},
      {id: 8, genre: `Comedy`},
    ];
    const movie = {id: 3, genre: `Comedy`};
    const triller = {id: 2, genre: `Triller`};
    const actionFilm = {id: 4, genre: `Action`};
    const result = getMoreFilmsByGenre(films, movie);

    expect(result.length).toBeLessThanOrEqual(4);
    expect(result).not.toContainEqual(triller);
    expect(result).not.toContainEqual(actionFilm);
    expect(result).not.toContainEqual(movie);
    expect(result).toContainEqual({id: 1, genre: `Comedy`});
  });

  const timeDuration = [
    [9, `0:09`],
    [30, `0:30`],
    [60, `1:00`],
    [94, `1:34`],
    [631, `10:31`],
    [3599, `59:59`],
    [3600, `1:00:00`],
    [3702, `1:01:42`]
  ];
  test.each(timeDuration)(`formatVideoTime returns correctly time format`, (unformattedTimeDuration, formattedTimeDuration) => {
    expect(formatVideoTime(unformattedTimeDuration)).toEqual(formattedTimeDuration);
  });
});

