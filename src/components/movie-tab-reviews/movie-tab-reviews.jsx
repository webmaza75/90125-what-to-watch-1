import React from 'react';
import PropTypes from 'prop-types';

import {
  reviewShape
} from '../../models.js';
import {
  getRating,
  getCommentDate
} from '../../utils.js';
import {NO_COMMENTS} from '../../consts.js';

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

  const getReviewBlock = (list, key) => <div className="movie-card__reviews-col" key={key}>
    {list.map(({user, rating, comment, date, id}) => {
      const newDate = getCommentDate(date);
      return <div className="review" key={id}>
        <blockquote className="review__quote">
          <p className="review__text">
            {comment}
          </p>

          <footer className="review__details">
            <cite className="review__author">{user.name}</cite>
            <time className="review__date" dateTime={newDate.dateTime}>{newDate.date}</time>
          </footer>
        </blockquote>

        <div className="review__rating">{getRating(rating)}</div>
      </div>;
    })}
  </div>;

  return <div className="movie-card__reviews movie-card__row">
    {getReviewBlock(leftReviews, `left`)}
    {getReviewBlock(rightReviews, `right`)}
  </div>;
};

MovieTabReviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewShape)
};

export default MovieTabReviews;
