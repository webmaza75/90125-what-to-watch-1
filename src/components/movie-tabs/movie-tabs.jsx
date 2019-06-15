import React from 'react';
import PropTypes from 'prop-types';

import {
  tabs,
  Tabs
} from '../../consts.js';
import {
  itemShape,
  reviewShape
} from '../../models.js';
import MovieTabDetails from '../movie-tab-details/movie-tab-details.jsx';
import MovieTabOverview from '../movie-tab-overview/movie-tab-overview.jsx';
import MovieTabReviews from '../movie-tab-reviews/movie-tab-reviews.jsx';

const MovieTabs = ({activeItem, onChange, movie, reviews}) => {
  const {
    description,
    director,
    genre,
    rating,
    released,
    runTime,
    scoresCount,
    starring
  } = movie;

  let movieBlock;
  switch (activeItem) {
    case Tabs.DETAILS:
      movieBlock = <MovieTabDetails
        director={director}
        starring={starring}
        runTime={runTime}
        genre={genre}
        released={released}
      />;
      break;
    case Tabs.REVIEWS:
      movieBlock = <MovieTabReviews
        reviews={reviews()}
      />;
      break;
    default:
      movieBlock = <MovieTabOverview
        rating={rating}
        scoresCount={scoresCount}
        description={description}
        director={director}
        starring={starring}
      />;
      break;
  }

  const tabList = tabs.map((title) => {
    let className = `movie-nav__item`;
    if (title === activeItem) {
      className = `movie-nav__item movie-nav__item--active`;
    }
    return <li className={className} key={title}>
      <a href="#" className="movie-nav__link" onClick={
        (event) => {
          event.preventDefault();
          onChange(title);
        }}>{title}</a>
    </li>;
  });

  return <div className="movie-card__desc">
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        {tabList}
      </ul>
    </nav>
    {movieBlock}
  </div>;
};

MovieTabs.propTypes = {
  activeItem: PropTypes.string,
  onChange: PropTypes.func,
  movie: itemShape,
  reviews: PropTypes.arrayOf(reviewShape)
};

export default MovieTabs;
