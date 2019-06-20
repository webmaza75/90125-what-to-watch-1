import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {
  getMovieRatingLevel,
  getRating
} from '../../utils.js';

const MovieTabOverview = ({rating, scoresCount, description, director, starring}) => {
  return <Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{getRating(rating)}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getMovieRatingLevel(rating)}</span>
        <span className="movie-rating__count">{scoresCount} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      {description}
      <p className="movie-card__director"><strong>Director: {director}</strong></p>
      <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)}</strong></p>
    </div>
  </Fragment>;
};

MovieTabOverview.propTypes = {
  director: PropTypes.string,
  starring: PropTypes.arrayOf(PropTypes.string),
  rating: PropTypes.number,
  scoresCount: PropTypes.number,
  description: PropTypes.string
};

export default MovieTabOverview;
