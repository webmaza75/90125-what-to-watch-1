import React from 'react';
import PropTypes from 'prop-types';

import {
  getRunTime
} from '../../utils.js';

const MovieTabDetails = ({director, starring, runTime, genre, released}) => {
  return <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Director</strong>
        <span className="movie-card__details-value">{director}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Starring</strong>
        <span className="movie-card__details-value"
          dangerouslySetInnerHTML={{__html: starring.join(`,<br/>`)}}
        >
        </span>
      </p>
    </div>

    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Run Time</strong>
        <span className="movie-card__details-value">{getRunTime(runTime)}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Genre</strong>
        <span className="movie-card__details-value">{genre}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Released</strong>
        <span className="movie-card__details-value">{released}</span>
      </p>
    </div>
  </div>;
};

MovieTabDetails.propTypes = {
  director: PropTypes.string,
  starring: PropTypes.arrayOf(PropTypes.string),
  runTime: PropTypes.number,
  genre: PropTypes.string,
  released: PropTypes.number
};

export default MovieTabDetails;
