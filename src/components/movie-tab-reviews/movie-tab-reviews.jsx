import React from 'react';
import PropTypes from 'prop-types';

import {
  reviewShape
} from '../../models.js';
import ReviewBlock from '../review-block/review-block.jsx';

const NO_COMMENTS = `No comments`;

const MovieTabReviews = ({reviews}) => {
  const reviewsLength = reviews.length;
  let leftReviews;
  let rightReviews;

  if (!reviewsLength) {
    return <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__text-col">{NO_COMMENTS}</div>
      <div className="movie-card__text-col"></div>
    </div>;
  }

  const leftColCount = Math.ceil(reviewsLength / 2);

  if (leftColCount === reviewsLength) {
    leftReviews = reviews;
    rightReviews = [];
  } else {
    leftReviews = reviews.slice(0, leftColCount);
    rightReviews = reviews.slice(leftColCount);
  }

  return <div className="movie-card__reviews movie-card__row">
    <ReviewBlock list={leftReviews} idx={`left`} />
    <ReviewBlock list={rightReviews} idx={`right`} />
  </div>;
};

MovieTabReviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewShape)
};

export default MovieTabReviews;
