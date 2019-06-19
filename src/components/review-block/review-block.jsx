import React from 'react';
import PropTypes from 'prop-types';

import {
  getCommentDate,
  formatRating
} from '../../utils.js';
import {reviewShape} from '../../models.js';

const ReviewBlock = ({list, idx}) => {
  return <div className="movie-card__reviews-col" key={idx}>
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

        <div className="review__rating">{formatRating(rating)}</div>
      </div>;
    })}
  </div>;
};

ReviewBlock.propTypes = {
  list: PropTypes.arrayOf(reviewShape),
  idx: PropTypes.string
};


export default ReviewBlock;
