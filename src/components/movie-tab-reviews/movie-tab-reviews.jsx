import React from 'react';
import PropTypes from 'prop-types';

import {
  reviewShape
} from '../../models.js';
import ReviewBlock from '../review-block/review-block.jsx';

const commentsChunks = (comments) => {
  return comments.map((x, i) => i % 2 === 0 && comments.slice(i, i + 2)).filter((x) => x);
};

const MovieTabReviews = ({reviews}) => {
  const reviewsLength = reviews.length;

  if (!reviewsLength) {
    return <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__text-col">No comments</div>
      <div className="movie-card__text-col"></div>
    </div>;
  }

  const newCommentsList = commentsChunks(reviews);
  return <ReviewBlock list={newCommentsList} />;
};

MovieTabReviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewShape)
};

export default MovieTabReviews;
